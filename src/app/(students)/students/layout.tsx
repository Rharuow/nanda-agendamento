"use client";
import { ThemeProvider } from "@/src/context/theme";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <style jsx global>
        {`
          body {
            background: rgba(30, 30, 30, 0.9);
          }
        `}
      </style>
      {children}
    </ThemeProvider>
  );
}
