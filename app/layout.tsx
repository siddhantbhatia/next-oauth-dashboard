import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@lib/redux/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OAuth Dashboard",
  description: "Dashboard to view user data",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider session={session}>{children}</StoreProvider>
      </body>
    </html>
  );
}
