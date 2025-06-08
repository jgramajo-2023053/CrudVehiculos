import express from 'express'
import {
  getVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from './vehiculo.controller.js'
import {vehiculoValidator} from '../middlewares/vehiculo.validators.js'

const api = express.Router()

api.get('/', getVehiculos)
api.get('/:id', getVehiculoById)
api.post('/', vehiculoValidator, createVehiculo)
api.put('/:id', vehiculoValidator, updateVehiculo)
api.delete('/:id', deleteVehiculo)

export default api