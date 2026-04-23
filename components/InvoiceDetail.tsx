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

// Styled Components


export default function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
    <InvoiceDetailContainer>
      {/* Go Back Section */}
      <GoBackButton onClick={handleGoBack}>
        <BackArrow>‹</BackArrow>
        <BackText>Go back</BackText>
      </GoBackButton>

      {/* Top Controls Section */}
      <InvoiceControls>
        <StatusSection>
          <StatusLabel>Status</StatusLabel>
          <StatusBadge $status={invoice.status}>
            ● {invoice.status}
          </StatusBadge>
        </StatusSection>
        <ActionButtons>
          <Button $variant="edit" onClick={handleEdit}>Edit</Button>
          <Button $variant="delete" onClick={handleDelete}>Delete</Button>
          <Button $variant="paid" onClick={handleMarkAsPaid}>Mark as Paid</Button>
        </ActionButtons>
      </InvoiceControls>

      {/* Invoice Details Container */}
      <InvoiceBox>
        {/* Header with ID and Company */}
        <InvoiceHeader>
          <div>
            <InvoiceId>{invoice.id}</InvoiceId>
            <CompanyName>{invoice.companyName}</CompanyName>
          </div>
          <CompanyAddress>
            <p>{invoice.from.address}</p>
            <p>{invoice.from.city}</p>
            <p>{invoice.from.postcode}</p>
            <p>{invoice.from.country}</p>
          </CompanyAddress>
        </InvoiceHeader>

        {/* Dates and Client Info Grid */}
        <InvoiceGrid>
          {/* Invoice Date */}
          <GridItem>
            <GridLabel>Invoice Date</GridLabel>
            <GridValue>{invoice.paymentDue}</GridValue>
          </GridItem>

          {/* Payment Due */}
          <GridItem>
            <GridLabel>Payment Due</GridLabel>
            <GridValue>3000</GridValue>
          </GridItem>

          {/* Bill To */}
          <GridItem>
            <GridLabel>Bill To</GridLabel>
            <GridValue>{invoice.billTo.name}</GridValue>
            <GridSubtext>{invoice.billTo.address}</GridSubtext>
            <GridSubtext>{invoice.billTo.city}</GridSubtext>
            <GridSubtext>{invoice.billTo.postcode}</GridSubtext>
            <GridSubtext>{invoice.billTo.country}</GridSubtext>
          </GridItem>

          {/* Sent To */}
          <GridItem>
            <GridLabel>Sent To</GridLabel>
            <GridValue>{invoice.sentTo}</GridValue>
          </GridItem>
        </InvoiceGrid>

        {/* Items Table */}
        <ItemsTable>
          <TableHeader>
            <ColItem>Item Name</ColItem>
            <ColQty>QTY.</ColQty>
            <ColPrice>Price</ColPrice>
            <ColTotal>Total</ColTotal>
          </TableHeader>

          <TableBody>
            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <ColItem>{item.name}</ColItem>
                <ColQty>{item.qty}</ColQty>
                <ColPrice>£ {item.price.toFixed(2)}</ColPrice>
                <ColTotal>£ {item.total.toFixed(2)}</ColTotal>
              </TableRow>
            ))}
          </TableBody>

          {/* Amount Due Footer */}
          <AmountDue>
            <AmountLabel>Amount Due</AmountLabel>
            <AmountValue>£ {(invoice.amountDue || 0).toFixed(2)}</AmountValue>
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
          <DeleteModalContent>
            <DeleteModalTitle>Delete Confirmation</DeleteModalTitle>
            <DeleteModalText>
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </DeleteModalText>
            <DeleteModalButtons>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <DeleteButton onClick={handleDeleteConfirm}>Delete</DeleteButton>
            </DeleteModalButtons>
          </DeleteModalContent>
        </CenterModal>
      )}
    </InvoiceDetailContainer>
  )
}

const InvoiceDetailContainer = styled.div`
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

const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  cursor: pointer;
  background: none;
  border: none;
  color: ${colors.blueBlack};
  font-size: 14px;
  font-weight: 700;
`

const BackArrow = styled.span`
  font-size: 20px;
  color: #6b7280;
  font-weight: 600;
`

const BackText = styled.span`
  letter-spacing: -0.5px;
  color: inherit;
`

const InvoiceControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 20px 32px;
  background-color: white;

`

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const StatusLabel = styled.span`
  color: ${colors.ourSlate};
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


const DeleteModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`

const DeleteModalTitle = styled.h2`
  margin-bottom: 16px;
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
`

const DeleteModalText = styled.p`
  margin-bottom: 24px;
  color: #6b7280;
  line-height: 1.5;
`

const DeleteModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`

const CancelButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  background-color: #e5e7eb;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d1d5db;
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

const Button = styled.button<{ $variant?: 'edit' | 'delete' | 'paid' }>`
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
          background-color: #e5e7eb;
          color: ${colors.mediumDarkSlate};
          &:hover {
            background-color: #e5e7eb;
          }
        `
    }
  }}
`

const InvoiceBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
`

const InvoiceId = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`

const CompanyName = styled.p`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`

const CompanyAddress = styled.div`
  text-align: right;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.6;

  p {
    margin-bottom: 2px;
  }
`

const InvoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
`

const GridLabel = styled.p`
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const GridValue = styled.p`
  font-size: 14px;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 4px;
`

const GridSubtext = styled.p`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
`

const ItemsTable = styled.div`
  margin-top: 32px;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.5fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  div {
    font-size: 12px;
    color: #6b7280;
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

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.5fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  align-items: center;
  border-bottom: 1px solid #f3f4f6;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  ${ColItem} {
    font-size: 14px;
    color: #1f2937;
    font-weight: 500;
  }

  ${ColQty} {
    font-size: 14px;
    color: #1f2937;
    text-align: center;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  ${ColPrice} {
    font-size: 14px;
    color: #1f2937;
    text-align: right;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  ${ColTotal} {
    font-size: 14px;
    color: #1f2937;
    font-weight: 600;
    text-align: right;
  }
`

const AmountDue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  margin-top: 24px;
  background-color: #2d3748;
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
