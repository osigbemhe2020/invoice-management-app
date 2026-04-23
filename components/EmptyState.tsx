import Image from "next/image"
import styled from "styled-components"
import { useTheme } from '@/lib/context/ThemeContext'
import colors from '@/lib/constants/colors'

 function EmptyState() {
  const { isDark } = useTheme();
  
  return (
    <EmptyStateContainer $isDark={isDark}>
      <ImageContainer>
          <Image 
          src="/appSvgs/Email campaign_Flatline.svg"
          alt="/No invoices"
          height={200}
          width={240}
          />
      </ImageContainer>
      
      <EmptyStateTitle $isDark={isDark}>
        There is nothing here
      </EmptyStateTitle>
      <EmptyStateSubtitle $isDark={isDark}>
        Create a new invoice by clicking the new ivoice button and get started 
         to get started
        </EmptyStateSubtitle>
      
    </EmptyStateContainer>
  )
}

export default EmptyState

const EmptyStateContainer = styled.div<{ $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${p => p.$isDark ? colors.darkTheme : '#f9f9fb'};
  padding: 40px 20px;

`
const ImageContainer = styled.div`
  width: 280px;
  height: auto;
  margin-bottom: 66px;
  object-fit: contain;
`

const EmptyStateTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 28px;
  font-weight: 600;
  color: ${p => p.$isDark ? 'white' : '#1a1a1a'};
  margin-bottom: 12px;
  text-align: center;
`

const EmptyStateSubtitle = styled.p<{ $isDark: boolean }>`
  font-size: 14px;
  color: ${p => p.$isDark ? colors.ourSlate : '#888888'};
  margin-bottom: 32px;
  text-align: center;
  max-width: 400px;
`
