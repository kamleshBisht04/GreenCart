const Contact = () => {
  return (
    <>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
      </style>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto flex w-full flex-col justify-center gap-12 max-md:items-center md:flex-row md:gap-16">
          {/* Left Side */}
          <div className="mt-10 flex flex-col">
            <p className="mb-2 text-sm font-medium text-primary uppercase max-md:text-center">
              Get In Touch
            </p>
            <h1 className="mb-4 max-w-2xs text-5xl/14 font-bold text-primary-dull max-md:text-center">
              Fresh. Fast. Reliable groceries at your doorstep.”
            </h1>
            <p className="max-w-2xs text-base/5.5 text-zinc-400 max-md:text-center">
              Fresh groceries delivered to your doorstep, making everyday
              shopping simple, fast, and reliable.
            </p>
            <div className="mt-7 flex cursor-pointer items-center gap-4 max-md:justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18.33a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.667"
                  stroke="#9F9FA9"
                  strokeWidth="1.667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.942 4.242C12.683 7.617 8.333 8.701 1.875 9.117m16.25 1.58c-5.517-1.175-10.117.834-13.65 5.267"
                  stroke="#9F9FA9"
                  strokeWidth="1.667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.133 2.29c3.642 5 5 7.85 6.667 14.766"
                  stroke="#9F9FA9"
                  strokeWidth="1.667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.333 6.664a5 5 0 0 1 5 5v5.833H15v-5.833a1.667 1.667 0 1 0-3.333 0v5.833H8.333v-5.833a5 5 0 0 1 5-5M5 7.5H1.667v10H5zM3.333 4.997a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333"
                  stroke="#9F9FA9"
                  strokeWidth="1.667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.333 3.335s-.583 1.75-1.666 2.833c1.333 8.333-7.834 14.417-15 9.667 1.833.083 3.666-.5 5-1.667-4.167-1.25-6.25-6.167-4.167-10C4.333 6.335 7.167 7.585 10 7.501c-.75-3.5 3.333-5.5 5.833-3.166.917 0 2.5-1 2.5-1"
                  stroke="#9F9FA9"
                  strokeWidth="1.667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 17.004a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0 2 2 0 0 1 1.4 1.4 24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0 2 2 0 0 1-1.4-1.4"
                  stroke="#9F9FA9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m10 15 5-3-5-3z"
                  stroke="#9F9FA9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-sm rounded-2xl border border-zinc-300 p-8">
            <h2 className="mb-5.5 text-base font-medium text-zinc-800">
              Send Message
            </h2>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <label className="text-xs text-zinc-400">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 transition-colors outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-xs text-zinc-400">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 transition-colors outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-xs text-zinc-400">Message</label>
                <textarea
                  placeholder="Your message.."
                  rows="4"
                  className="resize-none rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 transition-colors outline-none focus:border-primary"
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
