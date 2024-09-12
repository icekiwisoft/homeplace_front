import Hero from './Hero/Hero'
import Nav from './Nav/Nav'
import React from 'react'

export default function Header(): React.ReactElement {
  return (
    <header>
      <Nav />
      <div className=" 2xl:px-[120px] ">
        <Hero />
      </div>
    </header>

  )
}
