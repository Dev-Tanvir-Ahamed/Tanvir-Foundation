import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

type NavbarItem = {
  key: string;
  label: JSX.Element;
};

type NavbarBaseProps = {
  items: NavbarItem[];
  backgroundColor: string;
  textColor: string;
};

const ReusableNavbar = ({
  items,
  backgroundColor,
  textColor,
}: NavbarBaseProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-10 ${backgroundColor}`}>
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`text-3xl md:hidden ${textColor}`}
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* Full Menu for large screens */}
        <nav className="hidden md:flex space-x-8 m-w-7xl mx-auto">
          {items.map((item) => (
            <div key={item.key} className={textColor}>
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu (Sliding from the left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${backgroundColor} z-20 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <nav className="p-4 space-y-4">
          {items.map((item) => (
            <div key={item.key} className={textColor}>
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default ReusableNavbar;
