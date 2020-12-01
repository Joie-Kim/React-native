import React, {useContext, useLayoutEffect, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StackNavigationProp} from '@react-navigation/stack';
import Styled from 'styled-components/native';

import {UserContext} from '~/Context/User';

import BitCatalogList from './BigCatalogList';
import SubCatalogList from './SubCatalogList';

const Container = Styled.ScrollView`
    flex: 1;
    background-color: #141414;
`;

const StyleButton = Styled.TouchableOpacity`
    padding: 8px;
`;
const Icon = Styled.Image`
`;

type NavigationProp = StackNavigationProp<MovieNaviParamList, 'MovieHome'>;
interface Props {
    navigation: NavigationProp;
}

const MovieHome = ({navigation}: Props) => {
    const {logout} = useContext<IUserContext>(UserContext);

    // 내비게이션 헤더의 오른쪽 로그아웃 버튼을 누르면 로그아웃 되도록 구성
    // useLayoutEffect 리액트 훅을 활용
    // 이 훅에서 navigation.setOptions를 활용하여 내비게이션 헤더의 로그아웃 버튼을 표시
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <StyleButton
                    onPress={() => {
                        logout();
                    }}>
                    <Icon source={require('~/Assets/Images/ic_logout.png')} />
                </StyleButton>
            ),
        }); // 동적으로 내비게이션의 options를 수정하고자 할 때, Props인 navigation의 seOprions를 활용
    }, []);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Container>
            <BitCatalogList
                url="https://yts.lt/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5"
                onPress={(id: number) => {
                    navigation.navigate('MovieDetail', {id,}); // 내비게이션을 사용하여 화면을 이동하기 위해서 navigation.navigate() 함수를 사용
                }}
            />
            <SubCatalogList
                title="최신 등록순"
                url="https://yts.lt/api/v2/list_movies.json?sort_by=date_added&order_by=desc&limit=10"
                onPress={(id: number) => {
                    navigation.navigate('MovieDetail', {id, });
                }}
            />
            <SubCatalogList
                title="평점순"
                url="https://yts.lt/api/v2/list_movies.json?sort_by=rating&order_by=desc&limit=10"
                onPress={(id: number) => {
                    navigation.navigate('MovieDetail', {id, });
                }}
            />
            <SubCatalogList
                title="다운로드순"
                url="https://yts.lt/api/v2/list_movies.json?sort_by=download_count&order_by=desc&limit=10"
                onPress={(id: number) => {
                    navigation.navigate('MovieDetail', {id, });
                }}
            />
        </Container>
    );
};

export default MovieHome;