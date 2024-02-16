
import { Interface } from 'readline'
import './ProductCard.scss'
import React from 'react'
import defaultHouseImg from '../../assets/default-img/houses.jpg'
import { Link } from 'react-router-dom'
import { Ad } from '../../utils/types'

export default function ProductCard(props:Ad): React.ReactElement {
  const {description,price,medias,id,presentation}:Ad=props

  return (<Link to={"/announces/"+id} className=" overflow-hidden cursor-pointer ">
      <div className="h-60 bg-gray-300 rounded-lg overflow-hidden">
        {
        <img className=' object-cover min-h-full min-w-full  w-full' src={"http://localhost:8000"+presentation}/>
        }
    </div>
      <div className="py-2 flex justify-between ">
        <h3 className="font-semibold mb-1 text-sm">{description}</h3>

        <span className="text-gray-800 ">{price} frcfa</span>
      </div>
</Link>

  )
}
