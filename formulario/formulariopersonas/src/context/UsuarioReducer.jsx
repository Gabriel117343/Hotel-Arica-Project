export const UsuarioReducer = (state, action) => { // recibe el estado actual y la accion que se va a ejecutar
  const { payload, type } = action // destructuring de la accion

  switch (type) {
    case 'GET_USUARIOS':
      return {
        ...state,
        usuarios: payload // guarda los usuarios en el estado
      }
    case 'GET_USUARIO':
      return {
        ...state,
        usuarioSeleccionado: payload // guarda el usuario seleccionado en el estado
      }
    case 'CREATE_USUARIO':
      return {
        ...state,
        usuarios: [...state.usuarios, payload] // agrega el nuevo usuario al arreglo de usuarios
      }
    case 'DELETE_USUARIO':
      return {
        ...state,
        usuarios: state.usuarios.filter((usuario) => usuario.id !== payload) // filtra los usuarios que no sean el que se quiere eliminar
      }
    case 'UPDATE_USUARIO':
      console.log('adsf')
      return {
        ...state, // copia el estado actual del componente
        usuarios: state.usuarios.map((usuario) => usuario.id === payload.id ? payload : usuario) // actualiza el usuario  que se modifico y deja los demas igual como estaban antes de la modificacion
      }
  }
}
