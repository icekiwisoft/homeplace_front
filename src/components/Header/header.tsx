import Hero from './Hero/Hero'
import Nav from './Nav/Nav'
import './header.scss'
import React from 'react'

export default function Header(): React.ReactElement {
  return (
    <header>
      <Nav />
  
      <div className="lg:px-[75px] xl:px-[120px] ">
      <Hero />

      </div>
    </header>

  )
}
