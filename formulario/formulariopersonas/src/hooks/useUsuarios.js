import { useContext } from 'react'
import { UsuarioContext } from '../context/usuarios'

import { getAllUsuarios } from '../api/persona.api' // funcion para obtener todos los usuarios del back end
import { toast } from 'react-hot-toast' // alertas para la interfaz
export const useUsuarios = () => {
  const { usuarios, setUsuarios } = useContext(UsuarioContext)

  const refrescarTabla = async () => {
    const nuevosDatos = await getAllUsuarios()
    toast.success('Tabla refrescada!', { duration: 3000 })

    setUsuarios(nuevosDatos.data)
  }
  return { usuarios, setUsuarios, refrescarTabla }
}
