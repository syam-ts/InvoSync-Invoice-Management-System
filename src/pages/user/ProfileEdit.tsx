import { languages } from "../../utils/constants/languages";
import { countries } from "../../utils/constants/countries";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Phone,
  Users,
  Globe,
  MapPin,
  Languages,
  Save,
  ArrowLeft,
} from "lucide-react";
import { UserService } from "../../services/api/userServices";
import { toastError } from "../../utils/sonner/toastError";
import { signInUser } from "../../redux/slices/userSlice";
import { userProfileEditValidation } from "../../Formik/userProfileEditValidation";

const UserProfileEdit = () => {
  const user = useSelector((state: any) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const submitForm = async (
    fullName: string,
    mobile: number,
    gender: string,
    language: string,
    country: string,
    state: string
  ): Promise<void> => {
    try {
      const response = await UserService.updateProfile(
        fullName,
        mobile,
        gender,
        language,
        country,
        state
      );

      // console.log("response", response);
      if (!response.success) {
        toastError(response.message);
      } else {
        console.log("REPONSE USER: ", response.user);
        dispatch(signInUser(response.user));
        navigate("/profile");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    userProfileEditValidation(submitForm);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white border border-white/10 hover:border-white/30">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Edit Profile
              </h1>
              <p className="text-gray-400">Update your personal information</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-gray-600/20 to-slate-700/20 p-8 border-b border-white/20">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-slate-700 rounded-3xl flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user.fullName}
                </h2>
                <p className="text-gray-400">
                  Update your profile details below
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        name="fullName"
                        onChange={handleChange}
                        value={values.fullName}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300  `}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                  <div className="text-red-500 text-center">{errors.fullName}</div>
                )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="mobile"
                        onChange={handleChange}
                        value={values.mobile}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300  `}
                        placeholder="98765 43210"
                      />
                    </div>
                    {touched.mobile && errors.mobile && (
                  <div className="text-red-500 text-center">{errors.mobile}</div>
                )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Gender
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        name="gender"
                        onChange={handleChange}
                        value={values.gender}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none cursor-pointer  `}
                      >
                        <option value="" className="bg-gray-800">
                          Select gender
                        </option>
                        {genderOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="bg-gray-800"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {touched.gender && errors.gender && (
                  <div className="text-red-500 text-center">{errors.gender}</div>
                )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Preferred Language
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Languages className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        name="language"
                        onChange={handleChange}
                        value={values.language}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border
                                                     rounded-2xl text-white focus:outline-none focus:ring-2
                                                      focus:ring-white/30 focus:border-white/30 
                                                      transition-all duration-300 appearance-none 
                                                      cursor-pointer  `}
                      >
                        <option value="" className="bg-gray-800">
                          Select language
                        </option>
                        {languages.map((lang: string, index: number) => (
                          <option
                            key={index}
                            value={lang}
                            className="bg-gray-800"
                          >
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                    {touched.language && errors.language && (
                  <div className="text-red-500 text-center">{errors.language}</div>
                )}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Location Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Country
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Globe className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        name="country"
                        onChange={handleChange}
                        value={values.country}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none cursor-pointer `}
                      >
                        <option value="" className="bg-gray-800">
                          Select country
                        </option>
                        {countries.map((country: string, index: number) => (
                          <option
                            key={index}
                            value={country}
                            className="bg-gray-800"
                          >
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    {touched.country && errors.country && (
                  <div className="text-red-500 text-center">{errors.country}</div>
                )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      onChange={handleChange}
                      value={values.state}
                      onBlur={handleBlur}
                      className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 `}
                    placeholder="Enter your State"
                    />
                  </div>
                  {touched.state && errors.state && (
                  <div className="text-red-500 text-center">{errors.state}</div>
                )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-8 border-t border-white/20">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-500 hover:to-slate-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <>
                    <Save className="w-5 h-5" />
                    <span className="font-semibold">Save Changes</span>
                  </>
                </button>
              </div>
            </form>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 to-slate-700/5 rounded-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
