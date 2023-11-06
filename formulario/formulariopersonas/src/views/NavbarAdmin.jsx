import { Link } from 'react-router-dom'
export function NavbarAdmin () {
  return (

    <header>

      <nav className='navbar fixed-top'>

        <div className='container align-items-center justify-content-between '>
          <div>
            <Link className='link' to='/index'>
              <img className='logo' src='../public/images/LogoAricaHotel.png' alt='Logo Arica' />
            </Link>

            <Link className='link' to='/index'>Inicio</Link>
            <Link className='link ms-4' to='/sobre-nosotros'>Sobre Nosotros</Link>

          </div>
          <div>
            <Link className='link' to='/index'>Opciones</Link>
            <Link className='ms-4 link' to='/index'>Salir</Link>
          </div>

        </div>

      </nav>

    </header>

  )
}
