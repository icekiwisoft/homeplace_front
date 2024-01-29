import { Interface } from 'readline'
import './Stats.scss'
import React from 'react'
import { FaHouseUser } from 'react-icons/fa'
import {MdChair, MdGroup, MdHouse} from 'react-icons/md'


const stats = [
    {
        name:"house",
        value:50,
        icon:MdHouse
    },
    {
        name:"furnitures",
        value:50,
        icon:MdChair
    },
    {
        name:"announcer",
        value:50,
        icon:MdGroup
    },
]

export default function Stats(): React.ReactElement {
  return (
<div className="  flex px-44  w-full gap-11 py-28 items-center ">


{

    stats.map(s =>
        {
            return (
              <div className='px-8 py-4 pb-2 flex flex-1 rounded-lg justify-between items-center shadow-stat'>
                <div className=' text-center'>

                <span className='text-[2rem] font-semibold'>
                    {s.value}+
                </span>
                <h2 className='text-[1.3rem] '>
                    {s.name}
                </h2>


                </div>

{<s.icon size={64}/>}
                

                
                </div>
            )
        })

}

<div>

</div>
</div>

  )
}
