INSERT INTO [dbo].[fiscalias]
    (
        [nombre],
        [direccion],
        [telefono]
        
    )
VALUES 
    (
        @nombre,
        @direccion,
        @telefono
       
    )

SELECT top 1 *
  FROM [dbo].[fiscalias] order by id desc