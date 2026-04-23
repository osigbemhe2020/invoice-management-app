// InvoiceList.tsx
import React from 'react'
import InvoiceRow from './InvoiceRow'
import styled from 'styled-components'
import { Invoice } from '@/types/invoice'

function InvoiceList({ invoices, filterStatus }: { invoices: Invoice[], filterStatus?: string }) {
  const filteredInvoices = filterStatus
    ? invoices.filter(invoice => invoice.status === filterStatus)
    : invoices

  return (
    <InvoiceListContainer>
      {filteredInvoices.map((invoice) => (
        <InvoiceRow key={invoice.id} invoice={invoice} />
      ))}
    </InvoiceListContainer>
  )
}

export default InvoiceList

const InvoiceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
