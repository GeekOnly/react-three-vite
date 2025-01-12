import { FaGithub } from 'react-icons/fa';
import { HiOutlineUser, HiOutlineBookOpen, HiOutlineFolder } from 'react-icons/hi';

export default function VerticalMenu() {
  return (
    <div className="h-screen w-20 bg-black text-gray-300 flex flex-col justify-between items-center">
      {/* Logo */}
      <div className="mt-4">
        <div className="text-white font-bold text-2xl">W</div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-6">
        <MenuItem icon={HiOutlineFolder} label="Projects" />
        <MenuItem icon={HiOutlineBookOpen} label="Articles" />
        <MenuItem icon={HiOutlineUser} label="Contact" />
      </div>

      {/* Footer Icons */}
      <div className="mb-4 flex flex-col gap-4">
        <FooterIcon icon={FaGithub} />
        {/* Add more footer icons as needed */}
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <Icon className="h-6 w-6 text-gray-300 group-hover:text-cyan-400" />
      <span className="text-xs text-gray-300 group-hover:text-cyan-400">{label}</span>
    </div>
  );
}

function FooterIcon({ icon: Icon }) {
  return (
    <Icon className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
  );
}
