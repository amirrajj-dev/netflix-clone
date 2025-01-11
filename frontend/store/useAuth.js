import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";
//regex
const usernameRegex = /^[a-z0-9_-]{3,15}$/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;

const useAuth = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn : false,
  isCheckingAuth: true,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const { username, email, password } = credentials;

      if (!username || !email || !password) {
        toast.error("please fill all required fields");
        return;
      }
      const isValidUsername = usernameRegex.test(username);
      const isValidEmail = emailRegex.test(email);
      const isValidPassword = passwordRegex.test(password);
      if (!isValidUsername || !isValidEmail || !isValidPassword) {
        toast.error("invalid credentials format");
        return;
      }
      const newUser = {
        username,
        email,
        password,
      };
      const res = await axios.post("/api/auth/signup", newUser);
      console.log(res);

      if (res.status === 201) {
        set({ user: res.data.data, isSigningUp: false });
        toast.success("signed up successfully");
      }
    } catch (error) {
      console.log(error);
      set({ user: null, isSigningUp: false });
    }
  },
  login: async (credentials) => {
    set({isLoggingIn : true});
    try {
        const { email, password } = credentials;
        
      if (!email || !password) {
        toast.error("please fill all required fields");
        set({isLoggingIn : false})
        return;
      }
      const isValidEmail = emailRegex.test(email);
      const isValidPassword = passwordRegex.test(password);
      if (!isValidEmail || !isValidPassword) {
        set({isLoggingIn : false})
        toast.error("invalid credentials format");
        return;
      }
      const res = await axios.post("/api/auth/login", credentials);
      if (res.status === 200){
        set({user : res.data.data , isLoggingIn : false})
        toast.success('logged in successfully')
      }
    } catch (error) {
      set({user : null , isLoggingIn : false})
        toast.error('internal server error')
    }
  },
  logout: async () => {
    try {
        await axios.post('/api/auth/logout')
        set({ user: null });
        toast.success('logged out successfully')
    } catch (error) {
        console.log(error);
    }
  },
  checkAuth: async () => {
    try {
      const res = await axios.get("/api/auth/me");
      if (res.status == 200) {
        set({ user: res.data.data, isCheckingAuth: false });
      } else {
        console.log('yes');
        
        set({ user: null, isCheckingAuth: false });
      }
    } catch (error) {
        set({isCheckingAuth : false , user:   null})
    }
  },
}));

export default useAuth;