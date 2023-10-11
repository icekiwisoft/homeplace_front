import Nav from '../elements/Nav/NAv'
import Hero from '../elements/Hero/Hero'
import './header.css'

export default function header() {
  return (
    <header className='h-fit'>
      <Nav/>
      <Hero/>
    </header>
  )
}
