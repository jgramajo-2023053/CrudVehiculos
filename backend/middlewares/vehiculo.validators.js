import { body } from 'express-validator'
import { validateErrorsWithoutFiles } from './validate.errors.js'

export const vehiculoValidator = [
  body('marca', 'La marca es obligatoria')
    .notEmpty(),

  body('modelo', 'El modelo es obligatorio')
    .notEmpty(),

  body('anio', 'El año es obligatorio y debe ser un número válido')
    .notEmpty()
    .toInt()
    .isInt({ min: 1900, max: 2100 })
    .withMessage('El año debe estar entre 1900 y 2100'),

  body('color', 'El color es obligatorio')
    .notEmpty(),

  body('placa', 'La placa es obligatoria')
    .notEmpty()
    .isLength({ min: 4, max: 10 })
    .withMessage('La placa debe tener entre 4 y 10 caracteres'),

  validateErrorsWithoutFiles
]