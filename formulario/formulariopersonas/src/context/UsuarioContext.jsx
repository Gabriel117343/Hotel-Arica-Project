import { createContext, useReducer } from 'react'
import { UsuarioReducer } from './UsuarioReducer'
import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from '../api/persona.api'
import { toast } from 'react-hot-toast' // alertas para la interfaz
import confetti from 'canvas-confetti' // efecto de confetti
// 1 Crear el contexto
export const UsuarioContext = createContext()

// contexto para todo el arbol de componentes de Administrador

export const UsuarioProvider = ({ children }) => {
  const initialState = {
    usuarios: [],
    usuarioSeleccionado: null
  }
  const [state, dispatch] = useReducer(UsuarioReducer, initialState)

  const getUsuarios = async () => {
    const res = await getAllUsuarios()
    dispatch({
      type: 'GET_USUARIOS',
      payload: res.data // guarda los usuarios en el estado
    })
  }
  const getUsuarioSeleccionado = async (id) => {
    const res = await getUsuario(id)
    dispatch({
      type: 'GET_USUARIO',
      payload: res.data // guarda el usuario seleccionado en el estado usuarioSeleccionado
    })
  }
  const crearUsuario = async (usuario, imagen) => {
    const res = await createUsuario(usuario, imagen) // espera a que se cree el usuario para continuar con la ejecucion del codigo y no se salte el toast de exito
    toast.success('Usuario creado!', { duration: 2000 })
    confetti()
    dispatch({
      type: 'CREATE_USUARIO',
      payload: res.data // agrega el nuevo usuario al arreglo de usuarios
    })
  }
  // const eliminarUsuario = async (id) => {
  //   await deleteUsuario(id)
  //   toast.success('Usuario eliminado!')
  //   dispatch({
  //     type: 'DELETE_USUARIO',
  //     payload: id // filtra los usuarios que no sean el que se quiere eliminar
  //   })
  // }
  const eliminarUsuario = async (id) => {
    try {
      await deleteUsuario(id)
      dispatch({
        type: 'DELETE_USUARIO',
        payload: id // filtra los usuarios que no sean el que se quiere eliminar
      })
      return { success: true, message: 'Usuario eliminado!' }
    } catch (error) {
      return { success: false, message: 'Hubo un error al eliminar el usuario.' }
    }
  } // en mvc este es el controlador que se encarga de eliminar el usuario de la base de datos y de actualizar el estado de la lista de usuarios

  const modificarUsuario = async (id, usuario) => {
    await updateUsuario(id, usuario)
    toast.success('Usuario actualizado!')
    dispatch({
      type: 'UPDATE_USUARIO',
      payload: usuario // actualiza el usuario  que se modifico y deja los demas igual como estaban antes de la modificacion
    })
  }

  return (
    <UsuarioContext.Provider value={{
      state,
      getUsuarios,
      crearUsuario,
      eliminarUsuario,
      getUsuarioSeleccionado,
      modificarUsuario
    }}
    >{children}
    </UsuarioContext.Provider>
  )
}
