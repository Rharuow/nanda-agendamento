"use client";
import { ThemeProvider } from "@/src/context/theme";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <style jsx global>
        {`
          body {
            background: rgb(100, 116, 139);
          }
        `}
      </style>
      {children}
    </ThemeProvider>
  );
}
