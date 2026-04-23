"use client";

import { useEffect, useState } from "react";
import { use } from "react";  // import `use`
import InvoiceDetail from "@/components/InvoiceDetail";
import { getInvoiceById } from "@/lib/localStorage";
import { Invoice } from "@/types/invoice";


type Props = {
  params: Promise<{ id: string }>;  // params is now a Promise
};

export default function InvoicePage({ params }: Props) {
  const { id } = use(params);  // unwrap with React.use()
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundInvoice = getInvoiceById(id);
    setInvoice(foundInvoice);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}><h1>Loading...</h1></div>;
  }

  if (!invoice) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Invoice Not Found</h1>
        <p>The invoice could not be found.</p>
      </div>
    );
  }

  return (
    <InvoiceDetail invoice={invoice} />
  );
}

;