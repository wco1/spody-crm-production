'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '../../utils/supabase';
import { Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email });
      const result = await signIn(email, password);
      
      if (result.success) {
        // localStorage используется в гибридном подходе и устанавливается в signIn
        router.push('/dashboard');
      } else {
        if (result.error?.message) {
          setError(result.error.message);
      } else {
        setError('Неверный email или пароль. Попробуйте снова.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Произошла ошибка при входе. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center shadow-lg">
            <Sparkles className="h-9 w-9 text-white" />
          </div>
        </div>
        <h1 className="mt-4 text-center text-3xl font-bold text-gradient">Spody Admin</h1>
        <h2 className="mt-2 text-center text-xl font-medium text-gray-700">
          Панель управления
        </h2>
        </div>
        
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-100 animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              <input
                  id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                  className="input pl-10"
                  placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                  className="input pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Запомнить меня
              </label>
            </div>

            <div className="text-sm">
                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Забыли пароль?
                </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
                className="w-full btn-primary py-2.5 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Вход...
                  </div>
              ) : (
                'Войти'
              )}
            </button>
          </div>
        </form>

          {loading && <LoadingSpinner size="sm" />}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Примечание</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-center">
              <p className="text-gray-600">Для демонстрации используйте:</p>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-800 font-medium">Email: admin@spody.app</p>
                <p className="text-gray-800 font-medium">Пароль: admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 