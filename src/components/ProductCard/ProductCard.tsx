
import { Interface } from 'readline'
import './ProductCard.scss'
import React from 'react'
import defaultFurnitureImg from '../../assets/default-img/furnitures.jpg'
import defaultHouseImg from '../../assets/default-img/houses.jpg'
import { Link } from 'react-router-dom'

export default function ProductCard(props:Product | undefined): React.ReactElement {
  return (
<Link to={"#"} className="shadow-md rounded-lg overflow-hidden cursor-pointer ">
    <div className="h-48 overflow-hidden">
              <img className='object-cover min-h-full min-w-full  w-full' src={defaultHouseImg}/>
    </div>
      <div className="py-3 px-5">
        <h3 className="font-semibold my-2">element 1</h3>
        <p className="font-thin h-16">
          cet element vest assez particulier vous verrez !
        </p>
        <span className="">5000 frcfa</span>
      </div>
</Link>

  )
}
