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
          :root {
            --body-color: rgb(30, 30, 30);
          }
          body {
            background: var(--body-color);
          }
        `}
      </style>
      {children}
    </ThemeProvider>
  );
}
