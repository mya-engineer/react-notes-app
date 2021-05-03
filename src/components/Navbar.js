import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  const [nav, setNav] = useState(false)

  return (
    <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
      <div className='navbar-brand'>Notes App</div>
      <button
        className='navbar-toggler'
        type='button'
        onClick={() => setNav(!nav)}>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div
        className={
          nav ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'
        }
        id='navbarNavDropdown'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink to='/' className='nav-link' exact>
              Homepage
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/kanban' className='nav-link'>
              Kanban
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className='nav-link'>
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
