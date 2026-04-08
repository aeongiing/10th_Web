import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  signupEmailSchema,
  signupPasswordSchema,
  signupNameSchema,
} from '../types/auth';
import type {
  SignupEmailFormData,
  SignupPasswordFormData,
  SignupNameFormData,
} from '../types/auth';
import { signup, signin } from '../apis/authApi';
import useLocalStorage from '../hooks/useLocalStorage';

type Step = 1 | 2 | 3;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { setValue: setToken } = useLocalStorage<string>('accessToken', '');

  const emailForm = useForm<SignupEmailFormData>({
    resolver: zodResolver(signupEmailSchema),
    mode: 'onChange',
  });

  const passwordForm = useForm<SignupPasswordFormData>({
    resolver: zodResolver(signupPasswordSchema),
    mode: 'onChange',
  });

  const nameForm = useForm<SignupNameFormData>({
    resolver: zodResolver(signupNameSchema),
    mode: 'onChange',
  });

  const onEmailNext = (data: SignupEmailFormData) => {
    setEmail(data.email);
    setStep(2);
  };

  const onPasswordNext = (data: SignupPasswordFormData) => {
    setPassword(data.password);
    setStep(3);
  };

  const onSubmit = async (data: SignupNameFormData) => {
    setServerError(null);
    try {
      await signup({ email, password, name: data.name });
      const res = await signin({ email, password });
      setToken(res.accessToken);
      navigate('/');
    } catch {
      setServerError('회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.');
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950">
      <div className="hidden w-1/2 flex-col items-center justify-center bg-indigo-950 lg:flex">
        <div className="text-center">
          <div className="mb-4 text-6xl">🎬</div>
          <h2 className="text-3xl font-bold text-white">MovieApp</h2>
          <p className="mt-2 text-indigo-300">지금 바로 시작해보세요</p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <button
            onClick={() => (step === 1 ? navigate(-1) : setStep((s) => (s - 1) as Step))}
            className="mb-8 flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            ← 뒤로가기
          </button>

          <div className="mb-2 flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-indigo-500' : 'bg-white/10'}`}
              />
            ))}
          </div>
          <p className="mb-6 text-xs text-white/30">{step} / 3 단계</p>

          {step === 1 && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-white">이메일 입력</h1>
              <p className="mb-8 text-sm text-white/40">가입에 사용할 이메일을 입력해주세요.</p>
              <form onSubmit={emailForm.handleSubmit(onEmailNext)} noValidate className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/60">이메일</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    {...emailForm.register('email')}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  {emailForm.formState.errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!emailForm.formState.isValid}
                  className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  다음
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-white">비밀번호 설정</h1>
              <p className="mb-1 text-sm text-white/40">비밀번호를 설정해주세요.</p>
              <p className="mb-8 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white/60">{email}</p>
              <form onSubmit={passwordForm.handleSubmit(onPasswordNext)} noValidate className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/60">비밀번호</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="6자 이상 입력해 주세요"
                      {...passwordForm.register('password')}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {passwordForm.formState.errors.password && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/60">비밀번호 확인</label>
                  <div className="relative">
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력해 주세요"
                      {...passwordForm.register('passwordConfirm')}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                    >
                      {showPasswordConfirm ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {passwordForm.formState.errors.passwordConfirm && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {passwordForm.formState.errors.passwordConfirm.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!passwordForm.formState.isValid}
                  className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  다음
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-white">닉네임 설정</h1>
              <p className="mb-8 text-sm text-white/40">사용할 닉네임을 입력해주세요.</p>
              <form onSubmit={nameForm.handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-900 text-4xl">
                    👤
                  </div>
                  <p className="text-xs text-white/30">프로필 이미지 (선택)</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/60">닉네임</label>
                  <input
                    type="text"
                    placeholder="닉네임을 입력해 주세요"
                    {...nameForm.register('name')}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  {nameForm.formState.errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {nameForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                {serverError && (
                  <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-center text-xs text-red-400">
                    {serverError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!nameForm.formState.isValid || nameForm.formState.isSubmitting}
                  className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {nameForm.formState.isSubmitting ? '가입 중...' : '회원가입 완료'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
