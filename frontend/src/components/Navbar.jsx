import useTheme from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow">
      <h1 className="text-xl font-bold">Student Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full border dark:border-white border-black"
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
};

export default Navbar;
