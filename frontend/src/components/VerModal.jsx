import React from 'react'
import styled from 'styled-components'
import { FormModal } from './model/Form.modal'

export const VerModal = ({ vehiculo, disabled, onChange, onEditar, onCancelar, onEliminar, onClose, esValido }) => {
  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose} disabled={!disabled}>×</CloseButton>
        <h3>Detalles del Vehículo</h3>
        <FormModal vehiculo={vehiculo} onChange={onChange} disabled={disabled} />
        <Botones>
          <Editar 
            onClick={onEditar} 
            disabled={!disabled && !esValido}
          >
            {disabled ? 'Editar' : 'Guardar'}
          </Editar>
          {!disabled && <Cancelar onClick={onCancelar}>Cancelar</Cancelar>}
          <Eliminar onClick={onEliminar} disabled={!disabled}>Eliminar</Eliminar>
        </Botones>
      </Modal>
    </Overlay>
  )
}


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  
  h3{
    color: black;
  }
`

const Botones = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`

const Editar = styled.button`
  padding: 8px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #94d3a2;
    cursor: not-allowed;
  }
`

const Cancelar = styled.button`
  padding: 8px 12px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const Eliminar = styled.button`
  padding: 8px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`

const CloseButton = styled.button`
  position: absolute;
  color: black;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`
