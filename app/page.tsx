
"use client";

import { useState, useEffect } from 'react';
import InvoiceList from '@/components/InvoiceList'
import { getInvoices, addInvoice } from '@/lib/localStorage'
import colors from '@/lib/constants/colors'
import styled from 'styled-components'
import { Invoice, InvoiceItem } from '@/types/invoice'
import device from '@/lib/constants/breakpoints'
import { useTheme } from '@/lib/context/ThemeContext'

import LeftModal from '@/components/LeftModal'
import InvoiceForm from '@/components/InvoiceForm'
import EmptyState from '@/components/EmptyState';

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const { isDark } = useTheme();

  const count = invoices.length

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load invoices from localStorage on mount
  useEffect(() => {
    setInvoices(getInvoices())
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleInvoiceSubmit = (data: any) => {
  const submittedInvoice: Invoice = {
    ...data,
    from: data.billFrom, // ✅ remap back to what Invoice type expect // Use address as company name
    paymentDue: calculatePaymentDue(data.invoiceDate, data.paymentTerms), // Calculate payment due date
    amount: calculateTotal(data.items), // Calculate total amount from items
    id: data.id || generateInvoiceId(),
    status: 'Pending' as const,
  }
  addInvoice(submittedInvoice)
  setInvoices(getInvoices())
  toggleModal()
}

  // Generate random invoice ID
  const generateInvoiceId = (): string => {
    const randomNum = Math.floor(Math.random() * 100000)
    const randomLetters = Math.random().toString(36).substring(2, 4).toUpperCase()
    return `${randomLetters}${randomNum}`
  }

  // Calculate payment due date based on payment terms
  const calculatePaymentDue = (invoiceDate: string, paymentTerms: string): string => {
    const date = new Date(invoiceDate)
    const days = paymentTerms.includes('15') ? 15 : paymentTerms.includes('60') ? 60 : 30
    const dueDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000))
    return dueDate.toISOString().split('T')[0]
  }

  // Calculate total amount from invoice items
  const calculateTotal = (items: InvoiceItem[]): string => {
    const total = items.reduce((sum, item) => sum + item.total, 0)
    return total.toFixed(2)
  }

  const handleInvoiceCancel = () => {
    toggleModal()
  }

  const handleSaveAsDraft = (data: any) => {
    // Save as draft (editing is handled in InvoiceDetail)
    const draftInvoice: Invoice = {
      ...data,
      from: data.billFrom, // ✅ remap back to what Invoice type expects
      companyName: data.billFrom.address.split(',')[0] || 'Unknown Company', // Use address as company name
      paymentDue: calculatePaymentDue(data.invoiceDate, data.paymentTerms), // Calculate payment due date
      amount: calculateTotal(data.items), // Calculate total amount from items
      id: data.id || generateInvoiceId(), // Use existing ID or generate new one
      status: 'Draft' as const // Ensure it's saved as draft
    }
    addInvoice(draftInvoice)
    setInvoices(getInvoices())
    toggleModal()
  }

  // Create a default invoice object for the form
  const defaultInvoice: Invoice = {
    id: '',
    status: 'Draft',
    companyName: '', // Will be populated from billFrom.address
    invoiceDate: '',
    paymentDue: '', // Will be calculated from invoiceDate and paymentTerms
    paymentTerms: 'Net 30 Days',
    amount: '0.00', // Will be calculated from items
    from: {
      address: '',
      city: '',
      postcode: '',
      country: ''
    },
    billTo: {
      name: '',
      address: '',
      city: '',
      postcode: '',
      country: ''
    },
    sentTo: '',
    items: []
  }

  return (
    <MainContent $isDark={isDark}>
      <HeaderSection>
        <HeaderText>
          <h1>Invoices</h1>
          <p>There are {count} total invoices</p>
        </HeaderText>
        <HeaderControls>
          <FilterSelect $isDark={isDark}>
            <option value="">{isMobile ? 'Filter' : 'Filter by status'}</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </FilterSelect>
          <NewInvoiceBtn onClick={toggleModal} $isDark={isDark}>
            <PlusIcon $isDark={isDark}>+</PlusIcon>
            {isMobile ? 'New' : 'New Invoice'}
          </NewInvoiceBtn>
        </HeaderControls>
      </HeaderSection>
      {count > 0 ? (
        <InvoiceList invoices={invoices} />
      ) : (
        <EmptyState />
      )}
      
      <LeftModal 
        isOpen={isModalOpen} 
        toggleModal={toggleModal}
        
      >
        <InvoiceForm 
        invoice={defaultInvoice}
        onSubmit={handleInvoiceSubmit}
        onCancel={handleInvoiceCancel}
        onSaveAsDraft={handleSaveAsDraft}
        mode="create"
      />
      </LeftModal>
    </MainContent>
  )
}

export default Page

const MainContent = styled.main<{ $isDark: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  overflow-y: auto;
  margin-top: 37px;
  max-width: 730px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;          /* ✅ add this */

  h1 { color: ${p => p.$isDark ? 'white' : colors.blueBlack}; }
  p  { color: ${p => p.$isDark ? colors.ourSlate : colors.ourSlate}; }

  @media (${device.tablet}) {
    padding: 24px 20px;
    margin-top: 0;       /* ✅ sidebar is now on top, not side */
    max-width: 100%;     /* ✅ take full width */
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
`

const HeaderText = styled.div`
  h1 {
    margin-bottom: 6px;
  }
  
  p {
    color: ${colors.ourSlate};
  }
`

const HeaderControls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`


// const DropdownArrow = styled.span`
//   color: #6b7280;
//   font-size: 20px;
// `

const NewInvoiceBtn = styled.button<{ $isDark: boolean }>`
  width: 150px;
  height: 40px;
  padding:8px;
  background: ${colors.mainPurple} ;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  box-shadow: ${p => p.$isDark ? '0 4px 12px rgba(124, 58, 237, 0.5)' : '0 4px 12px rgba(124, 58, 237, 0.3)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${p => p.$isDark ? '0 6px 16px rgba(124, 58, 237, 0.6)' : '0 6px 16px rgba(124, 58, 237, 0.4)'};
    background: ${colors.lightPurple};
  }

  @media (${device.mobile}) {
    width: 90px;
  }
`

const PlusIcon = styled.span<{ $isDark: boolean }>`
  font-size: 18px;
  font-weight: bold;
  background: ${p => p.$isDark ? colors.darkTheme : 'white'};
  color: ${colors.mainPurple};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
   color: ${colors.lightPurple}
  }
`


const FilterSelect = styled.select<{ $isDark: boolean }>`
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: ${p => p.$isDark ? 'white' : '#1f2937'};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-league-spartan), Arial, Helvetica, sans-serif;

  &:focus {
    outline: none;
  }

  option {
    color: ${p => p.$isDark ? 'white' : '#1f2937'};
    background-color: ${p => p.$isDark ? colors.darkTheme : 'white'};
  }

  @media (${device.tablet}) {
    option[value=""]::after {
      content: "Filter";
    }
  }
`
