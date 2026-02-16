import { Menu } from "lucide-react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar, theme, setTheme }) => {
  const { admin } = useSelector((state) => state.Auth);

  // Helper to safely get initials
  const getInitials = (name) => {
    if (!name) return "AD"; // Fallback
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Determine the name to display
  // Sometimes auth payload is the user object, sometimes it wraps it in 'user'
  const userName = admin?.name || admin?.user?.name || "Admin";

  return (
    <header className="fixed top-0 right-0 z-40 
      bg-[#020523]/80 backdrop-blur-xl border-b border-white/10 px-4 py-3
      w-full md:w-[calc(100%-91px)] md:ml-[91px]"
    >
      <div className="w-full flex items-center justify-between">

        {/* Left Side: Toggle + Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
          >
            <Menu size={26} />
          </button>

          {/* Search Bar */}
          <div className="relative w-full sm:w-[250px] md:w-[350px] lg:w-[400px]">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full bg-[#020523] backdrop-blur-md 
                text-white placeholder-gray-400
                pl-12 pr-6 py-3 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 
                focus:border-cyan-400/50 focus:bg-white/5
                transition-all duration-300 text-sm sm:text-base"
            />
            <Icon
              icon="mynaui:search"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>
        </div>

        {/* Right Side: Icons + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icon
              icon={theme === "light" ? "solar:moon-bold" : "solar:sun-bold"}
              width={24}
              height={24}
              className="text-gray-300"
            />
          </button> */}

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-white/10 transition-all relative">
            <Icon icon="clarity:notification-solid" width={24} height={24} className="text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full 
            bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-semibold text-sm
            shadow-lg shadow-cyan-500/30">
            {getInitials(userName)}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
