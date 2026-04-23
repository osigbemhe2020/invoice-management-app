import React from 'react';
import Portal from './portal';
import styled from 'styled-components';
import device from '@/lib/constants/breakpoints';
import Image from 'next/image';
import { useTheme } from '@/lib/context/ThemeContext';
import colors from '@/lib/constants/colors';

interface LeftModalProps {
  toggleModal: () => void;
  children: React.ReactNode;
  borderRadius?: string;
  bgcolor?: string;
  width?: string;
  height?: string;
  isOpen: boolean;
  showClose?: boolean;
}

const LeftModal: React.FC<LeftModalProps> = ({
  toggleModal,
  children,
  borderRadius,
  bgcolor,
  width,
  height,
  isOpen,
  showClose,
}) => {
  const { isDark } = useTheme();
  
  return (
    <Portal>
      <Background
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
        $isOpen={isOpen}
        $isDark={isDark}
      >
        <MainContainer
          $bgcolor={bgcolor}
          $borderRadius={borderRadius}
          $width={width}
          $height={height}
          onClick={(e) => e.stopPropagation()}
          $isOpen={isOpen}
          $isDark={isDark}
        >
          {showClose && (
            <CloseButton onClick={toggleModal} $isDark={isDark}>
              <Image
                src="/close.svg"
                alt="cancel button"
                height="50"
                width="50"
                style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
              />
            </CloseButton>
          )}

          {children}
        </MainContainer>
      </Background>
    </Portal>
  );
};

export default React.memo(LeftModal);

interface BackgroundProps {
  $isOpen: boolean;
  $isDark: boolean;
}

interface MainContainerProps {
  $bgcolor?: string;
  $borderRadius?: string;
  $width?: string;
  $height?: string;
  $isOpen: boolean;
  $isDark: boolean;
}

const Background = styled.div<BackgroundProps>`
  background-color: ${p => p.$isDark ? 'rgba(30, 33, 57, 0.7)' : 'rgba(52, 64, 84, 0.7)'};
  backdrop-filter: blur(8px);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
  transition-delay: ${({ $isOpen }) => ($isOpen ? '0s' : '0.3s')};
`;

const MainContainer = styled.div<MainContainerProps>`
  cursor: auto;
  background-color: ${({ $bgcolor, $isDark }) => $bgcolor ?? ($isDark ? colors.darkTheme : '#ffffff')};
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '0'}px;
  width: 719px;
  height: 100%;
  max-height: 100%;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  overflow-y: auto;
  padding-left: 80px;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media (${device.mobile}) {
    width: 100%;
    max-height: calc(100% - 72px);
    margin-top: 72px;
    padding-left: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 0;
  }

  @media (min-width: 769px) and (${device.tablet}) {
    width: 616px;
    max-height: calc(100% - 80px);
    top: 80px;
    margin-top: 80px;
    padding-left: 10px;
  }
`;

const CloseButton = styled.button<{ $isDark: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  
  img {
    filter: ${({ $isDark }) => $isDark ? 'brightness(0) invert(1)' : 'none'};
  }
`;
