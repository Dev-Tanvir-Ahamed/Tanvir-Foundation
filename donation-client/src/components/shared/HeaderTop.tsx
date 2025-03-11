import { useContext } from "react";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import { ThemeContext } from "@/utils/ThemeProvider";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Switch } from "antd";
export default function HeaderTop() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="bg-white dark:bg-dark-background dark:text-dark-text">
      <div className="max-w-7xl mx-auto py-4 px-6 border-b flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="https://facebook.com"
            className="text-[#1877F2] hover:opacity-80 transition-opacity"
          >
            <FaFacebookSquare size={24} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            to="https://youtube.com"
            className="text-[#FF0000] hover:opacity-80 transition-opacity"
          >
            <FaYoutube size={24} />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            to="mailto:contact@example.com"
            className="text-[#00A550] hover:opacity-80 transition-opacity"
          >
            <MdEmail size={24} />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            to="tel:+1234567890"
            className="text-[#00A550] hover:opacity-80 transition-opacity"
          >
            <IoCallSharp size={24} />
            <span className="sr-only">Phone</span>
          </Link>
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>
      </div>
    </header>
  );
}
