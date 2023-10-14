"use client";
import { ThemeProvider } from "@/src/context/theme";
import "./global.css";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
