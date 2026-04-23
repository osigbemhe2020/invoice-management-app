// layout.tsx
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import styled from "styled-components";
import ThemeProvider from "@/components/ThemeProvider";
import colors from "@/lib/constants/colors";
import device from "@/lib/constants/breakpoints";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: ${colors.lightBG};
 @media (${device.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const metadata: Metadata = {
  title: "Invoice Management",
  description: "Manage your invoices efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      <body>
        <ThemeProvider>
          <AppContainer>
            <Sidebar />
            {children}
            <div id="portal" />
          </AppContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
