 import { Invoice } from '@/types/invoice';

// Helper function to generate random date
const generateRandomDate = () => {
  const start = new Date(2021, 0, 1);
  const randomDays = Math.floor(Math.random() * 365);
  const randomDate = new Date(start);
  randomDate.setDate(start.getDate() + randomDays);
  return randomDate.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

// Helper function to generate random amount
const generateRandomAmount = () => {
  return (Math.random() * 10000 + 100).toFixed(2);
};

// Helper function to calculate total amount
const calculateTotal = (items: any[]) => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

const invoices: Invoice[] = [
  {
    id: 'RT3080',
    status: 'Paid',
    companyName: 'Tech Solutions Ltd',
    invoiceDate: generateRandomDate(),
    paymentDue: generateRandomDate(),
    paymentTerms: 'Net 30 Days',
    from: {
      address: '123 Business Street, London, UK',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom'
    },
    billTo: {
      name: 'Sarah Johnson',
      address: '456 Client Avenue, Manchester, UK',
      city: 'Manchester',
      postcode: 'M1 2AE',
      country: 'United Kingdom'
    },
    sentTo: 'sarah.johnson@email.com',
    items: [
      {
        name: 'Web Development Services',
        qty: 40,
        price: 75.00,
        total: 3000.00
      },
      {
        name: 'UI/UX Design',
        qty: 20,
        price: 50.00,
        total: 1000.00
      }
    ],
    // Computed fields for display
    customer: 'Sarah Johnson',
    dueDate: generateRandomDate(),
    amount: generateRandomAmount(),
    amountDue: 4000.00
  },
  {
    id: 'XM9141',
    status: 'Pending',
    companyName: 'Digital Marketing Agency',
    invoiceDate: generateRandomDate(),
    paymentDue: generateRandomDate(),
    paymentTerms: 'Net 15 Days',
    from: {
      address: '789 Innovation Drive, Birmingham, UK',
      city: 'Birmingham',
      postcode: 'B1 2HQ',
      country: 'United Kingdom'
    },
    billTo: {
      name: 'Mike Chen',
      address: '321 Tech Boulevard, Bristol, UK',
      city: 'Bristol',
      postcode: 'BS1 4AB',
      country: 'United Kingdom'
    },
    sentTo: 'mike.chen@digital.com',
    items: [
      {
        name: 'SEO Optimization',
        qty: 15,
        price: 200.00,
        total: 3000.00
      },
      {
        name: 'Content Creation',
        qty: 25,
        price: 80.00,
        total: 2000.00
      }
    ],
    // Computed fields for display
    customer: 'Mike Chen',
    dueDate: generateRandomDate(),
    amount: generateRandomAmount(),
    amountDue: 5000.00
  },
  {
    id: 'BD0294',
    status: 'Draft',
    companyName: 'Creative Studio',
    invoiceDate: generateRandomDate(),
    paymentDue: generateRandomDate(),
    paymentTerms: 'Net 60 Days',
    from: {
      address: '555 Art Street, Liverpool, UK',
      city: 'Liverpool',
      postcode: 'L1 8JQ',
      country: 'United Kingdom'
    },
    billTo: {
      name: 'Emma Wilson',
      address: '222 Design Lane, Leeds, UK',
      city: 'Leeds',
      postcode: 'LS1 2BA',
      country: 'United Kingdom'
    },
    sentTo: 'emma.wilson@creative.com',
    items: [
      {
        name: 'Brand Identity Design',
        qty: 1,
        price: 2500.00,
        total: 2500.00
      }
    ],
    // Computed fields for display
    customer: 'Emma Wilson',
    dueDate: generateRandomDate(),
    amount: generateRandomAmount(),
    amountDue: 2500.00
  }
];

export default invoices;