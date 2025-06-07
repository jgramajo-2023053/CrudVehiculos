import express from 'express'
import {
  getVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from './vehiculo.controller.js'

const api = express.Router()

api.get('/', getVehiculos)
api.get('/:id', getVehiculoById)
api.post('/', createVehiculo)
api.put('/:id', updateVehiculo)
api.delete('/:id', deleteVehiculo)

export default api