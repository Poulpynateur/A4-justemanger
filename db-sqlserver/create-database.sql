CREATE LOGIN admin WITH PASSWORD = 'Password123'
GO

CREATE DATABASE JusteManger;
GO
USE JusteManger;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'admin')
BEGIN
    CREATE USER [admin] FOR LOGIN [admin]
    EXEC sp_addrolemember N'db_owner', N'admin'
END;
GO