/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { getUsuario, updateUsuario } from '../api/persona.api'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef, useId } from 'react'

import { toast } from 'react-hot-toast'
import '../App.css'
import { useClasesInput } from '../hooks/useClasesInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// debounce retrasara le ejecucion de validarTerminos para reducir la cantidad de veces que se ejecute
import debounce from 'lodash/debounce'

export const FormEditar = () => {
  // Accediendo al valor :id de la ruta /editar/<id>, id del usuario a buscar
  const params = useParams()

  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [usuarioBusca, setUsuarioBusca] = useState([])

  // Obteniendo la lista de usuarios enviada en TablaUsuarios: navigate(`/admin/editar/${id}`, {state: {listaUsuarios: usuarios} });
  const { state } = useLocation()
  const usuarios = state.listaUsuarios

  // Creando un id para los inputs

  const idEditAdmin = useId()

  // navegacion
  const navigate = useNavigate()
  // Referencias

  const nombreRef = useRef()
  const apellidoRef = useRef()
  const telefonoRef = useRef()
  const correoRef = useRef()
  const contraseñaRef = useRef()
  const jornadaRef = useRef()
  const checkRef = useRef()

  // Llamada a Custom Hooks, hooks personalizado para asignar clases a los inputs

  const claseInput1 = useClasesInput()
  const claseInput2 = useClasesInput()
  const claseInput3 = useClasesInput()
  const claseInput4 = useClasesInput()
  const claseInput5 = useClasesInput()
  // si el input esta vacio retornara un true
  const validarCampos = (validar) => {
    validar = validar.trim()
    console.log(!validar)
    return !validar
  }

  const validarCorreoRepetido = (correo) => {
    console.log(correo)

    // busca si el correo ya fue registrado con algun usuario
    const correoValidado = usuarios.find(co => co.correo === correo)
    return new Promise((resolve, reject) => { // Uso de promesas
      if (correoValidado) {
        // retorna el error
        reject(new Error(`Ya existe un usuario con el correo: ${correo}`))
        navigate('/admin/admin-registro-usuarios')
      } else {
        resolve() // se podra continuar con actualizarUsuarios
      }
    })
  }

  const actualizarUsuario = async (event) => {
    event.preventDefault() // Previene el comportamiento por defecto de un formulario (recargar la página)

    const usuario = Object.fromEntries(new FormData(event.target)) // obtiene los datos del formulario y los convierte en un objeto
    console.log(usuario)
    const { rut, nombre, apellido, telefono, correo, contraseña, jornada, estado_activo } = usuario // desestructura el objeto usuario para obtener los datos del usuario

    usuario.estado_activo = usuario.estado_activo === 'on' // si el checkbox esta activo sera true si no false
    const use = usuarioBusca // usuario buscar son los datos del usuario encontrado

    // Esto sirve para que mantenga el rut original si no se modifica
    // Evitara que de un error donde el rut sea igual al de otro usuario
    if (use.nombre === nombre && use.apellido === apellido && use.telefono === telefono && use.correo === correo && use.contraseña === contraseña && use.estado_activo === estado_activo && use.jornada === jornada) {
      console.log('ambos iguales')
      toast.error('No hubo cambios!', { duration: 3000 })
      navigate('/admin/admin-registro-usuarios')
      return
    }

    try {
      // si el correo seguira siendo el mismo no llamara a la funcion para validar el correo repetido
      if (correo === usuarioBusca.correo) {
        await updateUsuario(params.id, usuario)
        toast.success('Usuario editado!', { duration: 3000 })
        navigate('/admin/admin-registro-usuarios')// redirige atras al finalizar el await
        return
      }

      await validarCorreoRepetido(correo)
      await updateUsuario(params.id, usuario)
      // Muestra un mensaje de éxito
      toast.success('Usuario editado!', { duration: 3000 })
      navigate('/admin/admin-registro-usuarios')// redirige atras al finalizar el await
    } catch (error) {
      setIsBtnDisabled(true) // Desactiva el boton del formulario

      // Maneja cualquier error que pueda ocurrir durante la operación asincrónica
      // Muestra un mensaje de error si es necesario con el reject - new Error - de cada await
      toast.error('No se pudo Editar el usuario: ' + error.message, { duration: 4000 })
    }
  }

  useEffect(() => {
    async function obtenerUsuario (id) {
      const us = await getUsuario(id) // Obtener un Usuario especifico del backEnd atravez de su - id -
      console.log(us)
      setUsuarioBusca(us.data)
    }

    obtenerUsuario(params.id)
  }, [])

  const validarEstadoBoton = () => {
    setIsBtnDisabled(true)
    console.log('validando...')
    // Se quitan los espacios en blanco para que no sean tomandos en cuenta con trim()
    const nom = nombreRef.current.value.trim()
    const ape = apellidoRef.current.value.trim()
    const tel = telefonoRef.current.value.trim()
    const cor = correoRef.current.value.trim()
    const con = contraseñaRef.current.value.trim()
    // test devolvera un true si cumple con el patron requerido
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    const correoValido = patronCorreo.test(cor)

    const patronContraseña = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?=.{8,})/
    const contraseñaValida = patronContraseña.test(con)

    const patronTelefono = /^\+56\s\d{9}$/
    const telefonoValido = patronTelefono.test(tel)

    // valida si hay algun campo que no cumpla con los requisitos
    const camposValidados = nom === '' || ape === '' || !telefonoValido || !correoValido || !contraseñaValida
    console.log(camposValidados)
    if (camposValidados === true) {
      setIsBtnDisabled(true)
    } else {
      setIsBtnDisabled(false)
    };
  }
  // Aqui se manejan 2 onChange del Input
  const handleOnChange = async (inputComprobar, valor, claseInput) => {
    // 1 El parametro enviado se utilizara para llamar al Hook personalizado de clases
    await claseInput.datoInput(validarCampos(valor), inputComprobar, valor) // lo primer parametro llamara a una funcion con el valor el otro parametro solo el valor de correo
    // 2 Llama a la funcion que validara si el boton estara desactivado o no
    validarEstadoBoton()
    console.log(claseInput.advertencia)
  }
  // debounce hara un retraso de 500 milisegundos antes de ejecutar validaciones
  // Optimiza el rendimiento
  // eslint-disable-next-line camelcase
  const debounce_handleOnChange = debounce(handleOnChange, 500)

  // funcion para mostrar la contraseña
  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword)
  }
  return (
    <div className='fondo-registro'>
      <div className='container'>
        <div className='row '>

          <div className='col-md-12 fondo-datos pb-4 mt-4'>
            <div className=' rounded text-center titulo-añadir'>
              <h1>Edicion de usuario</h1>

            </div>
            <form
              onSubmit={actualizarUsuario} className='form formulario-datos mt-4' id={idEditAdmin}
            >
              <div className='form-group'>
                <label htmlFor={`${idEditAdmin}-rut`}>Rut</label>
                <input
                  className='form-control' type='text'
                  defaultValue={usuarioBusca.rut} readOnly id={`${idEditAdmin}-rut`} name='rut'
                />
              </div>
              <div className='form-group'>
                <label htmlFor={`${idEditAdmin}-nombre`}>Nombre</label>
                <input
                  ref={nombreRef} onChange={e => debounce_handleOnChange('nombre', e.target.value, claseInput1)} type='text' className={`form-control text-capitalize ${claseInput1.clase}`}
                  placeholder='Nombres' defaultValue={usuarioBusca.nombre} id={`${idEditAdmin}-nombre`} name='nombre'
                />
                <div className='advertencia'>
                  <p className='d-block text-danger m-0'>{claseInput1.advertencia}</p>
                </div>

              </div>
              <div className='form-group'>

                <label htmlFor={`${idEditAdmin}-apellido`}>Apellido</label>
                <input
                  ref={apellidoRef} onChange={e => debounce_handleOnChange('apellido', e.target.value, claseInput2)} type='text' className={`form-control text-capitalize ${claseInput2.clase}`}
                  placeholder='Apellidos' defaultValue={usuarioBusca.apellido} id={`${idEditAdmin}-apellido`} name='apellido'
                />
                <div className='advertencia'>
                  <p className='d-block text-danger m-0'>{claseInput2.advertencia}</p>
                </div>

              </div>
              <div className='form-group'>
                <label htmlFor={`${idEditAdmin}-telefono`}>Telefono</label>
                <input
                  ref={telefonoRef} onChange={e => debounce_handleOnChange('telefono', e.target.value, claseInput3)} type='tel' className={`form-control text-capitalize ${claseInput3.clase}`}
                  placeholder='Ej: 9 23432303' defaultValue={usuarioBusca.telefono} id={`${idEditAdmin}-telefono`} maxLength={13} name='telefono'
                />
                <div className='advertencia'>
                  <p className='d-block text-danger m-0'>{claseInput3.advertencia}</p>
                </div>

              </div>

              <div className='form-group'>
                <label htmlFor={`${idEditAdmin}-correo`}>Correo</label>
                <input
                  ref={correoRef} onChange={e => debounce_handleOnChange('correo', e.target.value, claseInput4)} type='email' className={`form-control ${claseInput4.clase}`}
                  placeholder='Ej: corr.nuevo09@gmail.com' defaultValue={usuarioBusca.correo} id={`${idEditAdmin}-correo`} name='correo'
                />

                <div className='advertencia'>
                  <p className='d-block text-danger m-0'>{claseInput4.advertencia}</p>
                </div>
              </div>
              <div className='form-group contraseña-container'>
                <label htmlFor={`${idEditAdmin}-contraseña`}>Contraseña</label>
                <input
                  ref={contraseñaRef} onChange={e => debounce_handleOnChange('contraseña', e.target.value, claseInput5)} type={mostrarPassword ? 'text' : 'password'} className={`form-control ${claseInput5.clase}`}
                  defaultValue={usuarioBusca.contraseña} id={`${idEditAdmin}-contraseña`} name='contraseña'
                />
                <span className='icon'>
                  <FontAwesomeIcon
                    icon={mostrarPassword ? faEyeSlash : faEye}
                    onClick={toggleMostrarPassword}
                  />
                </span>
                <div className='advertencia'>
                  <p className='d-block text-danger m-0'>{claseInput5.advertencia}</p>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor={`${idEditAdmin}-jornada`}>Jornada</label>
                <select onChange={validarEstadoBoton} ref={jornadaRef} className='form-control' name='jornada' id={`${idEditAdmin}-jornada`} defaultValue={usuarioBusca.jornada}>

                  <option value={usuarioBusca.jornada}>{usuarioBusca.jornada}</option>
                  <option value={usuarioBusca.jornada === 'vespertino' ? 'duirno' : 'vespertino'}>{usuarioBusca.jornada === 'vespertino' ? 'duirno' : 'vespertino'}</option>
                </select>

              </div>
              <div className='d-flex mb-3 mt-3'>
                <input className='form-check-input' onClick={validarEstadoBoton} defaultChecked={usuarioBusca.estado_activo} ref={checkRef} type='checkbox' id={`${idEditAdmin}-estado`} name='estado_activo' />
                <p className='ps-2 m-0'>Usuario Activo</p>
              </div>
              <div className='mt-3 d-flex justify-content-between'>
                <button type='submit' className='btn btn-success' disabled={isBtnDisabled}>Actualizar</button>
                <Link className='btn btn-danger' to='/admin/admin-registro-usuarios'>Cancelar</Link>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  )
}
