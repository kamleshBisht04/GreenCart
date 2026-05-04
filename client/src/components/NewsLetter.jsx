import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const NewsLetter = () => {
  const { axios } = useAppContext();
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      const { data } = await axios.post('/api/newsletter', {
        email,
      });

      if (data.success) {
        toast.success(data.message || 'Subscribed ');
        setEmail('');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 rounded-2xl bg-white p-6 md:flex-row md:items-center md:justify-between md:p-10">
      {/* LEFT SIDE */}
      <div className="w-full md:max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">
          Get Fresh Grocery Deals
        </h1>

        <p className="mt-2 text-sm text-gray-500 md:text-base">
          Subscribe to receive discounts on fruits, vegetables, dairy, and daily
          essentials.
        </p>

        <div className="mt-6 flex w-full items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-l-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-green-500"
          />

          <button
            onClick={handleSubscribe}
            className="flex items-center justify-center rounded-r-md bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6 md:max-w-xs">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-green-50 p-2 text-green-600">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path
                d="M12 2v3m0 12v3M4.22 4.22l2.12 2.12M15.66 15.66l2.12 2.12M2 12h3m12 0h3M4.22 17.78l2.12-2.12M15.66 6.34l2.12-2.12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Daily Fresh Offers
            </h3>
            <p className="text-xs text-gray-500">
              Get updates on fresh fruits and vegetables deals every day.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-md bg-green-50 p-2 text-green-600">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path
                d="M4 11l4 4 10-10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              No Spam Alerts
            </h3>
            <p className="text-xs text-gray-500">
              Only useful grocery deals and discount notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
