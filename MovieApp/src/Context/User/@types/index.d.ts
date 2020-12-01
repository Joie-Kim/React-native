interface IUserInfo {
    name: string;
    email: string;
} // 간단하게 사용자의 이름과 이메일 주소를 갖는 서비스

interface IUserContext {
    isLoading: boolean; // 데이터를 불러왔는지 여부 확인
    userInfo: IUserInfo | undefined; // 사용자 정보가 있음
    login: (email: string, password: string) => void; // 로그인 함수
    getUserInfo: () => void; // 사용자 정보를 가져올 수 있는 함수
    logout: () => void; // 로그아웃 함수
}