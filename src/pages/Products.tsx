import React from 'react'
import Nav2 from '../components/Nav2/Nav2'
import ProductCard from '../components/ProductCard/ProductCard'

export default function Products(): React.ReactElement {
  return (
<div className='px-32'>
<Nav2/>

<section className='grid gap-5  grid-cols-4 my-8 '>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
</section>
</div>

  )
}
