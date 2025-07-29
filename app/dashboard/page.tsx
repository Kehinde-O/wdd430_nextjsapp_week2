import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { customers, invoices, revenue } from '@/app/lib/placeholder-data';
import { formatCurrency } from '@/app/lib/utils';

function getCardData() {
  const numberOfCustomers = customers.length;
  const numberOfInvoices = invoices.length;
  const totalPaidInvoices = formatCurrency(
    invoices.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
  );
  const totalPendingInvoices = formatCurrency(
    invoices.filter((inv) => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0)
  );
  return { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices };
}

function getLatestInvoices() {
  // Get the 5 most recent invoices, join with customer data
  return invoices
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((inv, i) => {
      const customer = customers.find((c) => c.id === inv.customer_id);
      return {
        id: `${i}`,
        name: customer?.name || 'Unknown',
        image_url: customer?.image_url || '',
        email: customer?.email || '',
        amount: formatCurrency(inv.amount),
      };
    });
}

export default function Page() {
  return <p>Dashboard Page</p>;
} 