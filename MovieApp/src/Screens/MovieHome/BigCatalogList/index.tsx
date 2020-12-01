import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import Styled from 'styled-components/native';

import BigCatalog from '~/Components/BigCatalog';

const Container = Styled.View`
    height: 300px;
    margin-bottom: 8px;
`;

interface Props {
    url: string;
    onPress: (id: number) => void;
}

const BigCatalogList = ({url, onPress}: Props) => {
    // 실제 영화 리스트 데이터를 저장할 State
    // IMovie 타입의 배열 데이터를저장할 수 있도록 선언
    const [data, setData] = useState<Array<IMovie>>([]);

    // BigCatalogList 컴포넌트가 화면에 표시되면
    // Fetch API를 통해 영화 리스트 데이터를 가져와서 State 값을 채움
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setData(json.data.movies);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // 가져온 영화 리스트 데이터를 FlatList를 사용하여 화면에 표시
    return (
        <Container>
            <FlatList
                horizontal={true} // 가로 스크롤 가능
                pagingEnabled={true} // 가로 스크롤을 할 때, 한 리스트 아이템이 한 화면에 보이도록 설정
                data={data}
                keyExtractor={(item, index) => {
                    return `bigScreen-${index}`;
                }}
                renderItem={({item, index}) => (
                    <BigCatalog
                        id={(item as IMovie).id}
                        image={(item as IMovie).large_cover_image}
                        year={(item as IMovie).year}
                        title={(item as IMovie).title}
                        genres={(item as IMovie).genres}
                        onPress={onPress}
                    /> // 공통 컴포넌트, 영화 리스트 아이템을 화면에 표시
                )}
            />
        </Container>
    );
};

export default BigCatalogList;