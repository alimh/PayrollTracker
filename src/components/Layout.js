import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      <Link to="/">Home</Link>
    </header>
    <div className="app-content">{props.children}</div>
    <footer>
      <p>
        Footer
      </p>
    </footer>
  </div>
);

export default Layout;
