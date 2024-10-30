import { Button } from "@/components/ui/button";
import { ConfigProvider, theme } from "antd";
import React, { useState } from "react";

const useAntTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return { isDarkMode, toggleTheme };
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isDarkMode, toggleTheme } = useAntTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className={isDarkMode ? "dark" : ""}>
        <div className="w-full flex justify-end pr-5 bg-white dark:bg-dark-background">
          <Button onClick={toggleTheme} className="">
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Button>
        </div>
        {children}
      </div>
    </ConfigProvider>
  );
};

export default ThemeProvider;
