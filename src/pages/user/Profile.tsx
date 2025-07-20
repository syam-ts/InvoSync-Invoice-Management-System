import { useSelector } from "react-redux";  
import { Edit, Languages, Mail, MapPin, Phone, User as UserIcon } from "lucide-react";
import type { IUser } from "../../helper/interfaces/IUser";
import { Link } from "react-router-dom";

const Profile = () => {
  const user: IUser = useSelector((state: any) => state.currentUser);

  return (
    <div className="flex justify-center items-center text-center pt-20 pb-10 from-gray-900 via-slate-800 to-gray-900">
      <div className="w-full max-w-4xl bg-white/10 h-[50rem] shadow-2xl rounded-2xl p-10 border border-gray-700 from-gray-900 via-slate-800 to-gray-900 text-white">
        <div className="flex flex-col items-center mb-10">
          <p
            
            className="w-24 h-24 rounded-full border border-white shadow-md mb-4 text-6xl text-center py-2.5 font-extrabold"
          >{user.fullName[0]}</p>
          <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <ProfileField icon={UserIcon} label="Full Name" value={user.fullName} />
          <ProfileField icon={Mail} label="Email" value={user.email} />
          <ProfileField icon={Phone} label="Phone" value={user.mobile.toString()} />
          <ProfileField icon={MapPin} label="Country" value={user.country} />
          <ProfileField icon={MapPin} label="State" value={user.state} />
          <ProfileField icon={UserIcon} label="Gender" value={user.gender} />
          <ProfileField icon={Languages} label="Language" value={user.language} />
          <Link to='/profile-edit' className="underline">
          <ProfileField icon={Edit} label="" value='Edit Here' />
          </Link>
        </div> 
      </div>
    </div>
  );
};

interface ProfileFieldProps {
  icon: React.ElementType;
  label: string;
  value?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center bg-white/5 p-4 rounded-xl border border-white/9">
    <Icon className="text-white w-5 h-5 mr-4" />
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-base font-medium text-white">{value || "-"}</p>
    </div>
  </div>
);

export default Profile;
