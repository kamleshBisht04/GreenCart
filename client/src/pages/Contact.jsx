import { FaGlobe, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
const Contact = () => {
  return (
    <>
      <section className="bg-white mt-24 px-4 py-10 ">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-3 md:gap-12">
          {/* Left Side */}
          <div className="mt-10 flex flex-col md:col-span-2">
            <p className="mb-2 text-sm font-bold text-black uppercase max-md:text-center">
              Get In Touch
            </p>

            <h1 className="mb-4 max-w-md text-5xl/14 font-bold text-emerald-500 max-md:text-center md:max-w-lg">
              Fresh. Fast. Reliable groceries at your doorstep.
            </h1>

            <p className="max-w-md text-base/5.5 text-zinc-400 max-md:text-center md:max-w-lg">
              Fresh groceries delivered to your doorstep, making everyday
              shopping simple, fast, and reliable.
            </p>

            {/* Icons */}
            <div className="text-primary mt-7 flex cursor-pointer items-center gap-4 text-xl max-md:justify-center">
              {/* Globe */}
              <FaGlobe />
              {/* LinkedIn */}
              <FaLinkedin />
              {/* Twitter */}
              <FaTwitter />
              {/* YouTube */}
              <FaYoutube />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-sm rounded-2xl border border-zinc-300 p-8 md:col-span-1">
            <h2 className="mb-5.5 text-base font-medium text-zinc-800">
              Send Message
            </h2>

            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <label className="text-xs text-zinc-400">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="focus:border-primary rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 transition-colors outline-none"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs text-zinc-400">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="focus:border-primary rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 transition-colors outline-none"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs text-zinc-400">Message</label>
                <textarea
                  rows="4"
                  placeholder="Your message.."
                  className="focus:border-primary resize-none rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 transition-colors outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary-dull mt-1 cursor-pointer rounded-lg py-3 text-base text-white transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
