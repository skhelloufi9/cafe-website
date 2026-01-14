import React from 'react'

export default function Header(){
  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="site-title">The Corner Cafe</h1>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
          <a href="#bookings">Bookings</a>
        </nav>
      </div>
    </header>
  )
}
