import React from 'react';
import Styled from 'styled-components/native';

import WeatherView from '~/Screens/WeatherView';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

interface Props {}

const App = () => {
  return (
    <Container>
      <WeatherView />
    </Container>
  );
};

export default App;
