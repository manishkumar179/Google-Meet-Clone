import { useDispatch } from "react-redux";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white flex items-center justify-center px-4">
      <div className="w-full border rounded-2xl max-w-md">
        <div className=" rounded-3xl shadow-2xl p-6">
          <div className="flex justify-center mb-4">
            <div className="h-10 w-20 rounded-xl bg-gradient-to-r text-black flex items-center justify-center  font-bold text-xl">
              MEET
            </div>
          </div>

          <form className="space-y-1">
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            onClick={() => {
              window.location.href = "http://localhost:8000/api/auth/google";
            }}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition"
          >
            <svg className="6-5 w-5" viewBox="0 0 50 58">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.215 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.277 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.177 0 9.862-1.977 13.409-5.192l-6.19-5.238C29.146 35.091 26.673 36 24 36c-5.194 0-9.624-3.332-11.282-7.946l-6.522 5.025C9.514 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.57l.003-.002 6.19 5.238C36.971 38.481 44 33 44 24c0-1.341-.138-2.651-.389-3.917z"
              />
            </svg>

            <span className="font-medium active:scale-96  text-gray-700">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Secure login powered by Google Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
