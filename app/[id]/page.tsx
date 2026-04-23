"use client";

import { useEffect, useState } from "react";
import InvoiceDetail from "@/components/InvoiceDetail";
import styled from "styled-components";
import { getInvoiceById } from "@/lib/localStorage";
import { Invoice } from "@/types/invoice";

type Props = {
  params: {
    id: string;
  };
};

const PageContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export default function InvoicePage({ params }: Props) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoice = async () => {
      const { id } = params;
      const foundInvoice = getInvoiceById(id);
      setInvoice(foundInvoice);
      setLoading(false);
    };

    loadInvoice();
  }, [params]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
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
    <PageContainer>
      <InvoiceDetail invoice={invoice} />
    </PageContainer>
  );
}