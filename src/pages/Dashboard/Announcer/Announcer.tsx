import React from 'react'
import { MdCategory } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import UserCard from '../../../components/Dashboard/AnnouncersTable/AnnouncersTable';
import UserInfoCard from '../../../components/Dashboard/UserInfoCard/UserInfoCard';
import UserTabs from '../../../components/Dashboard/UserTabs/UserTabs';

export default function Announcer() {
    return (
        <>
            <div className="p-4 px-4">
                <UserInfoCard/>
                <UserTabs/>
            </div>
        </>
    )
}
