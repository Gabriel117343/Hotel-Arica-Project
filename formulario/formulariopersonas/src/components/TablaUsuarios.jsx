import React, { useContext } from 'react'
import { ValidarUsuarios } from './MostrarTabla'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast' // alertas para la interfaz
import '../app.css'
import { UsuarioContext } from '../context/UsuarioContext'

export const TablaUsuarios = () => {
  const { state, eliminarUsuario, getUsuarioSeleccionado } = useContext(UsuarioContext)
  const navigate = useNavigate()
  const borrarPersona = (id) => {
    async function confirmar () {
      const aceptar = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6', //
        cancelButtonColor: '#d33'
      })
      if (aceptar.isConfirmed) {
        toast.loading('Eliminando...', { duration: 2000 })
        setTimeout(async () => {
          const { success, message } = await eliminarUsuario(id)
          if (success) {
            toast.success(message)
          } else {
            toast.error(message)
          }
        }, 2000)
      }
    }
    confirmar()
  }

  const edicionUsuario = async (id) => {
    // Enviara el id del usuario atravez del la url y el estado de la lista de usuarios
    await getUsuarioSeleccionado(id)
    navigate(`/admin/editar/${id}`)
  }

  return (

    <section className='fondo-registro'>

      <div className='container pt-5'>
        <div className='row'>

          <div className='col-md-12'>
            <a href='#tabla-usuarios'>{/** Se desplazara a la tabla usuarios atravez del id de la tabla */}
              <h1 className='text-center titulo-white titulo-tabla'>Usuarios Registrados</h1>
            </a>

            <div>

              <ValidarUsuarios listaPersonas={state.usuarios} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario} />

            </div>
          </div>

        </div>
      </div>
    </section>

  )
}
