import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Js in any syntax in any language",
  description: "First ever Js in any syntax in any language",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
