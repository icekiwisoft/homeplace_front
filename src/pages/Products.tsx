import React from 'react'
import Nav2 from '../components/Nav2/Nav2'
import ProductCard from '../components/ProductCard/ProductCard'
import { Input } from '@material-tailwind/react'

export default function Products(): React.ReactElement {
  return (
<div className='2xl:px-20 xl:px-16 '>
<Nav2/>
 
      <section className='grid 2xl:gap-5 2xl:px-0  px-10 gap-3 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 my-8 '>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
</section>
</div>

  )
}
