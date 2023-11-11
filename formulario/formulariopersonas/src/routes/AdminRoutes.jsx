import '../App.css'
import { Routes, Route } from 'react-router-dom'

import { FormEditar } from '../pages/FormEditar'
import { PaginaAdminRegistro } from '../pages/PaginaAdminRegistro'

import { NavbarAdmin } from '../views/NavbarAdmin'
import { Toaster } from 'react-hot-toast'
import { UsuarioProvider } from '../context/UsuarioContext'
export const AdminRoutes = () => {
  return (
    <UsuarioProvider>
      <NavbarAdmin />
      <Routes>

        <Route path='/admin-registro-usuarios' element={<PaginaAdminRegistro />} />

        <Route path='/editar/:id' element={<FormEditar />} />
      </Routes>
      <Toaster />

    </UsuarioProvider>
  )
}
