import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { SetShowUserLogIn, setUser } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, email });
    SetShowUserLogIn(false);
  };

  return (
    <div
      onClick={() => SetShowUserLogIn(false)} //  overlay click
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} //  prevent close on form click
        className="relative m-auto flex w-80 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 py-10 shadow-xl sm:w-[360px]"
      >
        {/*  CLOSE BUTTON (TOP RIGHT CORNER) */}
        <button
          type="button"
          onClick={() => SetShowUserLogIn(false)}
          className="absolute top-3 right-3 text-xl text-primary transition-transform duration-500 hover:rotate-180 hover:text-primary-dull"
        >
          ×
        </button>

        <p className="text-center text-2xl font-semibold">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
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
            required
          />
        </div>

        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Create account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}

        <button className="bg-primary mt-2 w-full rounded py-2 text-white">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
