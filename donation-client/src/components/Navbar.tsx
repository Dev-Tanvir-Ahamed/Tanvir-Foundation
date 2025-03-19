import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, Heart, Menu, Search, X } from "lucide-react";

import { useMediaQuery } from "@/hooks/mobile-nav";
import { useRotatingThemes } from "@/hooks/use-animation";
import { fadeInLeft } from "@/utils/animation-variations";
import { Link } from "react-router-dom";
import {
  AnimatedButton,
  AnimatedGradient,
  FadeInElement,
  PulsingElement,
} from "./AnimatedElement";

// Import our custom animation hooks and components

// Define our color themes
const colorThemes = [
  { primary: "#FF5757", secondary: "#FFBD59", accent: "#4CB9E7" },
  { primary: "#8E6FFF", secondary: "#5CFFB1", accent: "#FF6FD7" },
  { primary: "#FF8C42", secondary: "#4DEEEA", accent: "#B15DFF" },
];

export default function AnimatedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const currentTheme = useRotatingThemes(colorThemes);

  // Detect scroll for navbar background change
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "projects", label: "Projects", hasDropdown: true },
    { id: "impact", label: "Our Impact" },
    { id: "contact", label: "Contact" },
  ];

  const dropdownItems = [
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "environment", label: "Environment" },
    { id: "community", label: "Community" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.nav
        className={`relative px-4 md:px-6 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
        style={{
          backgroundColor: isScrolled
            ? `rgba(255, 255, 255, 0.8)`
            : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          boxShadow: isScrolled
            ? `0 4px 20px ${currentTheme.primary}20`
            : "none",
        }}
      >
        {/* Animated background gradient line */}
        <AnimatedGradient
          colors={[
            currentTheme.primary,
            currentTheme.secondary,
            currentTheme.accent,
            currentTheme.primary,
          ]}
          className="absolute bottom-0 left-0 h-[2px] w-full"
        />

        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <AnimatedButton className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <motion.div
                  className="relative h-10 w-10 rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                  }}
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <PulsingElement>
                    <Heart className="h-5 w-5 text-white" />
                  </PulsingElement>
                </motion.div>
                <motion.span
                  className="text-xl font-bold hidden sm:block"
                  animate={{ color: currentTheme.primary }}
                  transition={{ duration: 1 }}
                >
                  GiveHope
                </motion.span>
              </Link>
            </AnimatedButton>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  <motion.div
                    className="px-3 py-2 relative"
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <Link
                      to={`#${item.id}`}
                      className="flex items-center gap-1"
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <motion.div
                          animate={{
                            rotate: hoveredItem === item.id ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      )}
                    </Link>

                    {/* Active indicator */}
                    {activeItem === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: currentTheme.primary }}
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    {/* Hover indicator (only show if not active) */}
                    {hoveredItem === item.id && activeItem !== item.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: currentTheme.secondary }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>

                  {/* Dropdown for Projects */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <motion.div
                          className="absolute left-0 mt-1 w-48 rounded-md shadow-lg overflow-hidden z-20"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${currentTheme.primary}20`,
                          }}
                          onHoverStart={() => setHoveredItem(item.id)}
                          onHoverEnd={() => setHoveredItem(null)}
                        >
                          <div className="py-1">
                            {dropdownItems.map((dropdownItem, index) => (
                              <motion.div
                                key={dropdownItem.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                  duration: 0.2,
                                }}
                                whileHover={{
                                  backgroundColor: `${currentTheme.primary}10`,
                                  x: 5,
                                }}
                                className="block px-4 py-2 text-sm"
                              >
                                <Link
                                  to={`#${dropdownItem.id}`}
                                  className="flex items-center gap-2"
                                >
                                  <div
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                      backgroundColor: currentTheme.primary,
                                    }}
                                  />
                                  {dropdownItem.label}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <AnimatedButton className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="rounded-full"
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Search input */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "200px", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-full mt-2 overflow-hidden rounded-md shadow-md z-20"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${currentTheme.primary}20`,
                      }}
                    >
                      <div className="flex items-center p-2">
                        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="bg-transparent border-none outline-none flex-1 text-sm"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedButton>

              {/* Language selector */}
              <AnimatedButton className="hidden sm:block">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
                </Button>
              </AnimatedButton>

              {/* Donate button */}
              <AnimatedButton>
                <Button
                  className="rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                    boxShadow: `0 2px 10px ${currentTheme.primary}40`,
                  }}
                >
                  <PulsingElement className="mr-1">
                    <Heart className="h-4 w-4" />
                  </PulsingElement>
                  <span className="hidden sm:inline">Donate</span>
                </Button>
              </AnimatedButton>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="rounded-full"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: `1px solid ${currentTheme.primary}20`,
            }}
          >
            <div className="container mx-auto py-4 px-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                  <FadeInElement
                    key={item.id}
                    direction="left"
                    delay={index * 0.1}
                    className="relative"
                  >
                    <div
                      className={`py-2 px-3 rounded-md ${
                        activeItem === item.id ? "font-medium" : ""
                      }`}
                      style={{
                        backgroundColor:
                          activeItem === item.id
                            ? `${currentTheme.primary}15`
                            : "transparent",
                        borderLeft:
                          activeItem === item.id
                            ? `3px solid ${currentTheme.primary}`
                            : `3px solid transparent`,
                      }}
                      onClick={() => {
                        setActiveItem(item.id);
                        if (!item.hasDropdown) setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <Link to={`#${item.id}`}>{item.label}</Link>
                        {item.hasDropdown && (
                          <motion.div
                            animate={{
                              rotate: hoveredItem === item.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setHoveredItem(
                                hoveredItem === item.id ? null : item.id
                              );
                            }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Mobile dropdown */}
                    <AnimatePresence>
                      {item.hasDropdown && hoveredItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 mt-1 overflow-hidden"
                        >
                          {dropdownItems.map((dropdownItem, idx) => (
                            <motion.div
                              key={dropdownItem.id}
                              variants={fadeInLeft}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: idx * 0.05 }}
                              className="py-2 px-3"
                              onClick={() => setIsOpen(false)}
                            >
                              <Link
                                to={`#${dropdownItem.id}`}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    backgroundColor: currentTheme.primary,
                                  }}
                                />
                                {dropdownItem.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </FadeInElement>
                ))}

                {/* Mobile search */}
                <FadeInElement
                  direction="left"
                  delay={navItems.length * 0.1}
                  className="pt-2"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full py-2 pl-10 pr-4 rounded-md text-sm bg-background/50 border border-input"
                    />
                  </div>
                </FadeInElement>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
