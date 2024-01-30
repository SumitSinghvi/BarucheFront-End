import React, { Children } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import LowerNavbar from './LowerNavbar'

export default function Layout({children}) {
  return(
    <div>
        <Navbar />
        <LowerNavbar />
        <section>
            {children}
        </section>
        <Footer />
    </div>
  )
}
