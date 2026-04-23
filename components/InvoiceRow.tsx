"use client";

import { Invoice } from '@/types/invoice'
import styled from "styled-components"
import { useRouter } from 'next/navigation'
import { StatusBadge } from './InvoiceDetail'

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const router = useRouter()

  const handleRowClick = () => {
    router.push(`/${invoice.id}`)
  }

  return (
    <InvoiceRowContainer onClick={handleRowClick}>
      <InvoiceId>#{invoice.id}</InvoiceId>
      <InvoiceDate>{invoice.paymentDue}</InvoiceDate>
      <InvoiceCustomer>{invoice.billTo.name}</InvoiceCustomer>
      <InvoiceAmount>{invoice.amount}</InvoiceAmount>
      <StatusBadge $status={invoice.status}>
        ● {invoice.status}
      </StatusBadge>
      <ActionButton>›</ActionButton>
    </InvoiceRowContainer>
  )
}

export default InvoiceRow

const InvoiceRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1fr 1.2fr auto;
  gap: 10px;
  align-items: center;
  padding: 16px 32px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
`

const InvoiceId = styled.div`
  font-weight: 700;
  color: #1f2937;
  font-size: 14px;
`

const InvoiceDate = styled.div`
  font-size: 13px;
  color: #6b7280;
`

const InvoiceCustomer = styled.div`
  font-size: 13px;
  color: #6b7280;
`

const InvoiceAmount = styled.div`
  font-weight: 700;
  color: #1f2937;
  font-size: 14px;
`

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 20px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #6b7280;
  }
`