import { useState } from 'react';
import { FaGlobe, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Contact = () => {
  const { axios } = useAppContext();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  // handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error('All fields are required');
      return;
    }

    try {
      const { data } = await axios.post('/api/contact', form);

      if (data.success) {
        toast.success(data.message || 'Message sent successfully ');

        setForm({
          name: '',
          email: '',
          message: '',
        });
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <section className="mt-24 bg-white px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-3 md:gap-12">
        {/* LEFT */}
        <div className="mt-10 flex flex-col md:col-span-2">
          <p className="mb-2 text-sm font-bold text-black uppercase max-md:text-center">
            Get In Touch
          </p>

          <h1 className="mb-4 max-w-md text-5xl/14 font-bold text-emerald-500 max-md:text-center md:max-w-lg">
            Fresh. Fast. Reliable groceries at your doorstep.
          </h1>

          <p className="max-w-md text-base/5.5 text-zinc-400 max-md:text-center md:max-w-lg">
            Fresh groceries delivered to your doorstep, making everyday shopping
            simple, fast, and reliable.
          </p>

          <div className="text-primary mt-7 flex items-center gap-4 text-xl max-md:justify-center">
            <FaGlobe />
            <FaLinkedin />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full max-w-sm rounded-2xl border border-zinc-300 p-8 md:col-span-1">
          <h2 className="mb-5 text-base font-medium text-zinc-800">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="focus:border-primary rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="focus:border-primary rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none"
            />

            <textarea
              rows="4"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message.."
              className="focus:border-primary resize-none rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none"
            ></textarea>

            {/*  BUTTON */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dull mt-2 flex items-center justify-center rounded-lg py-3 text-white transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
