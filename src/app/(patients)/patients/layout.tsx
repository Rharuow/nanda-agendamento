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
          :root {
            --body-color: rgb(150, 166, 189);
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
