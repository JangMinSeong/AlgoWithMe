import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import useInterceptor from '@/hooks/useInterceptor'
import useAuth from '@/hooks/useAuth'
import { User } from '@/features/auth/authTypes'
import generateSVGPath from '@/lib/computeControlPoints'
import {Outlet, useNavigate} from "react-router-dom";

export default function Layout() {
    const user = useSelector((state: RootState) => state.auth.user)
    const { handleLogout, handleLogin } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const hasOngoingRequest = useRef(false)
    const navigate = useNavigate()

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
                        navigate('/welcome')
                    }
                    setIsLoading(false)
                    console.log(isLoading)
                })()
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

    return (
        <div className="flex">
            <main className="ml-2 w-dvw max-w-dvw mt-16 transition-all duration-700`">
                <Outlet />
            </main>
        </div>
    )
}
