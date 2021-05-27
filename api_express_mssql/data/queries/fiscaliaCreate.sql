INSERT INTO [dbo].[fiscalias]
    (
        [nombre],
        [direccion],
        [telefono]
        
    )
VALUES 
    (
        @Nombre,
        @Direccion,
        @Telefono
       
    )

SELECT SCOPE_IDENTITY() AS FiscaliaId