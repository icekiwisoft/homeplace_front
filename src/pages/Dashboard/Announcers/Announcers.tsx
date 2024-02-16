import React, { useEffect, useState } from 'react'
import { MdCategory } from "react-icons/md";
import { FaArrowUp, FaPlusSquare } from "react-icons/fa";
import { Announcer } from '../../../utils/types';
import useAxios from '../../../utils/useAsios';
import AnnouncersTable from '../../../components/Dashboard/AnnouncersTable/AnnouncersTable';

export default function Announcers():React.ReactElement {

     
    return (
        <>
    
      
      <AnnouncersTable/>

                

        </>
    )
}


