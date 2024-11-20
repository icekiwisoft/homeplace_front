import UserInfoCard from '@components/Dashboard/UserInfoCard/UserInfoCard';
import UserTabs from '@components/Dashboard/UserTabs/UserTabs';
import React from 'react';

export default function Announcer() {
  return (
    <>
      <div className='p-4 px-4'>
        <UserInfoCard />
        <UserTabs />
      </div>
    </>
  );
}
