import StudyHeader from '@/components/header/StudyHeader'
import {Outlet} from 'react-router-dom'

import React from 'react'

export default function Layout() {
    return (
        <>
            <div>
                <StudyHeader />
                <main className="bg-white bg-opacity-70 p-8 rounded-lg">
                    <Outlet />
                </main>
            </div>
        </>
    )
}
