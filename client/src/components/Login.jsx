import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setShowUserLogIn, setUser, axios, navigate } = useAppContext();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate('/');
        setUser(data.user);
        setShowUserLogIn(false);
        toast.success('Login successful');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => {
        navigate('/');
        setShowUserLogIn(false);
      }} //  overlay click
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()} //  prevent close on form click
        className="relative m-auto flex w-80 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 py-10 shadow-xl sm:w-[360px]"
      >
        {/*  CLOSE BUTTON  */}
        <button
          type="button"
          onClick={() => {
            setShowUserLogIn(false);
            navigate('/');
          }}
          className="text-primary hover:text-primary-dull absolute top-3 right-3 text-xl transition-transform duration-500 hover:rotate-180"
        >
          ×
        </button>

        <p className="text-center text-2xl font-semibold">
          <span className="text-primary">User</span>{' '}
          {state === 'login' ? 'Login' : 'Sign Up'}
        </p>

        {state === 'register' && (
          <div>
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border p-2"
              type="text"
              required
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border p-2"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border p-2"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {state === 'register' ? (
          <p>
            Already have account?{' '}
            <span
              onClick={() => setState('login')}
              className="text-primary cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Create account?{' '}
            <span
              onClick={() => setState('register')}
              className="text-primary cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}

        <button className="bg-primary mt-2 w-full rounded py-2 text-white">
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
