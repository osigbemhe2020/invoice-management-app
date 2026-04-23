
"use client";
import { ThemeContextProvider } from '@/lib/context/ThemeContext';
import { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  );
}