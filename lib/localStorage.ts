import { Invoice } from '@/types/invoice'

const STORAGE_KEY = 'invoices'

// Get all invoices from localStorage
export const getInvoices = (): Invoice[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

// Save all invoices to localStorage
export const saveInvoices = (invoices: Invoice[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices))
  } catch (error) {
    console.error('Error writing to localStorage:', error)
  }
}

// Add a new invoice
export const addInvoice = (invoice: Invoice): void => {
  const invoices = getInvoices()
  invoices.push(invoice)
  saveInvoices(invoices)
}

// Update an existing invoice
export const updateInvoice = (id: string, updatedInvoice: Partial<Invoice>): boolean => {
  const invoices = getInvoices()
  const index = invoices.findIndex(inv => inv.id === id)
  
  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...updatedInvoice }
    saveInvoices(invoices)
    return true
  }
  
  return false
}

// Delete an invoice
export const deleteInvoice = (id: string): boolean => {
  const invoices = getInvoices()
  const filteredInvoices = invoices.filter(inv => inv.id !== id)
  
  if (filteredInvoices.length !== invoices.length) {
    saveInvoices(filteredInvoices)
    return true
  }
  
  return false
}

// Get a specific invoice by ID
export const getInvoiceById = (id: string): Invoice | null => {
  const invoices = getInvoices()
  return invoices.find(inv => inv.id === id) || null
}

// Initialize localStorage with sample data if empty
export const initializeInvoices = (): void => {
  if (typeof window === 'undefined') return
  
  const existingInvoices = getInvoices()
  
  if (existingInvoices.length === 0) {
    // Import sample data
    import('./invoice').then((invoiceModule) => {
      saveInvoices(invoiceModule.default)
    }).catch(error => {
      console.error('Error loading sample invoices:', error)
    })
  }
}
