import connection from '../config/config.js'

export const getVehiculos = (req, res) => {
  connection.query('SELECT * FROM vehiculos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
}

export const createVehiculo = (req, res) => {
  const { marca, modelo, anio, color, placa } = req.body
  const sql = 'INSERT INTO vehiculos (marca, modelo, anio, color, placa) VALUES (?, ?, ?, ?, ?)'
  connection.query(sql, [marca, modelo, anio, color, placa], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(201).json({ message: 'Vehículo creado', id: result.insertId })
  })
}

export const updateVehiculo = (req, res) => {
  const { id } = req.params
  const { marca, modelo, anio, color, placa } = req.body
  const sql = 'UPDATE vehiculos SET marca=?, modelo=?, anio=?, color=?, placa=? WHERE id=?'
  connection.query(sql, [marca, modelo, anio, color, placa, id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Vehículo actualizado' })
  })
}

export const deleteVehiculo = (req, res) => {
  const { id } = req.params
  connection.query('DELETE FROM vehiculos WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Vehículo eliminado' })
  })
}
