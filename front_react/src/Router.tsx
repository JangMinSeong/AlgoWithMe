import {createBrowserRouter} from "react-router-dom";
import Landing from '@/pages/Landing'
import Main from '@/pages/Main'
import Loading from "@/pages/Loading.tsx";
import Editor from "@/pages/Editor.tsx";
import Study from "@/pages/Study.tsx";
import StudyRoom from "@/pages/StudyRoom.tsx";
import StudyLayout from "@/pages/StudyLayout.tsx";
import Invitation from "@/pages/Invitation.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: '/main',
        element: <Main />
    },
    {
        path: '/loading',
        element: <Loading />
    },
    {
        path: ':groupId',
        element: <StudyLayout />,
        children: [
            {
                path: 'editor/:problemId',
                element: <Editor />
            }
        ]
    },
    {
        path: '/:groupId/study',
        element: <Study />
    },
    {
        path: '/:groupId/study/room',
        element: <StudyRoom />
    },
    {
        path: '/invitation/:groupId',
        element: <Invitation />
    }
])

export default router
