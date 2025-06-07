import React from 'react'
import styled from 'styled-components'

export const FormModal = ({ vehiculo, disabled, onChange }) => {
  return (
    <FormWrapper>
      <FormRow>
        <Label>ID</Label>
        <Input type="text" name="id" value={vehiculo.id || ''} onChange={onChange} disabled />
      </FormRow>
      <FormRow>
        <Label>Marca</Label>
        <Input type="text" name="marca" value={vehiculo.marca || ''} onChange={onChange} disabled={disabled} />
      </FormRow>
      <FormRow>
        <Label>Modelo</Label>
        <Input type="text" name="modelo" value={vehiculo.modelo || ''} onChange={onChange} disabled={disabled} />
      </FormRow>
      <FormRow>
        <Label>Año</Label>
        <Input type="number" name="anio" value={vehiculo.anio || ''} onChange={onChange} disabled={disabled} />
      </FormRow>
      <FormRow>
        <Label>Color</Label>
        <Input type="text" name="color" value={vehiculo.color || ''} onChange={onChange} disabled={disabled} />
      </FormRow>
      <FormRow>
        <Label>Placa</Label>
        <Input type="text" name="placa" value={vehiculo.placa || ''} onChange={onChange} disabled={disabled} />
      </FormRow>
    </FormWrapper>
  )
}


const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`

const Label = styled.label`
  flex: 1;
  color: black;
  font-weight: bold;
  text-align: right;
`

const Input = styled.input`
  flex: 2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`