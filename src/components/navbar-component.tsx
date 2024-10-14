import React from 'react'

const NavBarComponent = () => {
  return (
    <nav className="navbar">
  <div className="container">
    <div className="navbar-brand">
      <a className="navbar-item" href="/"><i className="fas fa-store fa-2x">Recoil React Js POC</i></a>
    </div>
    <div className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary" href="#"
              ><strong>Add Product</strong></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

  )
}

export default NavBarComponent
