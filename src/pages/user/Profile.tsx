import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Users,
    Globe,
    MapPin,
    Languages,
    Edit2,
    ArrowLeft,
    Save,
    X
} from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        fullName: 'John Alexander Smith',
        email: 'john.smith@company.com',
        mobile: '9876543210',
        password: '••••••••••',
        gender: 'Male',
        country: 'United States',
        state: 'California',
        language: 'English'
    });

    const [editData, setEditData] = useState({ ...userData });
    const [isSaving, setIsSaving] = useState(false);

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
    ];

    const countries = [
        { code: 'US', name: 'United States' },
        { code: 'IN', name: 'India' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'CA', name: 'Canada' },
        { code: 'AU', name: 'Australia' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'JP', name: 'Japan' },
        { code: 'SG', name: 'Singapore' }
    ];

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ar', name: 'Arabic' }
    ];

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...userData });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({ ...userData });
    };

    const handleSave = async () => {
        setIsSaving(true);
        
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setUserData({ ...editData });
        setIsEditing(false);
        setIsSaving(false);
        
        console.log('Updated user data:', editData);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatMobile = (mobile) => {
        const digits = mobile.replace(/\D/g, '');
        if (digits.length === 10) {
            return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
        return mobile;
    };

    const ProfileField = ({ icon: Icon, label, value, field, type = "text", options = null }) => {
        if (isEditing) {
            if (options) {
                return (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-300">
                            {label}
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <Icon className="w-5 h-5 text-gray-400" />
                            </div>
                            <select
                                value={editData[field]}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all duration-300 appearance-none cursor-pointer"
                            >
                                {options.map(option => (
                                    <option key={option.code || option.value} value={option.name || option.label} className="bg-gray-800">
                                        {option.name || option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            }

            return (
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">
                        {label}
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <Icon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type={type}
                            value={editData[field]}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all duration-300"
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mt-1">
                    <Icon className="w-5 h-5 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
                    <p className="text-white text-lg font-medium break-words">
                        {field === 'mobile' ? formatMobile(value) : value}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <Link to='/dashboard'>
                            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white border border-white/10 hover:border-white/30">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
                                <p className="text-gray-400">View and manage your personal information</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 flex items-center space-x-2"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Cancel</span>
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                <span>Save Changes</span>
                                            </>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    <span>Edit Profile</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-white/20">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{userData.fullName}</h2>
                            <p className="text-gray-400">{userData.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileField
                            icon={User}
                            label="Full Name"
                            value={userData.fullName}
                            field="fullName"
                        />
                        
                        <ProfileField
                            icon={Mail}
                            label="Email Address"
                            value={userData.email}
                            field="email"
                            type="email"
                        />
                        
                        <ProfileField
                            icon={Phone}
                            label="Mobile Number"
                            value={userData.mobile}
                            field="mobile"
                            type="tel"
                        />
                        
                        <ProfileField
                            icon={Users}
                            label="Gender"
                            value={userData.gender}
                            field="gender"
                            options={genderOptions}
                        />
                        
                        <ProfileField
                            icon={Globe}
                            label="Country"
                            value={userData.country}
                            field="country"
                            options={countries}
                        />
                        
                        <ProfileField
                            icon={MapPin}
                            label="State"
                            value={userData.state}
                            field="state"
                        />
                        
                        <ProfileField
                            icon={Languages}
                            label="Language"
                            value={userData.language}
                            field="language"
                            options={languages}
                        />
                        
                        <div className="space-y-3">
                            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mt-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-400 mb-1">Account Status</p>
                                    <p className="text-green-400 text-lg font-medium">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;