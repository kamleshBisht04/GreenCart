/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

const SellerLogIn = () => {
  const { isSeller, setIsSeller, navigate, axios  } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/seller/login', {
        email,
        password,
      });

      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong',
      );
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="bg-app-gradient flex min-h-screen items-center justify-center px-4">
        <IoChevronBackCircleOutline
          className="relative h-8 w-8 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-sm rounded-2xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur-lg"
        >
          {/* Title */}
          <p className="mb-6 text-center text-2xl font-semibold text-black">
            <span className="text-primary">Seller</span> Login
          </p>

          {/* Email */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="admin@email.com"
              className="focus:border-primary focus:ring-primary mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-1"
              type="email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <p className="text-sm text-gray-600">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="off"
              placeholder="••••••••"
              className="focus:border-primary focus:ring-primary mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-1"
              type="password"
              required
            />
          </div>

          {/* Forgot */}
          <div className="mb-5 text-right">
            <span className="text-primary cursor-pointer text-sm hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button className="bg-primary hover:bg-primary-dull w-full rounded-md py-2 font-medium text-white transition-all">
            Log In
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            GreenCart Admin Panel 🌿
          </p>
        </form>
      </div>
    )
  );
};

export default SellerLogIn;
