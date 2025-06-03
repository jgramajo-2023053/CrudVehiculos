import mysql from 'mysql2'

export const setupDatabase = () => {
  const tempConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })

  // Paso 1: Crear la base de datos si no existe
  tempConnection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
    (err) => {
      if (err) {
        console.error('Error al crear la base de datos:', err.message)
        return
      }
      console.log(`Base de datos '${process.env.DB_NAME}' verificada o creada.`)

      // Paso 2: Conectarse ya con la DB seleccionada
      const dbConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      })

      // Paso 3: Crear tablas
      const createVehiculosTable = `
        CREATE TABLE IF NOT EXISTS vehiculos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          marca VARCHAR(50) NOT NULL,
          modelo VARCHAR(50) NOT NULL,
          anio INT NOT NULL,
          color VARCHAR(30),
          placa VARCHAR(20) UNIQUE
        );
      `
      dbConnection.query(createVehiculosTable, (err) => {
        if (err) {
          console.error('Error al crear la tabla vehiculos:', err.message)
        } else {
          console.log('Tabla "vehiculos" verificada o creada correctamente')
        }
        dbConnection.end()
      })
    }
  )

  tempConnection.end()
}
