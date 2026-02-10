
export interface Customer {
  id: string;
  name: string;
  cpfCnpj: string;
}

export interface Payment {
  id: string;
  description: string;
  value: number;
  netValue: number;
  dueDate: string;
  status: string;
  invoiceUrl: string;
  bankSlipUrl: string | null;
}

export interface BoletosResponse {
  customer: Customer;
  pending: Payment[];
  paid: Payment[];
}

export enum PaymentStatus {
  RECEIVED = 'RECEIVED',
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
}
