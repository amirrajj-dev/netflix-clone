import { useEffect, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Link } from 'react-router-dom';
import useAuth from "../../store/useAuth";
import {useNavigate} from 'react-router-dom'

const SignUpPage = () => {
  const {signup , isSigningUp} = useAuth()
  const navigate = useNavigate()
    
  const {searchParams} = new URL(document.location)
  const email = searchParams.get("email")
  
  const [formState, setFormState] = useState({
    username: "",
    email : email || "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formState)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-hero bg-no-repeat bg-cover bg-center">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="username">Username</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-gray-400" />
              <input
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
                value={formState.username}
                onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                type="text"
                id="username"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400" />
              <input
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-400" />
              <input
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
                value={formState.password}
                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                type={`${isShowPassword ? "text" : "password"}`}
                id="password"
                placeholder="Enter your password"
              />
              {isShowPassword ? (
                <EyeOff
                  className="absolute top-3 right-3 text-gray-700 cursor-pointer"
                  onClick={() => setIsShowPassword(false)}
                />
              ) : (
                <Eye
                  className="absolute top-3 right-3 text-gray-700 cursor-pointer"
                  onClick={() => setIsShowPassword(true)}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-semibold"
          >
            {isSigningUp ? "Signing Up ..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;