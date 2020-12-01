import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; // Stack Navigation 사용

import {UserContext} from '~/Context/User';

import Loading from '~/Screens/Loading';

import Login from '~/Screens/Login';
import MovieHome from '~/Screens/MovieHome';
import MovieDetail from '~/Screens/MovieDetail';

// Stack Navigation을 사용하기 위해 사용
const Stack = createStackNavigator();

// 로그인 판단
// 로그인 하지 않은 경우, 로그인 내비게이션
// 로그인을 한 경우, 메인 내비게이션

const LoginNavigator = () => { // 회원가입을 추가할 수 있기 때문에 확장성 고려해 StackNavigation으로 구현
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'MOVIEAPP',
                    headerTransparent: true,
                    headerTintColor: '#E70915',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
};

// 영화 리스트 화면에서 영화를 선택하면 영화의 상세 페이지를 보여주기 위해 Stack Navigation 사용
// 영화 리스트 화면 위에 상세 페이지 화면을 쌓아서(Stack) 표시
const MovieNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MovieHome"
                component={MovieHome}
                options={{
                    title: 'MOVIEAPP',
                    headerTintColor: '#E70915',
                    headerStyle: {
                        backgroundColor: '#141414',
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="MovieDetail"
                component={MovieDetail}
                options={{
                    title: 'MOVIEAPP',
                    headerTintColor: '#E70915',
                    headerStyle: {
                        backgroundColor: '#141414',
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆에 제목이 뜨지 않도록 숨김
                }}
            />
        </Stack.Navigator>
    );
};

// NavigationContainer는 내비게이션을 다루기 위한 State, 링크 등을 관리
// 따라서 내비게이션을 사용할 경우, 항상 마지막은 NavigationContainer로 내비게이션을 감싸서 제공해야 함
export default () => {
    // 로그인, 로그아웃, 로그인 여부 확인을 위해 Context API 사용
    const {isLoading, userInfo} = useContext<IUserContext>(UserContext);

    console.log(isLoading);
    console.log(userInfo);
    if (isLoading === false) { // 로그인 여부를 확인하는 동안에는 Loading 화면을 표시
        return <Loading />;
    }
    return ( // 로그인 했다면 MovieNavigator, 아니면 LoginNavigator
        <NavigationContainer>
            {userInfo ? <MovieNavigator /> : <LoginNavigator />}
        </NavigationContainer>
    );
};