import React from 'react'

import { AdminFuncionRegistra } from '../components/AdminFuncionRegistra'

import { UsuarioProvider } from '../context/usuarios'
export const PaginaAdminRegistro = () => {
  // 2 Proveer el contexto
  return (

    <main>
      <UsuarioProvider>

        <AdminFuncionRegistra />{/* 3 - lo que este dentro consumira el contexto - usuarios, setUsuarios y refrescarTabla - */}
      </UsuarioProvider>

    </main>

  )
}
