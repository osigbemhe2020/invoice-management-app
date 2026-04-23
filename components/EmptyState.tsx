import Image from "next/image"
import styled from "styled-components"

 function EmptyState() {
  return (
    <EmptyStateContainer>
      <ImageContainer>
          <Image 
          src="/appSvgs/Email campaign_Flatline.svg"
          alt="/No invoices"
          height={200}
          width={240}
          />
      </ImageContainer>
      
      <EmptyStateTitle>
        There is nothing here
      </EmptyStateTitle>
      <EmptyStateSubtitle>
        Create a new invoice by clicking the new ivoice button and get started 
         to get started
        </EmptyStateSubtitle>
      
    </EmptyStateContainer>
  )
}

export default EmptyState

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f9f9fb;
  padding: 40px 20px;

`
const ImageContainer = styled.div`
  width: 280px;
  height: auto;
  margin-bottom: 66px;
  object-fit: contain;
`

const EmptyStateTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-align: center;
`

const EmptyStateSubtitle = styled.p`
  font-size: 14px;
  color: #888888;
  margin-bottom: 32px;
  text-align: center;
  max-width: 400px;
`
