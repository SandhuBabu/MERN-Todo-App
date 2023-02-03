import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

// icons
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineFreeCancellation } from 'react-icons/md'
import { RiTodoLine } from 'react-icons/ri'

const Navigation = () => {

  return (
    <nav className='nav-bar'>
      <span>
        <span className='icone-title-nav'>HOME</span>
        <Link to='/'>
          <AiOutlineHome className='nav-icon' />
        </Link>
      </span>
      <span>
        <span className='icone-title-nav'>TODOS</span>
        <Link to='/todo'>
          <RiTodoLine className='nav-icon' />
        </Link>
      </span>
      <span>
        <span className='icone-title-nav'>COMPLETED</span>
        <Link to='/completed'>
          <MdOutlineFreeCancellation className='nav-icon' />
        </Link>
      </span>
    </nav>
  )
}

export default Navigation
