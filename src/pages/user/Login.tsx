
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  FileText,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/api/userServices";
import {Toaster } from "sonner";
import { toastError } from "../../utils/sonner/toastError";
import { loginValidation } from "../../Formik/loginValidation"; 

export default function LoginPage() {
 
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (email: string, password: string) => {
    try {
      const response = await UserService.loginUser(email, password);

      console.log("rep", response);
      if (!response.success) {
        toastError(response.message);
      } else {
        alert("success");
        // localStorage.setItem("token", response.token);
        // dispatch(signInUser(response.user));
        // navigate("/dashboard");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    loginValidation(submitForm);

  return (
    <div>
      <Toaster />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-slate-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl mb-4 shadow-2xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Invoice Manager
            </h1>
            <p className="text-gray-300">
              Track, manage, and organize your freelance finances
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome back
              </h2>
              <p className="text-gray-300">Sign in to access your dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                  {touched.email && errors.email && (
                                    <div className="text-red-500 text-center">
                                        {errors.email}
                                    </div>
                                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                  {touched.password && errors.password && (
                                    <div className="text-red-500 text-center">
                                        {errors.password}
                                    </div>
                                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-slate-400 text-slate-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              <button 
                className="w-full bg-gradient-to-r from-gray-600 to-slate-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none hover:from-gray-500 hover:to-slate-600"
              >
                'Sign In'
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-300 text-sm mb-4">
                What you can manage:
              </p>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-xs text-gray-300">Expenses</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-300">Invoices</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-slate-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-5 h-5 text-slate-400" />
                  </div>
                  <span className="text-xs text-gray-300">Analytics</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-white font-semibold hover:text-gray-200 transition-colors duration-200"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
