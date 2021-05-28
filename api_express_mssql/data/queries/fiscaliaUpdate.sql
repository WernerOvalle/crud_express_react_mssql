UPDATE [dbo].[fiscalias]
SET [Nombre]=@nombre,
    [Direccion]=@direccion,
    [Telefono]=@telefono
WHERE [Id]=@id

SELECT [Nombre]
      ,[Direccion]
      ,[Telefono]

from fiscalias

  WHERE [Id]=@id