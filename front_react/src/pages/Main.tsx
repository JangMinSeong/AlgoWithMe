import SideBar from '@/components/sidebar/SideBar'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import useInterceptor from '@/hooks/useInterceptor'
import useAuth from '@/hooks/useAuth'
import { User } from '@/features/auth/authTypes'
import PageCreateModal from '@/components/sidebar/PageCreateModal'
import generateSVGPath from '@/lib/computeControlPoints'
import MainHeader from "@/components/header/Header.tsx";
import ChartProblem from "@/components/mainpage/ChartProblemComponent.tsx";
import StudyList from "@/components/mainpage/StudyListComponent.tsx";
import {redirect} from "react-router-dom";

export default function Main() {
    const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen)
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)
    const user = useSelector((state: RootState) => state.auth.user)
    const { handleLogout, handleLogin } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const hasOngoingRequest = useRef(false)

    // 예제 점 배열
    const points = [
        { x: 10, y: 80 },
        { x: 100, y: 100 },
        { x: 200, y: 30 },
        { x: 300, y: 150 },
        { x: 400, y: 60 },
    ]
    const svgOutput = generateSVGPath(points)
    console.log(svgOutput)

    const baseUrl =
        import.meta.env.MODE === 'development'
            ? import.meta.env.VITE_API_DEV_URL
            : import.meta.env.VITE_API_URL

    useEffect(() => {
        const refreshTask = async () => {
            if (hasOngoingRequest.current) {
                return
            }
            hasOngoingRequest.current = true

            if (user === null) {
                await (async () => {
                    const response = await fetch(`${baseUrl}/user/refresh`, {
                        method: 'POST',
                        credentials: 'include',
                    })
                    if (response.ok) {
                        const data = await response.json()
                        const updatedAccessToken =
                            response.headers.get('Authorization')?.split(' ')[1] || ''
                        const updatedUser: User = {
                            nickname: data.nickname,
                            imageUrl: data.imageUrl,
                            accessToken: updatedAccessToken,
                        }
                        handleLogin(updatedUser)
                    } else {
                        handleLogout()
                    }
                    setIsLoading(false)
                    console.log(isLoading)
                })()
            } else {
                setIsLoading(false)
            }
        }
        refreshTask()
    }, [user])

    useInterceptor({
        configs: {
            baseUrl: baseUrl || '',
            accessToken: user?.accessToken || '',
        },
        onRequest: (url, options, configs) => ({
            url: `${configs?.baseUrl}${url}`,
            options: {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${configs?.accessToken}`,
                },
                credentials: 'include',
            },
        }),
        onError: async (response) => {
            if (response.stateus === 401 && user) {
                const refreshResponse = await fetch(`${baseUrl}/user/refresh`, {
                    method: 'POST',
                    credentials: 'include',
                })

                if (refreshResponse.ok) {
                    const newAccessToken = refreshResponse.headers
                        .get('Authorization')
                        ?.split(' ')[1]

                    if (newAccessToken) {
                        const updatedUser = { ...user, accessToken: newAccessToken }
                        handleLogin(updatedUser)
                    } else {
                        handleLogout()
                    }
                } else {
                    handleLogout()
                }
            }
        },
        onSuccess: (response) => response,
    })

    const handleButtonClick = async () => {
        try {
            const response = await fetch('/study', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                console.log('스터디 생성 성공:', data)
                redirect(`${data.teamId}/study`)
            } else {
                console.error('스터디 생성 실패')
            }
        } catch (error) {
            console.error('네트워크 오류:', error)
        }
    }

    return (
        <div className="flex">
            <SideBar />
            {!isLoading && (
                <main
                    className={`${isSidebarOpen ? 'ml-52 mr-2' : 'mr-2'} ml-2 w-dvw max-w-dvw mt-16 transition-all duration-700`}
                >
                    <div>
                        <MainHeader />
                        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                            <main className="flex w-full flex-col items-center justify-center text-center mt-0.5 pb-10">
                                <ChartProblem />
                                <StudyList />
                            </main>

                            <button
                                className="fixed bottom-4 right-4 w-12 h-12 bg-darkPurple text-background rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center text-2xl"
                                onClick={handleButtonClick}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </main>
            )}
            {isModalOpen && <PageCreateModal />}
        </div>
    )
}
