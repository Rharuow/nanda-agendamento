"use client";
import { ThemeProvider } from "@/src/context/theme";
import "./global.css";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme="light">
      <style jsx global>
        {`
          body {
            background: rgba(200, 200, 200);
          }
        `}
      </style>
      {children}
    </ThemeProvider>
  );
}
