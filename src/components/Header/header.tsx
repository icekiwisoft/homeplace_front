import Nav from './Nav/Nav'
import Hero from './Hero/Hero'
import './header.scss'
import React from 'react'

export default function Header():React.ReactElement {
  return (
    <header>
      <Nav />
      <Hero />
    </header>
  )
}
