import AnnouncersTable from '@components/Dashboard/AnnouncersTable/AnnouncersTable';
import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaPlusSquare } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

import { Announcer } from '../../../utils/types';
import useAxios from '../../../utils/useAsios';

export default function Announcers(): React.ReactElement {
  return (
    <>
      <AnnouncersTable />
    </>
  );
}
