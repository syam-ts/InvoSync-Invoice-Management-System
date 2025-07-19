import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff, 
  FileText, 
  Globe,
  MapPin,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../../services/api/userServices";
import { signupValidation } from "../../Formik/signupValidation";
import { toastError } from "../../utils/sonner/toastError";
import { languages } from "../../utils/constants/languages";
import { countries } from "../../utils/constants/countries";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
  const submitForm = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    mobile: number,
    gender: string,
    country: string,
    state: string,
    language: string
  ) => {
    try {
      const response = await UserService.signupUser(
        firstName,
        lastName,
        email,
        password,
        mobile,
        gender,
        country,
        state,
        language
      );

      console.log("rep", response);
      if (!response.success) {
        toastError(response.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    signupValidation(submitForm);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-2 py-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-slate-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl mb-4 shadow-2xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Invoice Manager
          </h1>
          <p className="text-gray-300 text-sm">
            Start managing your freelance finances
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-1">
              Create Account
            </h2>
            <p className="text-gray-300 text-sm">
              Join thousands of freelancers worldwide
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="firstName"
                  className="text-xs font-medium text-white"
                >
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                    placeholder="John"
                    required
                  />
                </div>
                {touched.firstName && errors.firstName && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="lastName"
                  className="text-xs font-medium text-white"
                >
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="lastName"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                    placeholder="Doe"
                    required
                  />
                </div>
                {touched.lastName && errors.lastName && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-white">
                Mobile
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="mobile"
                  onChange={handleChange}
                  value={values.mobile}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            {touched.mobile && errors.mobile && (
              <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                  </button>
                </div>
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="gender"
                  className="text-xs font-medium text-white"
                >
                  Gender
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="gender"
                    onChange={handleChange}
                    value={values.gender}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                    required
                  >
                    <option value="" className="bg-gray-800">
                      Select
                    </option>
                    <option value="male" className="bg-gray-800">
                      Male
                    </option>
                    <option value="female" className="bg-gray-800">
                      Female
                    </option> 
                  </select>
                </div>
            {touched.gender && errors.gender && (
              <div className="text-red-500 text-sm mt-1">{errors.gender}</div>
            )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="country"
                  className="text-xs font-medium text-white"
                >
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="country"
                    onChange={handleChange}
                    value={values.country}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                    required
                  >
                    <option value="" className="bg-gray-800">
                      Country
                    </option>
                    {countries.map((country: string) => (
                      <option
                        key={country}
                        value={country}
                        className="bg-gray-800"
                      >
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              {touched.country && errors.country && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.country}
                </div>
              )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="state"
                  className="text-xs font-medium text-white"
                >
                  State
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="state"
                    onChange={handleChange}
                    value={values.state}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                    placeholder="State"
                    required
                  />
                </div>
            {touched.state && errors.state && (
              <div className="text-red-500 text-sm mt-1">{errors.state}</div>
            )}
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="language"
                className="text-xs font-medium text-white"
              >
                Language
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="language"
                  onChange={handleChange}
                  value={values.language}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm"
                  required
                >
                  <option value="" className="bg-gray-800">
                    Select language
                  </option>
                  {languages.map((language: string) => (
                    <option
                      key={language}
                      value={language}
                      className="bg-gray-800"
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {touched.language && errors.language && (
              <div className="text-red-500 text-sm mt-1">{errors.language}</div>
            )}
            <div className="flex items-start space-x-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-slate-400 text-slate-500 mt-0.5"
                required
              />
              <label htmlFor="terms" className="text-xs text-gray-300">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-white hover:text-gray-200 underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-white hover:text-gray-200 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <button className="w-full bg-gradient-to-r from-gray-600 to-slate-700 text-white py-2.5 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none hover:from-gray-500 hover:to-slate-600 mt-4">
              Create Account
            </button>
          </form>
        </div>

        <div className="text-center mt-3">
          <p className="text-gray-300 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:text-gray-200 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
