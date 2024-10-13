import React from 'react'
import UserInfoCard from "@components/Dashboard/UserInfoCard/UserInfoCard";
import UserTabs from "@components/Dashboard/UserTabs/UserTabs";

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
