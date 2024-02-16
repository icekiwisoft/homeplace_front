import React, { useEffect, useState } from 'react'
import { Announcer } from '../../../utils/types';
import useAxios from '../../../utils/useAsios';
import AdsTable from '../../../components/Dashboard/AdsTable/AdsTable';


export default function Ads():React.ReactElement {
    return (
        <>
      <AdsTable/>
        </>
    )
}


