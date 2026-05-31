"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";

import { Moon, Sun } from "@gravity-ui/icons";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const icons = {
    darkMode: {
      off: Moon,
      on: Sun,
      selectedControlClass: "",
    },
  };
  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <div>
      {Object.entries(icons).map(([key, value]) => (
        <Switch key={key} size="lg" isSelected={isDark}>
          {({ isSelected }) => (
            <>
              <Switch.Control
                onClick={toggleTheme}
                className={`cursor-pointer ${isSelected ? value.selectedControlClass : ""}`}
              >
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <value.on className="size-3 text-inherit opacity-100" />
                    ) : (
                      <value.off className="size-3 text-inherit opacity-70" />
                    )}
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </>
          )}
        </Switch>
      ))}
    </div>
  );
}
