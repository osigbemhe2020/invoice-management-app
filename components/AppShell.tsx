"use client";
import styled from 'styled-components';
import { useTheme } from '@/lib/context/ThemeContext';
import  device  from '@/lib/constants/breakpoints';
import colors from '@/lib/constants/colors';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  return (
    <AppContainer $isDark={isDark}>
      {children}
    </AppContainer>
  );
}

const AppContainer = styled.div<{ $isDark: boolean }>`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: ${p => p.$isDark ? colors.darkNavy : colors.lightBG};
  transition: background-color 0.3s ease;

  @media (${device.tablet}) {
    flex-direction: column;  /* ✅ stack sidebar on top of content */
  }
`;