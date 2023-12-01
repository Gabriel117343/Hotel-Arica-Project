import React, { useState } from 'react'
import axios from 'axios'
import { NavbarIndex } from '../views/NavbarIndex'
export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const response = await axios.post('http://127.0.0.1:8000/usuarios/login/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      // Save user name and roles to state or context
      console.log(response)
    } else {
      // Handle error
      console.log('error')
    }
    console.log('asdlkjf')
  }

  return (
    <>
      <NavbarIndex />
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
