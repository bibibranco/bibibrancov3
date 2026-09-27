import './Header.css' 
import logo from '../../assets/logo.svg'

function Header() {

  return (
    <div className='container-header'>
      <img src={logo}></img>
    </div>
  )
}

export default Header
