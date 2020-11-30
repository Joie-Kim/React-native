import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service'; // 위치 정보를 사용하기 위한 라이브러리

import Styled from 'styled-components/native';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: #EEE;
`;

// 단순히 View 컴포넌트를 사용하지 않고, FlatList 사용
// FlatList의 당겨서 갱신하기(Pull to refresh) 기능을 사용하기 위해서
const WeatherContainer = Styled(FlatList)``;

const LoadingView = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Loading = Styled.ActivityIndicator`
    margin-bottom: 16px;
`;
const LoadingLabel = Styled.Text`
    font-size: 16px;
`;

const WeatherItemContainer = Styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Weather = Styled.Text`
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
`;
const Temperature = Styled.Text`
    font-size: 16px;
`;

interface Props {}

const API_KEY = '43ea79c81845dfc04efa811d2c3a59dc';

// WeatherView 컴포넌트에서 사용할 정보를 타입스크립트를 사용하여 정의
interface IWeather {
    temperature?: number;
    weather?: string;
    isLoading: boolean;
}
// 위에서 정의한 타입을 useState에서 사용하여 컴포넌트에서 갱신할 수 있도록 State 생성
const WeatherView = ({ }: Props) => {
    const [weatherInfo, setWeatherInfo] = useState<IWeather>({
        temperature: undefined,
        weather: undefined,
        isLoading: false,
    });

    // 위치 정보를 습득하여 해당 위치의 날씨 정보를 가져오는 함수
    const getCurrentWeather = () => {
        setWeatherInfo({
            isLoading: false,
        });
        Geolocation.getCurrentPosition( // 현재 위치의 위도와 경도를 가져옴
            position => {
                const { latitude, longitude } = position.coords;
                fetch( // 가져온 위치 정보와 Fetch API를 사용하여 OpenWeather API 호출
                    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
                ) // Fetch API는 Promise 함수이므로, then과 catch를 사용하여 정상 처리와 에러 처리를 할 수 있음
                .then(response => response.json())
                .then(json => { // API를 통해 가져온 JSON 데이터에서 필요한 데이터를 setWeatherInfo를 통해 State에 설정
                    setWeatherInfo({
                        temperature: json.main.temp,
                        weather: json.weather[0].main,
                        isLoading: true,
                    });
                })
                .catch(error => {
                    setWeatherInfo({
                        isLoading: true,
                    });
                    showError('날씨 정보를 가져오는 데 실패했습니다.');
                });
            },
            error => { // 위치 정보 습득 실패
                setWeatherInfo({
                    isLoading: true,
                });
                showError('위치 정보를 가져오는 데 실패했습니다.');
            }
        );
    };

    const showError = (message: string): void => {
        setTimeout(() => { // setTimeout()을 사용한 이유: Alert.alert에 의해 화면이 갱신되지 않는 문제를 해결하기 위해 비동기 처리
            Alert.alert(message);
        }, 500);
    };

    useEffect(() => { // WeatherView 컴포넌트가 화면에 표시된 후, 날씨 데이터를 가져오도록 설정
        getCurrentWeather();
    }, []); // Props, State가 변경되어 화면이 업데이트될 때에는 호출되지 않도록 두 번째 매개변수에 빈 문자열 사용

    let data = [];
    const { isLoading, weather, temperature } = weatherInfo;
    if (weather && temperature) {
        data.push(weatherInfo);
    }

    return (
        <Container>
            <WeatherContainer
                onRefresh={() => getCurrentWeather()} // 당겨서 갱신할 때, 호출할 함수 정의
                refreshing={!isLoading} // 당겨서 갱신하기 기능을 사용하여 데이터를 갱신 중인지, 끝났는지 알려주기 위한 Boolean 값 설정
                data={data}
                keyExtractor={(item, index) => {
                    return `Weather-${index}`;
                }}
                ListEmptyComponent={
                    <LoadingView>
                        <Loading size="large" color="#1976D2" />
                        <LoadingLabel>Loading...</LoadingLabel>
                    </LoadingView>
                }
                renderItem={({ item, index }) => (
                    <WeatherItemContainer>
                        <Weather>{(item as IWeather).weather}</Weather>
                        <Temperature>{(item as IWeather).temperature}℃</Temperature>
                    </WeatherItemContainer>
                )}
                contentContainerStyle={{ flex: 1 }}
            />
        </Container>
    );
};

export default WeatherView;