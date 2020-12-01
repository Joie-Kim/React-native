// createContext, useState: Context API를 사용하기 위해
// useEffect: 로그인을 한 사용자인지 여부 파악
import React, {createContext, useState, useEffect} from 'react';
// 로그인하면 서버에서 토큰 키(token key)를 받았다고 가정하고,
// 그 키를 저장하기 위해 AsyncStorage를 사용
import AsyncStorage from '@react-native-community/async-storage';

// Context API를 사용하여 전역 데이터를 관리하기 위한 기본 구조
const defaultContext: IUserContext = {
    isLoading: false, // 실제로 API를 사용하여 데이터를 불러오는 동안 시간차가 생김. 그 시간차를 알기 위한 변수
    userInfo: undefined, // 사용자 정보를 담을 변수
    login: (email: string, password: string) => {},
    getUserInfo: () => {},
    logout: () => {},
};

const UserContext = createContext(defaultContext);

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({children}: Props) => {
    // userInfo, isLoading은 컴포넌트에서 변경되는 변수
    // 따라서 useState를 사용하여 선언
    const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 실제 로그인 함수는 Fetch API를 통해 데이터를 서버에 보낸 후, 서버에서 받은 토큰 키를 AsyncStorage에 저장함
    // 그리고 사용자 정보를 useState를 사용하여 설정한 후 전역 데이터로 다룸
    // 하지만 지금은 서버가 없으므로 Fetch API 사용을 생략, 서버에서 토큰 키와 사용자 정보를 받았다고 가정하여 진행
    const login = (email: string, password: string): void => {
        AsyncStorage.setItem('token', 'save your token').then(() => {
            setUserInfo({
                name: 'Joie',
                email: 'joie.huiju@gmail.com'
            });
            setIsLoading(true);
        });
    };

    // 실제 토큰 키의 체크(Validation)는 진행하지 않고,
    // 토큰 키가 있다면 로그인을 한 상태라고 가정하고
    // 사용자 정보를 useState를 사용하여 설정함
    const getUserInfo = (): void => {
        AsyncStorage.getItem('token')
        .then((value) => {
            if (value) {
                setUserInfo({
                    name: 'Joie',
                    email: 'joie.huiju@gmail.com'
                });
            }
            setIsLoading(true);
        })
        .catch(() => {
            setUserInfo(undefined);
            setIsLoading(true);
        });
    };

    // 현재 저장하고 있는 AsyncStorage를 삭제하고
    // useState를 사용하여 사용자 정보를 초기화 함
    const logout = (): void => {
        AsyncStorage.removeItem('token');
        setUserInfo(undefined);
    };

    // 앱이 실행된 후, getUserInfo 함수를 호출하여 로그인 여부를 체크
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <UserContext.Provider
            value={{
                isLoading,
                userInfo,
                login,
                getUserInfo,
                logout,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContextProvider, UserContext};