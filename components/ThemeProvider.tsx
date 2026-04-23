'use client';

import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
