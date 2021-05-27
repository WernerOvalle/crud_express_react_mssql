'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getFiscalias = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');
        const fiscaliaslist = await pool.request().query(sqlQueries.fiscaliaslist);
        return fiscaliaslist.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(fiscaliaId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');
        const fiscalia = await pool.request()
                            .input('fiscaliaId', sql.Int, fiscaliaId)
                            .query(sqlQueries.fiscaliabyId);
        return fiscalia.recordset;
    } catch (error) {
        return error.message;
    }
}

const createFiscalia = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');
        const insertEvent = await pool.request()
                            .input('Nombre', sql.VarChar(50), eventdata.Nombre)
                            .input('Direccion', sql.VarChar(50), eventdata.Direccion)
                            .input('Telefono', sql.VarChar(50), eventdata.Telefono)
                            .query(sqlQueries.fiscaliaCreate);                            
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateFiscalia = async (Id, eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');
        const update = await pool.request()
                        .input('Id', sql.Int, Id)
                        .input('Nombre', sql.VarChar(50), eventdata.Nombre)
                        .input('Direccion', sql.VarChar(50), eventdata.Direccion)
                        .input('Telefono', sql.VarChar(50), eventdata.Telefono)
                        .query(sqlQueries.fiscaliaUpdate);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteFiscalia = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');
        const deleteEvent = await pool.request()
                            .input('Id', sql.Int, Id)
                            .query(sqlQueries.fiscaliaDelete);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getFiscalias,
    getById,
    createFiscalia,
    updateFiscalia,
    deleteFiscalia
}