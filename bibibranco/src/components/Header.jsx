import { useState } from 'react'
import './Header.css' 
import logo from '../assets/logo.svg'

function Header() {
  const [count, setCount] = useState(0)

  return (
    <>
    <img src={logo}></img>
    </>
  )
}

export default Header
