"use client";
import { ThemeProvider } from "@/src/context/theme";
import "./global.css";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme="light">{children}</ThemeProvider>;
}
