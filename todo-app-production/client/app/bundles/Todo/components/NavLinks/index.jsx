// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './NavLinks.scss';

const NavLinks = () => (
  <div>
    <NavLink exact to="/pending" activeClassName={css.active}>Pending</NavLink>
    <NavLink exact to="/completed" activeClassName={css.active}>Completed</NavLink>
    <NavLink exact to="/all" activeClassName={css.active}>All</NavLink>
  </div>
);

export default NavLinks;
