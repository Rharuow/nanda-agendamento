import "./globals.css";
import "sweetalert2/src/sweetalert2.scss";
import "react-toastify/dist/ReactToastify.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "react-calendar/dist/Calendar.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { TanstackProvider } from "../components/providers/TanstackProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <TanstackProvider>
          <ToastContainer limit={1} theme="dark" autoClose={500} />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
