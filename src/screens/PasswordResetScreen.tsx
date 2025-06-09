import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {H, Input} from '@/component/theme';
import Button from '@/component/button/Button';
import {z} from 'zod';
import {resetPassword} from '@/services/user';
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요'),
    newPassword: z.string().min(4, '비밀번호는 4자 이상이어야 합니다').max(16, '비밀번호는 16자 이하여야 합니다'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

const PasswordResetScreen = () => {
  const [password, setPasswrod] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    try {
      passwordSchema.parse(password);
      const {success, code, message} = await resetPassword({currentPassword: password.currentPassword, newPassword: password.newPassword});
      console.log('asdf', success, code, message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="현재 비밀번호"
        value={password.currentPassword}
        onChangeText={(text) => {
          setPasswrod({...password, currentPassword: text});
          setErrors({...errors, currentPassword: ''});
        }}
        secureTextEntry
      />
      {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
      <H h={14} />
      <Input
        placeholder="새 비밀번호"
        value={password.newPassword}
        onChangeText={(text) => {
          setPasswrod({...password, newPassword: text});
          setErrors({...errors, newPassword: ''});
        }}
        secureTextEntry
      />
      {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
      <H h={14} />
      <Input
        placeholder="새 비밀번호 확인"
        value={password.confirmPassword}
        onChangeText={(text) => {
          setPasswrod({...password, confirmPassword: text});
          setErrors({...errors, confirmPassword: ''});
        }}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      <H h={80} />
      <Button label="비밀번호 변경하기" onPress={handleSubmit} />
    </View>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 35, paddingVertical: 25},
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
