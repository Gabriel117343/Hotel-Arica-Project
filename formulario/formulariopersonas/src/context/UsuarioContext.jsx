import { createContext, useState } from 'react'
// 1 Crear el contexto
export const UsuarioContext = createContext()

// contexto para todo el arbol de componentes de Administrador

export const UsuarioProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])
  return (
    <UsuarioContext.Provider value={{
      usuarios,
      setUsuarios
    }}
    >{children}
    </UsuarioContext.Provider>
  )
}
