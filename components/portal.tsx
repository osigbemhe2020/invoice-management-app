"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  containerId?: string; // allow custom portal container id
}

const Portal: React.FC<PortalProps> = ({
  children,
  containerId = 'portal',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Only access document after component has mounted (client-side only)
  if (!mounted) {
    return null;
  }

  const container = document.getElementById(containerId);

  if (!container) {
    return null;
  }

  return createPortal(children, container);
};

export default Portal;
