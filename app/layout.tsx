import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ThemeProvider from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Invoice Management",
  description: "Manage your invoices efficiently",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      <body>
        <ThemeProvider>
          <AppShell>
            <Sidebar />
            {children}
            <div id="portal" />
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}