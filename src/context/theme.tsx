"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

export type Theme = "dark" | "light";

export type ThemeContextType = {
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({
  children,
  theme = "dark",
}: {
  children: ReactNode;
  theme?: Theme;
}) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
