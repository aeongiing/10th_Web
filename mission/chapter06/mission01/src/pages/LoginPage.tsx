import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginSchema } from '../types/auth';
import type { LoginFormData } from '../types/auth';
import { useAuth } from '../contexts/AuthContext';
import { signin } from '../apis/authApi';

const VinylDisk = () => (
  <div className="relative size-48" style={{ animation: 'spin 14s linear infinite' }}>
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-2xl" />
    <div className="absolute inset-0 rounded-full border border-zinc-600/30" />
    <div className="absolute inset-4 rounded-full border border-zinc-700/40" />
    <div className="absolute inset-8 rounded-full border border-zinc-700/40" />
    <div className="absolute inset-12 rounded-full border border-zinc-700/30" />
    <div className="absolute inset-16 rounded-full border border-zinc-700/20" />
    <div className="absolute inset-20 rounded-full bg-gradient-to-br from-rose-600 to-pink-700 shadow-lg" />
    <div className="absolute rounded-full bg-zinc-950" style={{ inset: '92px' }} />
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = (location.state as { from?: string })?.from ?? '/';
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      const res = await signin(data);
      await login(res.accessToken, res.refreshToken);
      navigate(from, { replace: true });
    } catch {
      setServerError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-zinc-900" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <VinylDisk />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">돌려돌려LP판</h2>
            <p className="mt-2 text-zinc-500 text-sm">당신의 음악을 기록하세요</p>
          </div>
          <div className="flex gap-1.5 items-center">
            {[40, 60, 80, 60, 40].map((w, i) => (
              <div key={i} className="h-px bg-zinc-700/60" style={{ width: w }} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← 뒤로가기
          </button>

          <h1 className="mb-1 text-2xl font-bold text-white">로그인</h1>
          <p className="mb-8 text-sm text-zinc-500">계정에 로그인해 주세요.</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                {...register('email')}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">비밀번호</label>
              <input
                type="password"
                placeholder="6자 이상 입력해 주세요"
                {...register('password')}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-center text-xs text-red-400">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40 mt-2"
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>

            <p className="text-center text-sm text-zinc-500">
              계정이 없으신가요?{' '}
              <Link to="/signup" className="text-rose-400 hover:text-rose-300 transition-colors">
                회원가입
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
