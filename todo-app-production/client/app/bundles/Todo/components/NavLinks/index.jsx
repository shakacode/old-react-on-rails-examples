import React from 'react'
import {
  NavLink
} from 'react-router-dom'

const NavLinks = () => (
  <div>
    <NavLink exact to="/pending" activeClassName='active'>Pending</NavLink>
    <NavLink exact to="/completed" activeClassName='active'>Completed</NavLink>
    <NavLink exact to="/all" activeClassName='active'>All</NavLink>
  </div>
)

export default NavLinks
