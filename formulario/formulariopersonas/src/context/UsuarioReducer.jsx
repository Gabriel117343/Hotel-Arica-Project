export const UsuarioReducer = (state, action) => {
  const { payload, type } = action

  switch (type) {
    case 'GET_USUARIOS':
      return {
        ...state,
        usuarios: payload
      }
    case 'GET_USUARIO':
      return {
        ...state,
        usuarioSeleccionado: payload
      }
    case 'CREATE_USUARIO':
      return {
        ...state,
        usuarios: [...state.usuarios, payload]
      }
    case 'DELETE_USUARIO':
      return {
        ...state,
        usuarios: state.usuarios.filter((usuario) => usuario.id !== payload)
      }
    case 'UPDATE_USUARIO':
      console.log('adsf')
      return {
        ...state,
        usuarios: state.usuarios.map((usuario) => usuario.id === payload.id ? payload : usuario)
      }
  }
}
