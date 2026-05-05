export type LiveReservationRow = {
  id: string;
  type: string;
  status: string;
  guests: number;
  totalAmount: number;
  paidAmount: number;
  updatedAt: string;
  createdAt: string;
  customer: { id: string; name: string; phone: string; email: string };
  event: { id: string; date: string; shift: string } | null;

  venue: { id: string; name: string } | null;
};
