import React from 'react'
import MenuBar from '../navigation/MenuBar';
import Footer from '../navigation/Footer';

import './Layout.css'

const Layout = (props) => {
  return(
    <>
      <MenuBar />

      <main className="main-content">
        {props.children}
      </main>

      <Footer/>
    </>
  );
}

export default Layout;
