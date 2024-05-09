import { useEffect } from 'react'
import {BrowserRouter as Router, Link, useParams} from 'react-router-dom';

const API_URL =
    import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_DEV_URL
        : import.meta.env.VITE_API_URL

const InvitationPage = () => {
    const {groupId} = useParams()

    useEffect(() => {
        const studyInfoRes = fetch(`${API_URL}/study/${groupId}`, {
            method: 'GET',
            credentials: 'include',
        })

        // const groupName = studyInfoRes.data.group_name
    }, [])

    const handleJoinGroup = async () => {
        const joinGroupRes = await fetch(`${API_URL}/study/member`, {
            method: 'POST',
            // body: JSON.stringify({ user_id: userId, group_id: Number(groupId) }),
            credentials: 'include',
        })
    }

    return (
        <div>
            {'groupName'}그룹에 초대받았어요! 수락하시겠어요?
            <Link to="/main">아니요</Link>
            <button onClick={handleJoinGroup}>네</button>
        </div>
    )
}

export default InvitationPage
