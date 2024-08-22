import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import Header from "./components/shared/Header";
import ErrorBoundary from "./error";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Search your favorite disney movies!",
  title: "Disney Movies",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme
          accentColor="blue"
          appearance="light"
          grayColor="sand"
          radius="medium"
        >
          <Header />
          <main className="main">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
