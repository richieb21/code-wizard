import React from 'react'

const Header = ({ title }) => {

  return (
    <div className='header'>
        <h1 className='header-content'>{title ? title : "ASK ME ANYTHING"}</h1>
    </div>
  )
}

export default Header