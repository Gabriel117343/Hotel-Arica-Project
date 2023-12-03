import React, { useState } from 'react'
import axios from 'axios'
import { NavbarIndex } from '../views/NavbarIndex'
import toast from 'react-hot-toast'

// Función para obtener el token CSRF de la cookie
// Función para obtener el token CSRF de la cookie
export const handleLogout = async () => {
  const csrftoken = await token() // Obtén el token CSRF de la cookie
  const response = await axios.post('http://127.0.0.1:8000/usuarios/logout/', {}, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken // Agrega el token CSRF en el header
    }
  })

  if (response.status === 200) {
    // Handle successful logout
    toast.success(response.data.message)
    console.log('Logout successful')
  } else {
    // Handle error
    console.log('Logout failed')
  }
}
export const token = async () => {
  // Ejemplo en React usando fetch para obtener el token CSRF desde Django
  return await fetch('http://127.0.0.1:8000/usuarios/csrf/', {
    method: 'GET',
    credentials: 'include' // Para incluir cookies en la solicitud
  })
    .then(response => {
    // El token CSRF estará presente en las cookies de la respuesta
      return document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')?.pop()

    // Ahora puedes usar csrfToken para enviarlo en tus solicitudes POST desde React
    })
    .catch(error => {
      console.error('Error al obtener el token CSRF:', error)
    })
}
export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usuario, setUsuario] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    const csrftoken = await token()
    console.log(csrftoken)
    const response = await axios.post('http://127.0.0.1:8000/usuarios/login/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrftoken

      }
    })

    if (response.status === 200) {
      // Save user name and roles to state or context
      console.log(response)
      setUsuario(response.data.usuario)
      console.log(usuario)
    } else {
      // Handle error
      console.log('error')
    }
    console.log('asdlkjf')
  }

  return (
    <>
      <NavbarIndex />
      <button className='btn btn-info ms-5' onClick={handleLogout}>Logout</button>
      <section className='container'>
        <form onSubmit={handleSubmit}>
          <input type='text' className='form-control' value={email} onChange={e => setEmail(e.target.value)} placeholder='ejemplo@gmail.com' />
          <input type='password' value={password} className='form-control' onChange={e => setPassword(e.target.value)} placeholder='Ingrese su contraseña' />
          <button type='submit' className='btn btn-info'>Log in</button>
        </form>

      </section>

    </>

  )
}
