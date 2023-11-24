import React from 'react'

import { AdminFuncionRegistra } from '../components/AdminFuncionRegistra'

export const PaginaAdminRegistro = () => {
  // 2 Proveer el contexto
  return (

    <main>
      <AdminFuncionRegistra />{/* 3 - lo que este dentro consumira el contexto - usuarios, setUsuarios y refrescarTabla - */}
    </main>

  )
}
