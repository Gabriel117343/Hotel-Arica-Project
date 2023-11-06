import React, { useEffect } from 'react'
import { FormAdmin } from './FormAdmin'
import { TablaUsuarios } from './TablaUsuarios'

import { getAllUsuarios } from '../api/persona.api' // funcion para obtener todos los usuarios del back end

import { useUsuarios } from '../hooks/useUsuarios.js'
export const AdminFuncionRegistra = () => {
  const { setUsuarios } = useUsuarios()
  useEffect(() => {
    async function loadUsuario () {
      // espera que se obtenga el resultado con await antes de seguir
      const res = await getAllUsuarios()
      // Guardando Json en persona
      setUsuarios(res.data)
    }

    loadUsuario()
  }, [])

  return (
    <>
      <FormAdmin />
      <TablaUsuarios />
    </>
  )
}
