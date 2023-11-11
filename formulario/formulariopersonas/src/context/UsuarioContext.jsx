import { createContext, useState, useReducer } from 'react'
import { UsuarioReducer } from './UsuarioReducer'
import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from '../api/persona.api'
import { toast } from 'react-hot-toast' // alertas para la interfaz
import confetti from 'canvas-confetti' // efecto de confetti
// 1 Crear el contexto
export const UsuarioContext = createContext()

// contexto para todo el arbol de componentes de Administrador

export const UsuarioProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])

  const initialState = {
    usuarios: [],
    usuarioSeleccionado: null
  }
  const [state, dispatch] = useReducer(UsuarioReducer, initialState)

  const getUsuarios = async () => {
    const res = await getAllUsuarios()
    dispatch({
      type: 'GET_USUARIOS',
      payload: res.data
    })
  }
  const getUsuarioSeleccionado = async (id) => {
    const res = await getUsuario(id)
    dispatch({
      type: 'GET_USUARIO',
      payload: res.data
    })
  }
  const crearUsuario = async (usuario) => {
    const res = await createUsuario(usuario)
    toast.success('Usuario creado!', { duration: 2000 })
    confetti()
    dispatch({
      type: 'CREATE_USUARIO',
      payload: res.data
    })
  }
  const eliminarUsuario = async (id) => {
    console.log(id)
    await deleteUsuario(id)
    toast.success('Usuario eliminado!')
    dispatch({
      type: 'DELETE_USUARIO',
      payload: id
    })
  }
  const modificarUsuario = async (id, usuario) => {
    await updateUsuario(id, usuario)
    toast.success('Usuario actualizado!')
    dispatch({
      type: 'UPDATE_USUARIO',
      payload: usuario
    })
  }

  return (
    <UsuarioContext.Provider value={{
      usuarios,
      state,
      setUsuarios,
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
