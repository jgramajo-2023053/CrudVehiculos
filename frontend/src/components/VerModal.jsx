import React from 'react'
import styled from 'styled-components'
import { FormModal } from './model/Form.modal'

export const VerModal = ({ vehiculo, disabled, onChange, onEditar, onEliminar, onClose, onCancelar }) => {
  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h3>Detalles del Vehículo</h3>
        <FormModal vehiculo={vehiculo} onChange={onChange} disabled={disabled} />
        <Botones>
          <Editar onClick={onEditar}>{disabled ? 'Editar' : 'Guardar'}</Editar>
          {!disabled && <Cancelar onClick={onCancelar}>Cancelar</Cancelar>}
          <Eliminar onClick={onEliminar}>Eliminar</Eliminar>
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
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  h3{
    color: black;
  }
`

const CloseButton = styled.button`
  position: absolute;
  color: black;
  top: 10px;
  right: 12px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`

const Botones = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
`

const Boton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const Editar = styled(Boton)`
  background-color: #ffc107;
  color: black;
`

const Cancelar = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`

const Eliminar = styled(Boton)`
  background-color: #dc3545;
  color: white;
`
