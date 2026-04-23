// Unified Invoice Interface - Single Source of Truth
export interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
  total: number;
}

export interface BillFrom {
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface BillTo {
  name: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Invoice {
  id: string;
  status: 'Draft' | 'Pending' | 'Paid';
  companyName: string;
  invoiceDate: string;
  paymentDue: string;
  paymentTerms: string;
  from: BillFrom;
  billTo: BillTo;
  sentTo: string;
  items: InvoiceItem[];
  // Computed/calculated fields
  customer?: string; // Derived from billTo.name
  dueDate?: string; // Same as paymentDue
  amount?: string; // Computed from items
  amountDue?: number; // Computed from items
  projectDescription?: string; // For form use
}
