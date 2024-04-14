import { useDispatch } from 'react-redux';
import {signIn, signOut, useSession} from 'next-auth/react';
import { loginSuccess, logout } from '@/features/auth/authSlice';
import { User } from '@/features/auth/authTypes';
import {useEffect} from "react";

const useAuth = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (session) {
            // 세션에 유저 데이터가 있다고 가정하고 처리
            const userData: User = {
                name: session.user?.name || '',
                email: session.user?.email || '',
                image: session.user?.image || '',
            };
            dispatch(loginSuccess(userData));
            console.log('Session', session);
        }
    }, [session]);

    const handleLogin = async () => {
        try {
            console.log('handleLogin');
            // signIn 함수를 호출하고 결과를 기다립니다.
            const result = await signIn('github', { callbackUrl: '/loading'});
            // signIn이 완료된 후 로직 실행
            console.log('result', result)
            if (result?.ok) {
                console.log('Login successful');
                // 추가적인 성공 처리 로직을 여기에 작성할 수 있습니다.
            } else {
                console.error('Login failed:', result?.error);
                throw new Error('Cannot sign in: ' + result?.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            // 에러 처리 로직을 여기에 작성할 수 있습니다.
        }
    };

    const handleLogout = () => {
        signOut({ redirect: false });
        dispatch(logout());
    };

    return { handleLogin, handleLogout };
};

export default useAuth;
