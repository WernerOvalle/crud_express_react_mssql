import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function ListTable() {
  const baseUrl = "http://localhost:8080/api/fiscalias";

  const styles = useStyles();

  const [data, setData] = useState([]);

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    console.log(consolaSeleccionada);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };
  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };
  const peticionPost = async () => {
    await axios.post(baseUrl, consolaSeleccionada).then((response) => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    });
  };

  const peticionPut = async () => {
    let consolaSeleccionada2 = Object.assign({}, consolaSeleccionada);
    delete consolaSeleccionada2.id;
    console.log(consolaSeleccionada);
    await axios
      .put(baseUrl + "/" + consolaSeleccionada.id, consolaSeleccionada2)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.id === consola.id) {
            consola.nombre = consolaSeleccionada.nombre;
            consola.direccion = consolaSeleccionada.direccion;
            consola.telefono = consolaSeleccionada.telefono;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseUrl + "/" + consolaSeleccionada.id)
      .then((response) => {
        setData(
          data.filter((consola) => consola.id !== consolaSeleccionada.id)
        );
        abrirCerrarModalEliminar();
      });
  };
  useEffect(async () => {
    await peticionGet();
  }, {});
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consolaSeleccionada);
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nueva Fiscalia</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="direccion"
        className={styles.inputMaterial}
        label="direccion"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="telefono"
        className={styles.inputMaterial}
        label="telefono"
        onChange={handleChange}
      />

      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Guardar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Consola</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="nombre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.nombre}
      />
      <br />
      <TextField
        name="direccion"
        className={styles.inputMaterial}
        label="direccion"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.direccion}
      />
      <br />
      <TextField
        name="telefono"
        className={styles.inputMaterial}
        label="telefono"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.telefono}
      />

      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar la consola{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );
  return (
    <div className="App">
      <br />
      <Button color="primary" variant="outlinedPrimary"onClick={() => abrirCerrarModalInsertar()}>
        <AddIcon />
      </Button>
      <br /> <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Nombre</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Accion</TableCell>
          </TableHead>
          <TableBody>
            {!data
              ? "Cargando.."
              : data.map((consola) => (
                  <TableRow key={consola.id}>
                    <TableCell>{consola.nombre}</TableCell>
                    <TableCell>{consola.direccion}</TableCell>
                    <TableCell>{consola.telefono}</TableCell>
                    <TableCell>
                      <Edit
                        className={styles.iconos}
                        onClick={() => seleccionarConsola(consola, "Editar")}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <Delete
                        className={styles.iconos}
                        onClick={() => seleccionarConsola(consola, "Eliminar")}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default ListTable;
