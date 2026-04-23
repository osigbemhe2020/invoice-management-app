"use client";

import { Invoice } from '@/types/invoice'
import styled from "styled-components"
import { useRouter } from 'next/navigation'
import { StatusBadge } from './InvoiceDetail'
import colors from '@/lib/constants/colors'
import device from '@/lib/constants/breakpoints'

import { useTheme } from '@/lib/context/ThemeContext';

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const { isDark } = useTheme();
  const router = useRouter();
 
  const handleRowClick = () => {
    router.push(`/${invoice.id}`);
  };
  
  return (
    <InvoiceRowContainer $isDark={isDark} onClick={handleRowClick}>
      <InvoiceId $isDark={isDark}>#{invoice.id}</InvoiceId>
      <InvoiceDate>{invoice.paymentDue}</InvoiceDate>
      <InvoiceCustomer>{invoice.billTo.name}</InvoiceCustomer>
      <InvoiceAmount $isDark={isDark}>{invoice.amount}</InvoiceAmount>
      <StatusBadge $status={invoice.status}>● {invoice.status}</StatusBadge>
      <ActionButton>›</ActionButton>
    </InvoiceRowContainer>
  );
}

export default InvoiceRow

const InvoiceId = styled.div<{ $isDark: boolean }>`
  font-weight: 700;
  color: ${p => p.$isDark ? 'white' : '#1f2937'};
  font-size: 14px;
`;

const InvoiceAmount = styled.div<{ $isDark: boolean }>`
  font-weight: 700;
  color: ${p => p.$isDark ? 'white' : '#1f2937'};
  font-size: 14px;
`;

const InvoiceDate = styled.div`
  font-size: 13px;
  color: #6b7280;
`

const InvoiceCustomer = styled.div`
  font-size: 13px;
  color: #6b7280;
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

const InvoiceRowContainer = styled.div<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1fr 1.2fr auto;
  gap: 10px;
  align-items: center;
  padding: 16px 32px;
  background-color: ${p => p.$isDark ? colors.darkTheme : 'white'};
  border-radius: 12px;
  border: 1px solid ${p => p.$isDark ? colors.darkThemeLight : '#e5e7eb'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${p => p.$isDark ? colors.mainPurple : '#d1d5db'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  @media (${device.mobile}) {
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "id    customer"
    "date  date"
    "amount status";
  gap: 8px;
  padding: 16px 20px;

  ${InvoiceId}     { grid-area: id; }
  ${InvoiceCustomer} { grid-area: customer; text-align: right; }
  ${InvoiceDate}   { grid-area: date; }
  ${InvoiceAmount} { grid-area: amount; align-self: end; }
  ${StatusBadge}   { grid-area: status; justify-self: end; }
  ${ActionButton}  { display: none; }
}
`