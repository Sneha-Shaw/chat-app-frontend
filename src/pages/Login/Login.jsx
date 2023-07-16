import React, { useEffect, useState } from "react";
import { login } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import AlertComponent from "../../components/AlertComponent/AlertComponent";
import { routeChange } from "../../utils/routeChange";

const Login = () => {
  const {
    loading,
    error: signInError,
  } = useSelector((state) => state.user);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      setMessage("Please fill all the fields");
    } else {
      setError("");
      setMessage(null);
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (userInfo) {
      routeChange("/chat");
    }
  }, [userInfo]);

  useEffect(() => {
    if (signInError) {
      setMessage(signInError.message);
      setError(true);
    }
  }, [signInError]);

  return (
    <div className="w-screen h-screen bg-slate-400 ">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-96 bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                {loading ? (
                  <CircularProgress
                    size={20}
                    color="inherit"
                    style={{ marginRight: "10px" }}
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>
            {/* new here reister */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <Link
                to="/register"
                className="text-xs text-gray-500 uppercase hover:underline"
              >
                or sign up
              </Link>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
          </form>
          {error && (
            <AlertComponent
              type="Error"
              message={message}
              onClose={() => setError(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
