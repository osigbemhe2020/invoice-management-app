import React from 'react';
import Portal from './portal';
import styled from 'styled-components';
import device from '@/lib/constants/breakpoints';
import Image from 'next/image';

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
  return (
    <Portal>
      <Background
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
        $isOpen={isOpen}
      >
        <MainContainer
          $bgcolor={bgcolor}
          $borderRadius={borderRadius}
          $width={width}
          $height={height}
          onClick={(e) => e.stopPropagation()}
          $isOpen={isOpen}
        >
          {showClose && (
            <CloseButton onClick={toggleModal}>
              <Image
                src="/close.svg"
                alt="cancel button"
                height="50"
                width="50"
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
}

interface MainContainerProps {
  $bgcolor?: string;
  $borderRadius?: string;
  $width?: string;
  $height?: string;
  $isOpen: boolean;
}

const Background = styled.div<BackgroundProps>`
  background-color: rgba(52, 64, 84, 0.7);
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
  background-color: ${({ theme, $bgcolor }) => $bgcolor ?? (theme?.color?.white || '#ffffff')};
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
  @media (${device.tablet}) {
    padding-left: 10px;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media (${device.tablet}) {
    width: 616px;
    max-height: calc(100% - 80px);
    top: 80px;
    margin-top: 80px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background-color: transparent;
  border: none;
`;
