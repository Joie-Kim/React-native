import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';

import Loading from '~/Screens/Loading';
import BigCatalog from '~/Components/BigCatalog';
import CastList from './CastList';
import ScreenShotList from './ScreenShotList';

const Container = Styled.ScrollView`
    flex: 1;
    background-color: #141414;
`;
const ContainerTitle = Styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    font-weight: bold;
    padding: 24px 16px 8px 16px;
`;
const DescriptionContainer = Styled.View``;
const Description = Styled.Text`
    padding: 0 16px;
    color: #FFFFFF;
`;
const SubInfoContainer = Styled.View``;
const InfoContainer = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;
`;
const LabelInfo = Styled.Text`
    color: #FFFFFF;
`;

// 영화 리스트 컴포넌트에서 영화를 선택하면 영화 아이디(id)를 내비게이션의 매개변수로 설정하여 영화의 상세 화면으로 이동하도록 함
// 내비게이션으로 화면을 이동할 때, 매개변수를 전달할 수 있으며
// 매개변수를 사용하기 위해 route.params를 사용해야 함

type ProfileScreenRouteProp = RouteProp<MovieNaviParamList, 'MovieDetail'>;

interface Props {
    route: ProfileScreenRouteProp;
}

const MovieDetail = ({route}: Props) => {
    const [data, setData] = useState<IMovieDetail>();

    useEffect(() => {
        const {id} = route.params; // 매개변수로 받은 영화 아이디(id)를 API url에 사용
        fetch(
            `https://yts.lt/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`,
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setData(json.data.movie);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return data ? (
        <Container>
            <BigCatalog
                id={data.id}
                image={data.large_cover_image}
                year={data.year}
                title={data.title}
                genres={data.genres}
            />
            <SubInfoContainer>
                <ContainerTitle>영화 정보</ContainerTitle>
                <InfoContainer>
                    <LabelInfo>{data.runtime}분</LabelInfo>
                    <LabelInfo>평점: {data.rating}</LabelInfo>
                    <LabelInfo>좋아요: {data.like_count}</LabelInfo>
                </InfoContainer>
            </SubInfoContainer>
            <DescriptionContainer>
                <ContainerTitle>줄거리</ContainerTitle>
                <Description>{data.description_full}</Description>
            </DescriptionContainer>
            {data.cast && <CastList cast={data.cast} />}
            <ScreenShotList
                images={[
                    data.large_screenshot_image1,
                    data.large_screenshot_image2,
                    data.large_screenshot_image3,
                ]}
            />
        </Container>
    ) : (
        <Loading />
    );
};

export default MovieDetail;