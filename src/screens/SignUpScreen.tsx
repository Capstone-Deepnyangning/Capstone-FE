import Button from '@/component/button/Button';
import {H, Input} from '@/component/theme';
import {useModalStore} from '@/store/useModalStore';
import {signUp} from '@/services/auth';
import {useState} from 'react';
import {KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {z} from 'zod';
import {useUserStore} from '@/store/useUserStore';
import {setAuthToken} from '@/services/axios';
import {login as loginApi} from '@/services/auth';
import {getUser} from '@/services/user';

// Zod 스키마 정의
const signUpSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요'),
    identifier: z.string().min(1, '학번을 입력해주세요.').regex(/^\d+$/, '학번은 숫자만 입력 가능합니다'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, '비밀번호는 영문과 숫자를 포함한 8글자 이상이어야 합니다.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

const SignUpScreen = ({navigation}: {navigation: any}) => {
  const {openModal, closeModal} = useModalStore();

  const {login} = useUserStore();
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [nameError, setNameError] = useState('');
  const [studentIdError, setStudentIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [touchCount, setTouchCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const validatePassword = (text: string) => {
    if (text.length < 8) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 합니다');
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(text)) {
      setPasswordError('비밀번호는 영문과 숫자를 포함해야 합니다');
    } else {
      setPasswordError('');
    }
  };

  const onPressSignUp = async () => {
    // 모든 에러 상태 초기화
    setNameError('');
    setStudentIdError('');
    setPasswordError('');
    setPasswordConfirmError('');

    try {
      // Zod 스키마로 유효성 검사
      signUpSchema.parse({
        name,
        identifier,
        password,
        passwordConfirm,
      });

      const response = await signUp({
        name,
        identifier,
        password,
        role: isAdmin ? 'ADMIN' : 'USER',
      });

      if (response.success) {
        // 사용자 정보 가져오기
        const {result} = await loginApi({identifier, password});

        // 토큰 저장 및 axios 인스턴스에 설정
        const {accessToken, refreshToken} = result;
        setAuthToken(accessToken);

        const {result: userResult, success} = await getUser();

        if (success) {
          // useUserStore에 토큰과 사용자 정보 저장
          login({
            accessToken,
            refreshToken,
            ...userResult,
          });

          openModal({
            title: '회원가입 완료',
            message: '회원가입이 완료되었습니다.',
            onConfirm: () => {
              closeModal();
              navigation.reset({
                index: 0,
                routes: [{name: isAdmin ? 'Main' : 'Camera'}],
              });
            },
          });
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const path = err.path[0];
          const message = err.message;

          switch (path) {
            case 'name':
              setNameError(message);
              break;
            case 'identifier':
              setStudentIdError(message);
              break;
            case 'password':
              setPasswordError(message);
              break;
            case 'passwordConfirm':
              setPasswordConfirmError(message);
              break;
          }
        });
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {response?: {data?: {message?: string}}};
        openModal({
          title: '회원가입 실패',
          message: axiosError.response?.data?.message || '회원가입에 실패했습니다.',
          onConfirm: () => closeModal(),
        });
      } else {
        openModal({
          title: '회원가입 실패',
          message: '회원가입에 실패했습니다.',
          onConfirm: () => closeModal(),
        });
      }
    }
  };

  //10번 이상 터치하면 관리자 가입
  const onPressEmpty = () => {
    setTouchCount(touchCount + 1);
    if (touchCount >= 10) {
      setIsAdmin(true);
    }
  };

  const onPressAdmin = () => {
    setIsAdmin(true);
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView>
        <Input placeholder="이름" value={name} onChangeText={setName} error={nameError} />
        <H h={14} />
        <Input placeholder="학번" value={identifier} onChangeText={setIdentifier} error={studentIdError} />
        <H h={14} />
        <Input
          placeholder="비밀번호"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          error={passwordError}
        />
        <H h={14} />
        <Input
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={(text) => {
            setPasswordConfirm(text);
            if (text !== password) {
              setPasswordConfirmError('비밀번호가 일치하지 않습니다');
            } else {
              setPasswordConfirmError('');
            }
          }}
          error={passwordConfirmError}
        />
        <H h={70} />
        <Button label="회원가입하기" onPress={onPressSignUp} disabled={!name || !identifier || !password || !passwordConfirm} />
        <Pressable onPress={onPressEmpty} style={styles.emptyPress} />
        {isAdmin && <Text style={styles.adminText}>관리자 가입 활성화</Text>}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 34,
    paddingTop: 24,
  },
  adminText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyPress: {
    height: 100,
  },
});
