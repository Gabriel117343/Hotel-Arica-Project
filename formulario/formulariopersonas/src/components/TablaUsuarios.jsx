import React from 'react'

import { toast } from 'react-hot-toast' // alertas para la interfaz
import { ValidarUsuarios } from './MostrarTabla'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import { deleteUsuario } from '../api/persona.api' // funcion Crud
import '../app.css'

import { useUsuarios } from '../hooks/useUsuarios'
export const TablaUsuarios = () => {
  const { usuarios, refrescarTabla } = useUsuarios() // consumiendo el contexto

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
        await deleteUsuario(id)
        toast.success('Usuario eliminado!')
        setTimeout(() => {
          refrescarTabla() // usando la funcion del contexto
        }, 2500)
      } else {

        // si es cancelar retorna
      }
    }
    confirmar()
  }

  const edicionUsuario = (id) => {
    // Enviara el id del usuario atravez del la url y el estado de la lista de usuarios
    navigate(`/admin/editar/${id}`, { state: { listaUsuarios: usuarios } })
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

              <ValidarUsuarios listaPersonas={usuarios} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario} />

            </div>
          </div>

        </div>

      </div>
    </section>

  )
}
