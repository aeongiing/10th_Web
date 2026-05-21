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
import { useAuth } from '../contexts/authContextCore';
import { signup, signin } from '../apis/authApi';

type Step = 1 | 2 | 3;

const STEPS = ['이메일', '비밀번호', '닉네임'] as const;

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
      await login(res.accessToken, res.refreshToken);
      navigate('/');
    } catch {
      setServerError('회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.');
    }
  };

  const goBack = () => {
    if (step === 1) navigate('/login');
    else setStep((s) => (s - 1) as Step);
  };

  const inputClass =
    'w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50';
  const btnClass =
    'w-full rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-zinc-900" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center space-y-5">
          <p className="text-8xl font-black text-white tracking-tighter leading-none">LP</p>
          <div className="flex justify-center gap-1.5 items-center">
            {[50, 70, 90, 70, 50].map((w, i) => (
              <div key={i} className="h-px bg-zinc-700/60" style={{ width: w }} />
            ))}
          </div>
          <p className="text-zinc-400 text-sm">함께 음악을 기록해요</p>
          <p className="text-rose-500/60 text-xs tracking-widest uppercase">Join the groove</p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <button
            onClick={goBack}
            className="mb-8 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← {step === 1 ? '로그인으로' : '이전 단계'}
          </button>

          <div className="mb-2 flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${i + 1 <= step ? 'bg-rose-500' : 'bg-zinc-800'}`}
              />
            ))}
          </div>
          <p className="mb-6 text-xs text-zinc-600">{step} / 3 단계</p>

          {step === 1 && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-white">이메일 입력</h1>
              <p className="mb-8 text-sm text-zinc-500">가입에 사용할 이메일을 입력해주세요.</p>
              <form onSubmit={emailForm.handleSubmit(onEmailNext)} noValidate className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">이메일</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    {...emailForm.register('email')}
                    className={inputClass}
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
                  className={btnClass}
                >
                  다음
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-white">비밀번호 설정</h1>
              <p className="mb-1 text-sm text-zinc-500">비밀번호를 설정해주세요.</p>
              <p className="mb-8 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-sm text-zinc-400">{email}</p>
              <form onSubmit={passwordForm.handleSubmit(onPasswordNext)} noValidate className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">비밀번호</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="6자 이상 입력해 주세요"
                      {...passwordForm.register('password')}
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors text-xs"
                    >
                      {showPassword ? '숨김' : '표시'}
                    </button>
                  </div>
                  {passwordForm.formState.errors.password && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">비밀번호 확인</label>
                  <div className="relative">
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력해 주세요"
                      {...passwordForm.register('passwordConfirm')}
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors text-xs"
                    >
                      {showPasswordConfirm ? '숨김' : '표시'}
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
                  className={btnClass}
                >
                  다음
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-white">닉네임 설정</h1>
              <p className="mb-8 text-sm text-zinc-500">사용할 닉네임을 입력해주세요.</p>
              <form onSubmit={nameForm.handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">닉네임</label>
                  <input
                    type="text"
                    placeholder="닉네임을 입력해 주세요"
                    {...nameForm.register('name')}
                    className={inputClass}
                  />
                  {nameForm.formState.errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {nameForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                {serverError && (
                  <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-center text-xs text-red-400">
                    {serverError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!nameForm.formState.isValid || nameForm.formState.isSubmitting}
                  className={btnClass}
                >
                  {nameForm.formState.isSubmitting ? '가입 중...' : '시작하기 →'}
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
