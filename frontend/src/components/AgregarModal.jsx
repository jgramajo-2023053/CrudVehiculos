import React from 'react'
import styled from 'styled-components'
import { FormModal } from './model/Form.modal'

export const AgregarModal = ({ vehiculo, onChange, onSubmit, onClose, esValido }) => {
  return (
    <Modal>
      <Header>
        <h3>Agregar Vehículo</h3>
        <Cerrar onClick={onClose}>✕</Cerrar>
      </Header>
      <FormModal vehiculo={vehiculo} onChange={onChange} disabled={false} />
      <Boton onClick={onSubmit} disabled={!esValido}>Agregar</Boton>
    </Modal>
  )
}

const Modal = styled.div`
  position: fixed;
  top: 23%;
  left: 37%;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  z-index: 999;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3{
    color: black;
  }
`

const Cerrar = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #555;
`

const Boton = styled.button`
  margin-top: 15px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`
