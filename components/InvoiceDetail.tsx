"use client";
import React, { useState } from 'react'
import styled from 'styled-components'
import { Invoice } from '@/types/invoice'
import { useRouter } from 'next/navigation'
import colors from '@/lib/constants/colors'
import device from '@/lib/constants/breakpoints'
import LeftModal from './LeftModal'
import InvoiceForm from './InvoiceForm'
import CenterModal from './CenterModal';
import { useTheme } from '@/lib/context/ThemeContext';

// Styled Components


export default function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { isDark } = useTheme();

  const handleGoBack = () => {
    router.push('/')
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleMarkAsPaid = () => {
    // Update the invoice status to 'paid' in localStorage
    const { updateInvoice } = require('@/lib/localStorage')
    const success = updateInvoice(invoice.id, { status: 'Paid' })
    
    if (success) {
      alert('Invoice marked as paid!')
      // Refresh the page to show updated status
      window.location.reload()
    } else {
      alert('Failed to mark invoice as paid')
    }
  }

  const handleDeleteConfirm = () => {
    // Delete the invoice from localStorage
    const { deleteInvoice } = require('@/lib/localStorage')
    const success = deleteInvoice(invoice.id)
    
    if (success) {
      alert('Invoice deleted successfully!')
      setIsDeleteModalOpen(false)
      router.push('/')
    } else {
      alert('Failed to delete invoice')
    }
  }

  const handleCancel = () => {
    setIsEditModalOpen(false)
    setIsDeleteModalOpen(false)
  }

  return (
    <InvoiceDetailContainer $isDark={isDark}>
      {/* Go Back Section */}
      <GoBackButton onClick={handleGoBack} $isDark={isDark}>
        <BackArrow $isDark={isDark}>‹</BackArrow>
        <BackText>Go back</BackText>
      </GoBackButton>

      {/* Top Controls Section */}
      <InvoiceControls $isDark={isDark}>
        <StatusSection>
          <StatusLabel $isDark={isDark}>Status</StatusLabel>
          <StatusBadge $status={invoice.status}>
            ● {invoice.status}
          </StatusBadge>
        </StatusSection>
        <ActionButtons>
          <Button $variant="edit" onClick={handleEdit} $isDark={isDark}>Edit</Button>
          <Button $variant="delete" onClick={handleDelete} $isDark={isDark}>Delete</Button>
          <Button $variant="paid" onClick={handleMarkAsPaid} $isDark={isDark}>Mark as Paid</Button>
        </ActionButtons>
      </InvoiceControls>

      {/* Invoice Details Container */}
      <InvoiceBox $isDark={isDark}>
        {/* Header with ID and Company */}
        <InvoiceHeader $isDark={isDark}>
          <div>
            <InvoiceId $isDark={isDark}>{invoice.id}</InvoiceId>
            <CompanyName $isDark={isDark}>{invoice.companyName}</CompanyName>
          </div>
          <CompanyAddress $isDark={isDark}>
            <p>{invoice.from.address}</p>
            <p>{invoice.from.city}</p>
            <p>{invoice.from.postcode}</p>
            <p>{invoice.from.country}</p>
          </CompanyAddress>
        </InvoiceHeader>

        {/* Dates and Client Info Grid */}
        <InvoiceGrid $isDark={isDark}>
          {/* Invoice Date */}
          <GridItem>
            <GridLabel $isDark={isDark}>Invoice Date</GridLabel>
            <GridValue $isDark={isDark}>{invoice.paymentDue}</GridValue>
          </GridItem>

          {/* Payment Due */}
          <GridItem>
            <GridLabel $isDark={isDark}>Payment Due</GridLabel>
            <GridValue $isDark={isDark}>3000</GridValue>
          </GridItem>

          {/* Bill To */}
          <GridItem>
            <GridLabel $isDark={isDark}>Bill To</GridLabel>
            <GridValue $isDark={isDark}>{invoice.billTo.name}</GridValue>
            <GridSubtext $isDark={isDark}>{invoice.billTo.address}</GridSubtext>
            <GridSubtext $isDark={isDark}>{invoice.billTo.city}</GridSubtext>
            <GridSubtext $isDark={isDark}>{invoice.billTo.postcode}</GridSubtext>
            <GridSubtext $isDark={isDark}>{invoice.billTo.country}</GridSubtext>
          </GridItem>

          {/* Sent To */}
          <GridItem>
            <GridLabel $isDark={isDark}>Sent To</GridLabel>
            <GridValue $isDark={isDark}>{invoice.sentTo}</GridValue>
          </GridItem>
        </InvoiceGrid>

        {/* Items Table */}
        <ItemsTable $isDark={isDark}>
          <TableHeader $isDark={isDark}>
            <ColItem>Item Name</ColItem>
            <ColQty>QTY.</ColQty>
            <ColPrice>Price</ColPrice>
            <ColTotal>Total</ColTotal>
          </TableHeader>

          <TableBody $isDark={isDark}>
            {invoice.items.map((item, index) => (
              <TableRow key={index} $isDark={isDark}>
                <ColItem>{item.name}</ColItem>
                <ColQty>{item.qty}</ColQty>
                <ColPrice>£ {item.price.toFixed(2)}</ColPrice>
                <ColTotal>£ {item.total.toFixed(2)}</ColTotal>
              </TableRow>
            ))}
          </TableBody>

          {/* Amount Due Footer */}
          <AmountDue $isDark={isDark}>
            <AmountLabel>Amount Due</AmountLabel>
            <AmountValue>£ {(invoice.items.reduce((sum, item) => sum + item.total, 0)).toFixed(2)}</AmountValue>
          </AmountDue>
        </ItemsTable>
      </InvoiceBox>
      
      {/* Edit Modal */}
      <LeftModal 
        isOpen={isEditModalOpen} 
        toggleModal={() => setIsEditModalOpen(false)}
       
      >
        <InvoiceForm 
          invoice={invoice}
          onSubmit={(data) => {
            console.log('Edit invoice:', data)
            setIsEditModalOpen(false)
            // In a real app, this would update the invoice
            alert('Invoice updated!')
          }}
          onCancel={handleCancel}
          mode="edit"
        />
      </LeftModal>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <CenterModal 
          toggleModal={handleCancel}
        >
          <DeleteModalContent $isDark={isDark}>
            <DeleteModalTitle $isDark={isDark}>Delete Confirmation</DeleteModalTitle>
            <DeleteModalText $isDark={isDark}>
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </DeleteModalText>
            <DeleteModalButtons>
              <CancelButton onClick={handleCancel} $isDark={isDark}>Cancel</CancelButton>
              <DeleteButton onClick={handleDeleteConfirm}>Delete</DeleteButton>
            </DeleteModalButtons>
          </DeleteModalContent>
        </CenterModal>
      )}
      <MobileActions $isDark={isDark}>
      <Button $variant="edit" onClick={handleEdit} $isDark={isDark}>Edit</Button>
      <Button $variant="delete" onClick={handleDelete} $isDark={isDark}>Delete</Button>
      <Button $variant="paid" onClick={handleMarkAsPaid} $isDark={isDark}>Mark as Paid</Button>
    </MobileActions>
    </InvoiceDetailContainer>
  )
}

const InvoiceDetailContainer = styled.div<{ $isDark: boolean }>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 730px;
  margin: 0 auto;
  overflow-y: auto;
  margin-top: 40px;
  padding: 15px 0;
`

const GoBackButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  cursor: pointer;
  background: none;
  border: none;
  color: ${p => p.$isDark ? 'white' : colors.blueBlack};
  font-size: 14px;
  font-weight: 700;
`

const BackArrow = styled.span<{ $isDark: boolean }>`
  font-size: 20px;
  color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
  font-weight: 600;
`

const BackText = styled.span`
  letter-spacing: -0.5px;
  color: inherit;
`



const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const StatusLabel = styled.span<{ $isDark: boolean }>`
  color: ${p => p.$isDark ? colors.ourSlate : colors.ourSlate};
  font-size: 13px;
  font-weight: 500;
`

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100px;
  height: 40px;
  border-radius: 6px;
  line-height: 15px;
  font-size: 15px;
  font-weight: 600;
  background-color: ${(props) => {
    switch (props.$status.toLowerCase()) {
      case 'pending':
        return 'rgba(255, 143, 0, 0.1)'
      case 'paid':
        return 'rgba(51, 214, 159, 0.1)'
      case 'draft':
        return 'rgba(55, 59, 83, 0.1)'
      default:
        return 'rgba(55, 59, 83, 0.1)'
    }
  }};
  color: ${(props) => {
    switch (props.$status.toLowerCase()) {
      case 'pending':
        return '#FF8F00'
      case 'paid':
        return '#33D69F'
      case 'draft':
        return '#373B53'
      default:
        return '#373B53'
    }
  }};
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

const InvoiceControls = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 20px 32px;
  background-color: ${p => p.$isDark ? colors.darkTheme : 'white'};

  @media (${device.mobile}) {
    justify-content: flex-start;
    gap: 12px;
    padding: 20px;
    
    ${ActionButtons} {
      display: none;  /* hide from top on mobile */
    }
  }

`


const DeleteModalContent = styled.div<{ $isDark: boolean }>`
  background: ${p => p.$isDark ? colors.darkTheme : 'white'};
  border-radius: 8px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`

const DeleteModalTitle = styled.h2<{ $isDark: boolean }>`
  margin-bottom: 16px;
  color: ${p => p.$isDark ? 'white' : '#1f2937'};
  font-size: 20px;
  font-weight: 700;
`

const DeleteModalText = styled.p<{ $isDark: boolean }>`
  margin-bottom: 24px;
  color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
  line-height: 1.5;
`

const DeleteModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`

const CancelButton = styled.button<{ $isDark: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  background-color: ${p => p.$isDark ? colors.darkThemeLight : '#e5e7eb'};
  color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${p => p.$isDark ? colors.darkTheme : '#d1d5db'};
  }
`

const DeleteButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  background-color: ${colors.lightRed};
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.pink};
  }
`

const Button = styled.button<{ $variant?: 'edit' | 'delete' | 'paid', $isDark: boolean }>`
  padding: 14px 24px;
  border: none;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) => {
    switch (props.$variant) {
      case 'delete':
        return `
          background-color: ${colors.lightRed};
          color: white;
          &:hover {
            background-color:${colors.pink};
          }
        `
      case 'paid':
        return `
          background-color: ${colors.mainPurple};
          color: white;
          &:hover {
            background-color: ${colors.lightPurple};
          }
        `
      default:
        return `
          background-color: ${props.$isDark ? colors.darkThemeLight : '#e5e7eb'};
          color: ${colors.mediumDarkSlate};
          &:hover {
            background-color: ${props.$isDark ? colors.darkThemeLight : '#e5e7eb'};
          }
        `
    }
  }}
`

const InvoiceBox = styled.div<{ $isDark: boolean }>`
  background: ${p => p.$isDark ? colors.darkTheme : 'white'};
  border-radius: 12px;
  padding: 40px;
  box-shadow: ${p => p.$isDark ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  @media (${device.mobile}) {
    padding: 20px;
  }
`

const InvoiceHeader = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${p => p.$isDark ? colors.darkThemeLight : '#e5e7eb'};
`

const InvoiceId = styled.p<{ $isDark: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${p => p.$isDark ? 'white' : '#1f2937'};
  margin-bottom: 4px;
`

const CompanyName = styled.p<{ $isDark: boolean }>`
  font-size: 13px;
  color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
  font-weight: 500;
`

const CompanyAddress = styled.div<{ $isDark: boolean }>`
  text-align: right;
  font-size: 12px;
  color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
  line-height: 1.6;

  p {
    margin-bottom: 2px;
  }
`

const InvoiceGrid = styled.div<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${p => p.$isDark ? colors.darkThemeLight : '#e5e7eb'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
`

const GridLabel = styled.p<{ $isDark: boolean }>`
  font-size: 12px;
  color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const GridValue = styled.p<{ $isDark: boolean }>`
  font-size: 14px;
  color: ${p => p.$isDark ? 'white' : '#1f2937'};
  font-weight: 600;
  margin-bottom: 4px;
`

const GridSubtext = styled.p<{ $isDark: boolean }>`
  font-size: 12px;
  color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
  line-height: 1.5;
`

const ItemsTable = styled.div<{ $isDark: boolean }>`
  margin-top: 32px;
`

const TableHeader = styled.div<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: 2fr 0.5fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 2px solid ${p => p.$isDark ? colors.darkThemeLight : '#e5e7eb'};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  div {
    font-size: 12px;
    color: ${p => p.$isDark ? colors.ourSlate : '#6b7280'};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const ColItem = styled.div`
  text-align: left;
`

const ColQty = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
  }
`

const ColPrice = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`

const ColTotal = styled.div`
  text-align: right;
`

const TableBody = styled.div<{ $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const TableRow = styled.div<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: 2fr 0.5fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  align-items: center;
  border-bottom: 1px solid ${p => p.$isDark ? colors.darkThemeLight : '#f3f4f6'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  ${ColItem} {
    font-size: 14px;
    color: ${p => p.$isDark ? 'white' : '#1f2937'};
    font-weight: 500;
  }

  ${ColQty} {
    font-size: 14px;
    color: ${p => p.$isDark ? 'white' : '#1f2937'};
    text-align: center;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  ${ColPrice} {
    font-size: 14px;
    color: ${p => p.$isDark ? 'white' : '#1f2937'};
    text-align: right;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  ${ColTotal} {
    font-size: 14px;
    color: ${p => p.$isDark ? 'white' : '#1f2937'};
    font-weight: 600;
    text-align: right;
  }
`

const AmountDue = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  margin-top: 24px;
  background-color: ${p => p.$isDark ? colors.darkNavy : '#2d3748'};
  border-radius: 8px;
  color: white;
`

const AmountLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`

const AmountValue = styled.span`
  font-size: 28px;
  font-weight: 700;
`
const MobileActions = styled.div<{ $isDark: boolean }>`
  display: none;

  @media (${device.mobile}) {
    display: flex;
    gap: 8px;
    padding: 16px 20px;
    background-color: ${p => p.$isDark ? colors.darkTheme : 'white'};
    position: sticky;
    bottom: 0;
    width: 100%;
    justify-content: center;
    box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
    margin-top: auto;
  }
`;