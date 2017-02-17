import React from 'react'
import {
  NavLink
} from 'react-router-dom'

const NavLinks = () => (
  <div>
    <NavLink exact to="/pending" activeClassName='active'>pending</NavLink>
    <NavLink exact to="/completed" activeClassName='active'>completed</NavLink>
    <NavLink exact to="/all" activeClassName='active'>all</NavLink>
  </div>
)

export default NavLinks
