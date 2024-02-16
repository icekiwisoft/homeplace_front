import { useParams } from "react-router-dom"
import ProductDetailCard from "../../components/ProductDetailCard/ProductDetailCard"

import React, { useEffect, useState } from "react"
import Nav2 from "../../components/Nav2/Nav2"
import ProductCard from "../../components/ProductCard/ProductCard"
import {  Ad as AdType } from "../../utils/types"
import useAxios from "../../utils/useAsios"

export default function Ad(): React.ReactElement {

    const{id}=useParams()
    const axios=useAxios()
    const [adInfo,setAdInfo]=useState<AdType | null>(null)
    const [ ads,setAds]=useState<AdType[]>([])

    const getAdinfo=async()=>
    {
        const response=await axios.get(`/ads/${id}`)
        setAdInfo(response.data)
    }

    const getRecommandation=async()=>
    {
        const response=await axios.get(`/ads`)
        setAds([...ads,...response.data])
    }
    useEffect(()=>
    {
getAdinfo();
getRecommandation();
    },[id])



  return (
    <div className='2xl:px-20 xl:px-16 '>
    <Nav2/>
    <div className=' 2xl:px-0  px-10   my-8 '>
{
    adInfo&&    <ProductDetailCard {...adInfo}/>

}
<section>
    <h2 className="text-xl font-semibold  my-5">vos pourriez aimez</h2>
<div className='grid 2xl:gap-5  gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 my-8 '>

{ads.map((ad)=>
{
return(
<ProductCard {...ad}  />

)
})
}

</div>
</section>

    </div>
    </div>

  )
}