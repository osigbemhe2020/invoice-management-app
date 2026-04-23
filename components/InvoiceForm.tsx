import React from 'react'
import styled from 'styled-components'
import colors from '@/lib/constants/colors'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Invoice, InvoiceItem, BillFrom, BillTo } from '@/types/invoice'

interface FormValues {
  id: string;
  status: 'Draft' | 'Pending' | 'Paid';
  companyName: string;
  invoiceDate: string;
  paymentDue: string;
  paymentTerms: string;
  billFrom: BillFrom;
  billTo: BillTo;
  sentTo: string;
  items: InvoiceItem[];
  projectDescription: string;
}

// Validation Schema
const InvoiceSchema = Yup.object().shape({
  id: Yup.string().required('Invoice ID is required'),
  status: Yup.mixed<'Draft' | 'Pending' | 'Paid'>().oneOf(['Draft', 'Pending', 'Paid']).required('Status is required'),
  companyName: Yup.string().required('Company name is required'),
  invoiceDate: Yup.string().required('Invoice date is required'),
  paymentDue: Yup.string().required('Payment due date is required'),
  paymentTerms: Yup.string().required('Payment terms are required'),
  billFrom: Yup.object().shape({
    address: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    postcode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
  }),
  billTo: Yup.object().shape({
    name: Yup.string().required('Client name is required'),
    address: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    postcode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
  }),
  sentTo: Yup.string().email('Invalid email').required('Client email is required'),
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Item name is required'),
      qty: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
      price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
      total: Yup.number().required('Total is required'),
    })
  ).min(1, 'At least one item is required'),
  projectDescription: Yup.string().required('Project description is required'),
});

interface InvoiceFormProps {
  invoice: Invoice;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

// Styled Components

// Component
function InvoiceFormComponent({ invoice, onSubmit, onCancel, mode }: InvoiceFormProps) {
  const initialValues: FormValues = {
    id: invoice.id,
    status: invoice.status,
    companyName: invoice.companyName,
    invoiceDate: invoice.invoiceDate,
    paymentDue: invoice.paymentDue,
    paymentTerms: 'Net 30 Days',
    billFrom: invoice.from,
    billTo: invoice.billTo,
    sentTo: invoice.sentTo,
    items: invoice.items,
    projectDescription: invoice.companyName,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={InvoiceSchema}
      onSubmit={(values, { setSubmitting }) => {
        const updatedItems = values.items.map(item => ({
          ...item,
          total: item.qty * item.price
        }));
        onSubmit({ ...values, items: updatedItems });
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <InvoiceForm>
          <FormHeader>
            <FormTitle>
              {mode === 'edit' ? `Edit #${values.id}` : `New Invoice`}
            </FormTitle>
          </FormHeader>

          <FormContent>
            {/* Bill From Section */}
            <FormSection>
              <SectionTitle>Bill From</SectionTitle>
              <FormGroup>
                <FormLabel>Street Address</FormLabel>
                <Field name="billFrom.address" as={FormInput} />
                <ErrorMessage name="billFrom.address" component={ErrorText} />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <FormLabel>City</FormLabel>
                  <Field name="billFrom.city" as={FormInput} />
                  <ErrorMessage name="billFrom.city" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Postal Code</FormLabel>
                  <Field name="billFrom.postcode" as={FormInput} />
                  <ErrorMessage name="billFrom.postcode" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Country</FormLabel>
                  <Field name="billFrom.country" as={FormInput} />
                  <ErrorMessage name="billFrom.country" component={ErrorText} />
                </FormGroup>
              </FormRow>
            </FormSection>

            {/* Bill To Section */}
            <FormSection>
              <SectionTitle>Bill To</SectionTitle>
              <FormGroup>
                <FormLabel>Client's Name</FormLabel>
                <Field name="billTo.name" as={FormInput} />
                <ErrorMessage name="billTo.name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <FormLabel>Client's Email</FormLabel>
                <Field name="sentTo" type="email" as={FormInput} />
                <ErrorMessage name="sentTo" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <FormLabel>Street Address</FormLabel>
                <Field name="billTo.address" as={FormInput} />
                <ErrorMessage name="billTo.address" component={ErrorText} />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <FormLabel>City</FormLabel>
                  <Field name="billTo.city" as={FormInput} />
                  <ErrorMessage name="billTo.city" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Postal Code</FormLabel>
                  <Field name="billTo.postcode" as={FormInput} />
                  <ErrorMessage name="billTo.postcode" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Country</FormLabel>
                  <Field name="billTo.country" as={FormInput} />
                  <ErrorMessage name="billTo.country" component={ErrorText} />
                </FormGroup>
              </FormRow>
            </FormSection>

            {/* Invoice Details Section */}
            <FormSection>
              <FormRow>
                <FormGroup>
                  <FormLabel>Invoice Date</FormLabel>
                  <Field name="invoiceDate" as={FormInput} />
                  <ErrorMessage name="invoiceDate" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Payment Terms</FormLabel>
                  <Field name="paymentTerms" as={FormSelect}>
                    <option value="Net 30 Days">Net 30 Days</option>
                    <option value="Net 15 Days">Net 15 Days</option>
                    <option value="Net 60 Days">Net 60 Days</option>
                  </Field>
                  <ErrorMessage name="paymentTerms" component={ErrorText} />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>Project Description</FormLabel>
                <Field name="projectDescription" as={FormInput} />
                <ErrorMessage name="projectDescription" component={ErrorText} />
              </FormGroup>
            </FormSection>

            {/* Item List Section */}
            <FormSection>
              <SectionTitle>Item List</SectionTitle>
              <FieldArray name="items">
                {({ push, remove }) => (
                  <>
                    <ItemsTable>
                      <TableHeader>
                        <ColItemName>Item Name</ColItemName>
                        <ColQty>Qty.</ColQty>
                        <ColPrice>Price</ColPrice>
                        <ColTotal>Total</ColTotal>
                        <ColAction></ColAction>
                      </TableHeader>

                      {values.items.map((item, index) => (
                        <TableRow key={index}>
                          <ColItemName>
                            <Field
                              name={`items.${index}.name`}
                              as={FormInputSmall}
                              placeholder="Item name"
                            />
                            <ErrorMessage name={`items.${index}.name`} component={ErrorText} />
                          </ColItemName>
                          <ColQty>
                            <Field
                              name={`items.${index}.qty`}
                              type="number"
                              as={FormInputSmall}
                              min="1"
                              onChange={(e: any) => {
                                const newQty = parseInt(e.target.value) || 0;
                                setFieldValue(`items.${index}.qty`, newQty);
                              }}
                            />
                            <ErrorMessage name={`items.${index}.qty`} component={ErrorText} />
                          </ColQty>
                          <ColPrice>
                            <Field
                              name={`items.${index}.price`}
                              type="number"
                              as={FormInputSmall}
                              min="0"
                              step="0.01"
                              onChange={(e: any) => {
                                const newPrice = parseFloat(e.target.value) || 0;
                                setFieldValue(`items.${index}.price`, newPrice);
                              }}
                            />
                            <ErrorMessage name={`items.${index}.price`} component={ErrorText} />
                          </ColPrice>
                          <ColTotal>£ {(item.qty * item.price).toFixed(2)}</ColTotal>
                          <ColAction>
                            <DeleteButton
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </DeleteButton>
                          </ColAction>
                        </TableRow>
                      ))}
                    </ItemsTable>

                    <AddItemButton
                      type="button"
                      onClick={() => push({ name: '', qty: 1, price: 0, total: 0 })}
                    >
                      + Add New Item
                    </AddItemButton>
                  </>
                )}
              </FieldArray>
            </FormSection>
          </FormContent>

          <FormActions>
            <Button type="button" variant="cancel" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="submit" disabled={isSubmitting}>
              {mode === 'edit' ? 'Update Invoice' : 'Create Invoice'}
            </Button>
          </FormActions>
        </InvoiceForm>
      )}
    </Formik>
  )
}

export default InvoiceFormComponent

const InvoiceForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px;
  max-width: 600px;
  background: white;
`

const FormHeader = styled.div`
  padding: 36px 24px;
  width: 100%;
  max-width: 530px;
  margin: 13px auto 0;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
`

const FormTitle = styled.h2`
  font-size: 24px;
  line-height: 33px;
  letter-spacing: -0.5px;
  font-weight: 600;
  color: ${colors.blueBlack};
  margin: 0;
`

const FormContent = styled.div`
  max-width: 530px;
  margin: 0 auto;
  padding: 0px 24px;
  overflow-y: auto;
  flex: 1;
`

const FormSection = styled.div`
  margin-bottom: 32px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const FormLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  text-transform: capitalize;
  margin-bottom: 6px;
`

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #1f2937;
  font-family: inherit;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }

  &::placeholder {
    color: #d1d5db;
  }
`

const FormInputSmall = styled(FormInput)`
  font-size: 13px;
  padding: 8px 10px;
`

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #1f2937;
  font-family: inherit;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ItemsTable = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-bottom: 12px;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 40px;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  background: #f3f4f6;
  border-radius: 4px 4px 0 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;

    & > div:nth-child(n+2) {
      display: none;
    }
  }

  & > div {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 40px;
  gap: 12px;
  padding: 12px;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;

    & > .form-input-small:nth-child(n+2) {
      display: none;
    }
  }
`

const ColItemName = styled.div`
  grid-column: 1;
`

const ColQty = styled.div`
  grid-column: 2;
`

const ColPrice = styled.div`
  grid-column: 3;
`

const ColTotal = styled.div`
  grid-column: 4;
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
`

const ColAction = styled.div`
  grid-column: 5;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 4px;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
`

const AddItemButton = styled.button`
  background: none;
  border: none;
  color: #7c3aed;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    color: #6d28d9;
  }
`

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background: #f9fafb;
  border-radius: 0 0 8px 8px;
  justify-content: flex-end;
`

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`

const Button = styled.button<{ variant?: 'cancel' | 'submit' }>`
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  ${props => props.variant === 'cancel' && `
    background: white;
    color: #6b7280;
    border: 1px solid #d1d5db;

    &:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }
  `}

  ${props => props.variant === 'submit' && `
    background: #7c3aed;
    color: white;
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);

    &:hover {
      background: #6d28d9;
      box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`

