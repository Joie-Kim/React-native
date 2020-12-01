import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    width: 100%;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 40px;
    background-color: #333333;
`;
const InputField = Styled.TextInput`
    flex: 1;
    color: #FFFFFF;
`;

interface Props {
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    secureTextEntry?: boolean;
    style?: Object;
    ClearMode?: boolean;
    onChangeText?: (text: string) => void;
}

const Input = ({
    placeholder,
    keyboardType,
    secureTextEntry,
    style,
    ClearMode,
    onChangeText,
}: Props) => {
    return (
        <Container style={style}>
            <InputField
                selectionColor="#FFFFFF" // 입력 필드에 내용을 복사하거나 붙여넣기 하기 위해 사용하는 selection의 색상
                secureTextEntry={secureTextEntry} // 비밀번호 입력과 같이 입력 내용을 숨길지 여부
                keyboardType={keyboardType ? keyboardType : 'default'} // 이메일, 숫자, 전화번호 등과 같은 키보드의 타입을 설정
                autoCapitalize="none" // 영어 입력 시 첫 문자를 대문자로 자동으로 변경할지 여부를 설정
                autoCorrect={false} // 사용자의 입력 내용의 철자가 틀렸을 경우, 자동으로 수정할지 여부를 설정
                allowFontScaling={false} // 사용자가 단말기 설정을 통해 수정한 폰트 크기를 적용할지 여부 설정
                placeholderTextColor="#FFFFFF" // 사용자의 입력 내용이 없을 때 보여줄, placeholder의 색상을 결정
                placeholder={placeholder} // 사용자의 입력 내용이 없을 때, 표시할 내용을 설정
                clearButtonMode={ClearMode ? 'while-editing' : 'never'} // 사용자의 입력 내용이 있을 때, 입력 창에 오른쪽 부분에 전체 삭제 버튼을 표시할지 여부 설정
                onChangeText={onChangeText} // 입력 창의 내용이 변경될 때 호출되는 콜백 함수
            />
        </Container>
    );
};

export default Input;