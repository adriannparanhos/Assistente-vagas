import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuthStore } from '../features/auth/store/useAuthStore';
import { FieldError } from '../shared/ui/FieldError';

const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data);
      toast.success('Login efetuado com sucesso!');
      navigate('/');
    } catch {
      // O erro já é tratado na store e exposto no estado
    }
  }

  const labelClassName = 'block text-sm font-medium text-gray-300';
  const inputClassName =
    'mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400';

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-2xl backdrop-blur-sm">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-100">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Ou{' '}
            <Link className="font-medium text-cyan-400 hover:text-cyan-300" to="/register">
              crie uma nova conta gratuitamente
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-950/50 border border-red-900/50 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className={labelClassName}>
                E-mail
                <input
                  autoComplete="email"
                  className={inputClassName}
                  placeholder="seu-email@exemplo.com"
                  type="email"
                  {...register('email')}
                />
              </label>
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label className={labelClassName}>
                Senha
                <input
                  autoComplete="current-password"
                  className={inputClassName}
                  placeholder="••••••••"
                  type="password"
                  {...register('password')}
                />
              </label>
              <FieldError message={errors.password?.message} />
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
