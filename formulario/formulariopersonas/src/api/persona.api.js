import axios from 'axios'// para hacer peticiones al back end
// crear una instancia con la direccion
const usuariosApi = axios.create({
  // la urls por defectos
  baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/usuarios'
})
// Este es el crud
export const getAllUsuarios = () => {
  // return axios.get("http://127.0.0.1:8000/usuarios/datos/v1/usuarios/") > anterior
  return usuariosApi.get('/') // > nueva forma
}
export const getUsuario = (id) => {
  return usuariosApi.get(`/${id}/`)
}
export const createUsuario = async (usuario, imagen) => { // es necesario enviar la imagen como parametro para que se pueda enviar al servidor
  const formData = new FormData() // Crea un objeto de tipo FormData para enviar la imagen al servidor en el formato que el backend lo requiere

  formData.append('rut', usuario.rut)
  formData.append('nombre', usuario.nombre)
  formData.append('apellido', usuario.apellido)
  formData.append('telefono', usuario.telefono)
  formData.append('email', usuario.email)
  formData.append('password', usuario.password)
  // Agrega la imagen al objeto FormData
  formData.append('imagen', imagen)
  formData.append('jornada', usuario.jornada)

  // Envía los datos al servidor
  return usuariosApi.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteUsuario = (id) => {
  return usuariosApi.delete(`/${id}`)
}
export const updateUsuario = (id, usuario) => {
  return usuariosApi.put(`/${id}/`, usuario)
}
