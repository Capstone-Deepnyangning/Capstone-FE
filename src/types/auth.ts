import {z} from 'zod';

export const SignUpSchema = z.object({
  identifier: z.string().min(1, '학번/사번은 필수입니다'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  name: z.string().min(1, '이름은 필수입니다'),
  role: z.enum(['USER', 'ADMIN'], {
    errorMap: () => ({message: '올바른 역할이 아닙니다'}),
  }),
});

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export const LoginSchema = z.object({
  identifier: z.string().min(1, '학번/사번은 필수입니다'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
});

export const ApiResponseSchema = z.object({
  result: z.object({}).optional(),
  success: z.boolean(),
  code: z.number(),
  message: z.string(),
});

export type ApiResponse<T = {}> = z.infer<typeof ApiResponseSchema> & {
  result: T;
};

export type SignUpResponse = ApiResponse;

export type LoginRequest = z.infer<typeof LoginSchema>;
