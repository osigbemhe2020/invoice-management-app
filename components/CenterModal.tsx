import React from "react";
import styled from "styled-components";
import colors from '@/lib/constants/colors';
import { createPortal } from 'react-dom';



interface CenterModalProps {
  toggleModal: () => void;
  children: React.ReactNode;
  borderRadius?: number | string;
  bgcolor?: string;
  width?: string | number;
  height?: string | number;
  justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
  mainHeight?: string | number;
  overflow?: 'auto' | 'hidden' | 'scroll' | 'visible';
}

const CenterModal: React.FC<CenterModalProps> = ({
  toggleModal,
  children,
  borderRadius,
  bgcolor,
  width,
  height,
  justify,
  mainHeight,
  overflow,
}) => {
  const modalContent = (
    <ModalOverlay
      onClick={(e) => {
        e.stopPropagation();
        toggleModal();
      }}
      $justify={justify}
      $mainHeight={mainHeight}
    >
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $width={width}
        $height={height}
        $overflow={overflow}
        style={{
          borderRadius,
          backgroundColor: bgcolor,
        }}
      >
        {children}
      </ModalContent>
    </ModalOverlay>

  );

  return createPortal(modalContent, document.body);
};


const ModalOverlay = styled.div<{
  $justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
  $mainHeight?: string | number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: ${({ $mainHeight }) => $mainHeight ?? 'auto'};
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: ${({ $justify }) => $justify ?? 'center'};
  z-index: 9999;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div<{
  $width?: string | number;
  $height?: string | number;
  $overflow?: 'auto' | 'hidden' | 'scroll' | 'visible';
}>`
  background: white;
  border-radius: 0.75rem;
  padding: 32px;
  width: ${({ $width }) => $width ?? 'auto'};
  height: ${({ $height }) => $height ?? 'auto'};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  margin: 1rem;
  overflow: ${({ $overflow }) => $overflow ?? 'auto'};

  @media (max-width: 768px) {
    width: 95%;
    margin: 0.5rem;
  }
`;

export default CenterModal;

