import React, { useEffect, useContext } from 'react'
import { FormAdmin } from './FormAdmin'
import { TablaUsuarios } from './TablaUsuarios'

import { UsuarioContext } from '../context/UsuarioContext.jsx'
export const AdminFuncionRegistra = () => {
  const { getUsuarios } = useContext(UsuarioContext)
  useEffect(() => {
    getUsuarios() // obtiene los usuarios de la base de datos y los almacena en el estado de usuarios del contexto UsuarioContext
  }, [])

  return (
    <>
      <FormAdmin />
      <TablaUsuarios />
    </>
  )
}
