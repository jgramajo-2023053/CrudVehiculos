import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { VerModal } from './VerModal'
import { AgregarModal } from './AgregarModal'

export const Vehiculos = () => {
  // Estados
  const [vehiculos, setVehiculos] = useState([])
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null)
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    marca: '',
    modelo: '',
    anio: '',
    color: '',
    placa: ''
  })
  const [errores, setErrores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false)

  // Validación
  const esVehiculoValido = (vehiculo) => {
    return Object.values(vehiculo).every(valor => String(valor).trim() !== '')
  }

  const esNuevoValido = esVehiculoValido(nuevoVehiculo)
  const esValido = vehiculoSeleccionado ? esVehiculoValido(vehiculoSeleccionado) : false

  // Cargar vehículos
  const cargarVehiculos = () => {
    setLoading(true)
    fetch('http://localhost:3000/vehiculos')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener los vehículos')
        return res.json()
      })
      .then(data => {
        setVehiculos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    cargarVehiculos()
  }, [])

  // Formularios
  const handleChangeNuevo = (e) => {
    const { name, value } = e.target
    setNuevoVehiculo(prev => ({ ...prev, [name]: value }))
  }

  const handleChangeSeleccionado = (e) => {
    const { name, value } = e.target
    setVehiculoSeleccionado(prev => ({ ...prev, [name]: value }))
  }

  // Modal Agregar
  const abrirAgregarModal = () => {
    setNuevoVehiculo({
      marca: '',
      modelo: '',
      anio: '',
      color: '',
      placa: ''
    })
    setErrores([])
    setMostrarAgregarModal(true)
  }

  const cerrarAgregarModal = () => {
    setErrores([])
    setMostrarAgregarModal(false)
  }

  const handleSubmitNuevo = () => {
    setErrores([])
    fetch('http://localhost:3000/vehiculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...nuevoVehiculo,
        anio: parseInt(nuevoVehiculo.anio, 10)
      })
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) {
          setErrores(data.errors || [data.message || 'Error al agregar el vehículo'])
          throw new Error('Validación fallida')
        }
        return data
      })
      .then(() => {
        cerrarAgregarModal()
        cargarVehiculos()
      })
      .catch(err => console.warn('Error al crear:', err.message))
  }

  // Modal Ver/Editar/Eliminar
  const abrirModal = (id) => {
    fetch(`http://localhost:3000/vehiculos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener el vehículo')
        return res.json()
      })
      .then(data => {
        setVehiculoSeleccionado(data)
        setEditando(false)
        setErrores([])
        setMostrarModal(true)
      })
      .catch(err => alert(err.message))
  }

  const cerrarModal = () => {
    setErrores([])
    setVehiculoSeleccionado(null)
    setEditando(false)
    setMostrarModal(false)
  }

  const handleEditar = () => {
    setEditando(true)
  }

  const handleCancelarEdicion = () => {
    setEditando(false)
  }

  const handleGuardar = () => {
    setErrores([])

    fetch(`http://localhost:3000/vehiculos/${vehiculoSeleccionado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...vehiculoSeleccionado,
        anio: parseInt(vehiculoSeleccionado.anio, 10)
      })
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) {
          setErrores(data.errors || [data.message || 'Error al actualizar el vehículo'])
          throw new Error('Validación fallida')
        }
        return data
      })
      .then(() => {
        cerrarModal()
        cargarVehiculos()
      })
      .catch(err => console.warn('Error al guardar:', err.message))
  }

  const handleEliminar = () => {
    if (!vehiculoSeleccionado) return
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este vehículo?')
    if (!confirmar) return

    fetch(`http://localhost:3000/vehiculos/${vehiculoSeleccionado.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar el vehículo')
        return res.json()
      })
      .then(() => {
        cerrarModal()
        cargarVehiculos()
      })
      .catch(err => alert(err.message))
  }

  // Pantalla de Carga
  if (loading) return <p>Cargando vehículos...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Container>
      <TopBar>
        <Titulo>Vehículos CRUD</Titulo>
        <BotonAgregar onClick={abrirAgregarModal}>Agregar Vehículo</BotonAgregar>
      </TopBar>

      <TituloTabla>Lista de Vehículos</TituloTabla>
      {vehiculos.length === 0 ? (
        <p>No hay vehículos registrados.</p>
      ) : (
        <Tabla>
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Color</th>
              <th>Placa</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.anio}</td>
                <td>{v.color}</td>
                <td>{v.placa}</td>
                <td>
                  <BotonVer onClick={() => abrirModal(v.id)}>Ver</BotonVer>
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>
      )}

      {mostrarModal && (
        <VerModal
          vehiculo={vehiculoSeleccionado}
          disabled={!editando}
          onChange={handleChangeSeleccionado}
          onEditar={editando ? handleGuardar : handleEditar}
          onCancelar={editando ? handleCancelarEdicion : null}
          onEliminar={handleEliminar}
          onClose={cerrarModal}
          esValido={esValido}
          errores={errores}
        />
      )}

      {mostrarAgregarModal && (
        <AgregarModal
          vehiculo={nuevoVehiculo}
          onChange={handleChangeNuevo}
          onSubmit={handleSubmitNuevo}
          onClose={cerrarAgregarModal}
          esValido={esNuevoValido}
          errores={errores}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #343a40;
  color: white;
  border-radius: 8px;
`

const Titulo = styled.h2`
  margin: 0;
`

const BotonAgregar = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`

const TituloTabla = styled.h3`
  margin-bottom: 1rem;
`

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f8f9fa;
    color: black;
  }

  tr:hover {
    background-color: #f1f1f1;
    color: black;
  }
`

const BotonVer = styled.button`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
