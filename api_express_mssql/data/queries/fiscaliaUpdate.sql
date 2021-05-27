UPDATE [dbo].[fiscalias]
SET [Nombre]=@Nombre,
    [Direccion]=@Direccion,
    [Telefono]=@Telefono
WHERE [Id]=@Id

SELECT [Nombre]
      ,[Direccion]
      ,[Telefono]

from fiscalias

  WHERE [Id]=@Id