import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import defaultFurnitureImg from '../../../assets/default-img/furnitures.jpg'
import defaultHouseImg from '../../../assets/default-img/houses.jpg'
interface Product
{
    name:string,
    price:number,
    description:string,
    media

}
 function AnnounceCard(props:Product | undefined): React.ReactElement {
  return (
<div className="shadow-md rounded-lg overflow-hidden bg-white ">
    <div className="h-48 ">
<img className='object-fill max-w-full max-h-full  w-full' src={defaultHouseImg}/>
    </div>

    <div className="py-3 px-5">
    <h3 className="font-semibold my-2">
        element 1
    </h3>
    <p className="font-thin h-16">
       cet element vest assez particulier vous verrez !
    </p>
    <span className="">
5000 frcfa
    </span>
    </div>

</div>

  )
}


function MediaCard(props:Product | undefined): React.ReactElement {
    return (
  <div className="shadow-md rounded-lg overflow-hidden bg-white ">
      <div className="h-48 ">
  <img className='object-fill max-w-full max-h-full  w-full' src={defaultHouseImg}/>
      </div>
  </div>
  
    )
  }
function AnnounceTab()
{
    return(
        <div className="grid grid-cols-4 gap-5">
<AnnounceCard/>
<AnnounceCard/>
<AnnounceCard/>
<AnnounceCard/>
<AnnounceCard/>
<AnnounceCard/>
        </div>
    )
}

function MediaTab()
{
    return(
        <div className="grid grid-cols-4 gap-5">
<MediaCard/>
<MediaCard/>
<MediaCard/>
<MediaCard/>
<MediaCard/>
<MediaCard/>

        </div>
    )
}


export default function UserTabs()
{

    const [option,setOption]=useState(0)

    return(
<div className=" mt-10 min-h-[500px]  justify-center rounded bg-gray-100 border shadow-md py-2 px-6 ">

<div className="py-7">
<div>
  
    <button className=" w-32 h-11" onClick={()=>setOption(0)}>announces</button>
    <button className=" w-32 h-11" onClick={()=>setOption(1)}>medias</button>
</div>
<div className="h-1 w-32 bg-gray-900 relative transition-all duration-300 ease-in-out " style={{left:option*128}} ></div>

</div>
{option === 0 && <AnnounceTab/> }
{option === 1 && <MediaTab/> }

</div>
    )
}