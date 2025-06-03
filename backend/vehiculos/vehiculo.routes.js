import express from 'express'
import {
  getVehiculos,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from './vehiculo.controller.js'

const router = express.Router()

router.get('/', getVehiculos)
router.post('/', createVehiculo)
router.put('/:id', updateVehiculo)
router.delete('/:id', deleteVehiculo)

export default router