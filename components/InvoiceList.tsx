import React from 'react'
import InvoiceRow from './InvoiceRow'
import styled from 'styled-components'
import { Invoice } from '@/types/invoice'

function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  return (
    <InvoiceListContainer>
      {invoices.map((invoice) => (
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
