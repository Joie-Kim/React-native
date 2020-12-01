type LoginNaviParamList = {
    Login: undefined; // Login 화면을 열기 위해 필요한 파라미터가 없어서 undefined 선언
};

// MovieNavigator는 MovieHome 화면과 MovieDetail 화면을 가지고 있으며
// MovieDetail 화면은 Number 타입의 id를 파라미터로 받을 수 있도록 선언
type MovieNaviParamList = {
    MovieHome: undefined;
    MovieDetail: {
        id: number;
    };
};