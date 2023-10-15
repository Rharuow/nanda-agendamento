"use client";
import { ThemeProvider } from "@/src/context/theme";

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
            background: rgb(150, 166, 189);
          }
        `}
      </style>
      {children}
    </ThemeProvider>
  );
}
