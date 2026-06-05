import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { Theme } from "@/context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeOptions: { value: Theme; label: string; icon: any }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4 text-amber-500 transition-all duration-300" />;
      case "dark":
        return <Moon className="h-4 w-4 text-purple-400 transition-all duration-300" />;
      default:
        return <Monitor className="h-4 w-4 text-blue-400 transition-all duration-300" />;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden border-border bg-background hover:bg-accent-bg hover:text-accent hover:border-accent-border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
        aria-label="Select theme"
      >
        <span className="sr-only">Toggle theme</span>
        <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95">
          {getThemeIcon()}
        </div>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg border border-border bg-card p-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-0.5">
            {themeOptions.map(({ value, label, icon: Icon }) => {
              const isActive = theme === value;
              return (
                <button
                  key={value}
                  onClick={() => {
                    setTheme(value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs transition-colors duration-200 text-left cursor-pointer ${
                    isActive
                      ? "bg-accent-bg text-accent font-medium"
                      : "text-muted-foreground hover:bg-accent-bg hover:text-accent"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${
                    isActive 
                      ? "text-accent" 
                      : value === "light" 
                      ? "text-amber-500" 
                      : value === "dark" 
                      ? "text-purple-400" 
                      : "text-blue-400"
                  }`} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
