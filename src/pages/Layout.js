import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      { props.authenticated ?
        <Link to="/user">{props.authenticated}</Link> :
        <Link to="/user">Login</Link>
      }
    </header>
    <div className="app-content">{props.children}</div>
    <footer>
      <Link to="/settings">Settings</Link>
      <Link to="/payroll">Payroll</Link>
      <Link to="/employees">Employees</Link>
      <p>
        Footer
      </p>
    </footer>
  </div>
);

export default Layout;
