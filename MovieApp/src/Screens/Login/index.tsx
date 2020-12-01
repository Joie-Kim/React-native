import React, {useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import {Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {StackNavigationProp} from '@react-navigation/stack';

import {UserContext} from '~/Context/User';

import Input from '~/Components/Input';
import Button from '~/Components/Button';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: #141414;
    align-items: center;
    justify-content: center;
`;
const FormContainer = Styled.View`
    width: 100%;
    padding: 40px;
`;

const PasswordReset = Styled.Text`
    width: 100%;
    font-size: 12px;
    color: #FFFFFF;
    text-align: center;
`;

// 로그인 네비게이션을 활용하여 화면 이동을 구현하기 위해서는 navigator라는 Props를 활용해야 함
// navigator는 특정 화면으로 이동하거나, 이전 화면으로 돌아가기 위해 navigator.navigate(), navigator.goBack() 등을 제공
// 이를 활용하기 위해 타입 정의가 필요함

// LoginNaviParamList는 전역에서 사용되는 타입
type NavigationProp = StackNavigationProp<LoginNaviParamList, 'Login'>;

interface Props {
    navigation: NavigationProp;
}

// 확장성을 위해 Stack Navigation을 활용하여 로그인 네비게이션을 구현
const Login = ({navigation}: Props) => {
    // UserContext를 활용하여 사용자가 로그인 버튼을 눌렀을 경우,
    // Login 함수를 사용하여 로그인 할 수 있도록 함
    const {login} = useContext<IUserContext>(UserContext);

    // Login 컴포넌트가 화면에 표시된 이후, 스플래시 이미지를 닫음
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Container>
            <FormContainer>
                <Input style={{marginBottom: 16}} placeholder="email" />
                <Input
                    style = {{marginBottom: 16}}
                    placeholder="password"
                    secureTextEntry={true}
                />
                <Button
                    style={{marginBottom: 24}}
                    label="login"
                    onPress={() => {
                        login('joie.huiju@gmail.com', 'password');
                    }}
                />
                <PasswordReset // 비밀번호 재설정 기능이 있는 웹 사이트로 유도하기 위해 Linking 컴포넌트를 사용
                    onPress={() => {
                        Linking.openURL('https://joie-kim.github.io');
                    }}>
                    비밀번호 재설정
                    </PasswordReset>
            </FormContainer>
        </Container>
    );
};

export default Login;