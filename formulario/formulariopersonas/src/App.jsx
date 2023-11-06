import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SobreNosotros } from './pages/SobreNosotros'
import { Index } from './pages/index'
import { Toaster } from 'react-hot-toast'
import { Footer } from './views/Footer'
import { AdminRoutes } from './routes/AdminRoutes'

function App () {
  return (
    <BrowserRouter> {/** Tiene que envolver toda la aplicacion BrowserRouter */}
      <Routes>
        <Route path='/' element={<Navigate to='/index' />} />
        <Route path='/sobre-nosotros' element={<SobreNosotros />} />
        <Route path='/index' element={<Index />} />
        <Route path='*' element={<h1>No Found</h1>} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        {/* Al agregar un (*) al final de una ruta en React Router indica que esa ruta y todas sus subrutas coincidirán con la ruta especificada. Esto se llama una ruta "comodín" o "cualquier cosa" */}
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  )
}
export default App
