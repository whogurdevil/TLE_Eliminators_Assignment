import useTheme from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="grid grid-cols-2 md:grid-cols-3  items-center p-4 bg-blue-50 dark:bg-gray-800 text-black dark:text-white shadow-2xl">
      <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
        <img src="/logo.svg" className="h-8" alt="Logo" />
        <h1 className="text-lg md:text-2xl font-semibold">
          TLE Eliminators
        </h1>
      </div>

      <div className="hidden md:flex justify-center">
        <h1 className="text-xl font-semibold text-center">
          Student Progress Management System
        </h1>
      </div>

      <div className="flex justify-end">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border dark:border-white border-black"
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
