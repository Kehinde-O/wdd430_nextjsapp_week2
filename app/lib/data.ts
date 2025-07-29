import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

// Mock data for demonstration
const mockRevenue: Revenue[] = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const mockLatestInvoices: LatestInvoiceRaw[] = [
  {
    id: '1',
    amount: 2000,
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '2',
    amount: 1800,
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3',
    amount: 2200,
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '4',
    amount: 2500,
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '5',
    amount: 2300,
    name: 'Sofia Davis',
    email: 'sofia@davis.com',
    image_url: '/customers/sofia-davis.png',
  },
];

// Mock invoices data for search and pagination
const mockInvoices: InvoicesTable[] = [
  {
    id: '1',
    customer_id: '1',
    amount: 2000,
    date: '2024-01-15',
    status: 'paid',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '2',
    customer_id: '2',
    amount: 1800,
    date: '2024-01-20',
    status: 'pending',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3',
    customer_id: '3',
    amount: 2200,
    date: '2024-02-01',
    status: 'paid',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '4',
    customer_id: '4',
    amount: 2500,
    date: '2024-02-05',
    status: 'pending',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '5',
    customer_id: '5',
    amount: 2300,
    date: '2024-02-10',
    status: 'paid',
    name: 'Sofia Davis',
    email: 'sofia@davis.com',
    image_url: '/customers/sofia-davis.png',
  },
  {
    id: '6',
    customer_id: '6',
    amount: 2800,
    date: '2024-02-15',
    status: 'pending',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '7',
    customer_id: '7',
    amount: 3200,
    date: '2024-02-20',
    status: 'paid',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
  {
    id: '8',
    customer_id: '8',
    amount: 1900,
    date: '2024-02-25',
    status: 'pending',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: '9',
    customer_id: '9',
    amount: 2400,
    date: '2024-03-01',
    status: 'paid',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '10',
    customer_id: '10',
    amount: 2600,
    date: '2024-03-05',
    status: 'pending',
    name: 'Emma Wilson',
    email: 'emma@wilson.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '11',
    customer_id: '11',
    amount: 2100,
    date: '2024-03-10',
    status: 'paid',
    name: 'John Smith',
    email: 'john@smith.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '12',
    customer_id: '12',
    amount: 2900,
    date: '2024-03-15',
    status: 'pending',
    name: 'Sarah Johnson',
    email: 'sarah@johnson.com',
    image_url: '/customers/hector-simpson.png',
  },
];

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // const data = await sql<Revenue[]>`SELECT * FROM revenue`;
    const data = mockRevenue;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    // const data = await sql<LatestInvoiceRaw[]>`
    //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   ORDER BY invoices.date DESC
    //   LIMIT 5`;

    const data = mockLatestInvoices;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    // const data = await Promise.all([
    //   invoiceCountPromise,
    //   customerCountPromise,
    //   invoiceStatusPromise,
    // ]);

    // Mock data
    const numberOfInvoices = 12;
    const numberOfCustomers = 8;
    const totalPaidInvoices = formatCurrency(22000);
    const totalPendingInvoices = formatCurrency(12000);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Filter invoices based on query
    const filteredInvoices = mockInvoices.filter((invoice) => {
      const searchTerm = query.toLowerCase();
      return (
        invoice.name.toLowerCase().includes(searchTerm) ||
        invoice.email.toLowerCase().includes(searchTerm) ||
        invoice.amount.toString().includes(searchTerm) ||
        invoice.date.includes(searchTerm) ||
        invoice.status.toLowerCase().includes(searchTerm)
      );
    });

    // Sort by date descending
    const sortedInvoices = filteredInvoices.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Apply pagination
    const paginatedInvoices = sortedInvoices.slice(offset, offset + ITEMS_PER_PAGE);

    return paginatedInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    // Filter invoices based on query
    const filteredInvoices = mockInvoices.filter((invoice) => {
      const searchTerm = query.toLowerCase();
      return (
        invoice.name.toLowerCase().includes(searchTerm) ||
        invoice.email.toLowerCase().includes(searchTerm) ||
        invoice.amount.toString().includes(searchTerm) ||
        invoice.date.includes(searchTerm) ||
        invoice.status.toLowerCase().includes(searchTerm)
      );
    });

    const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = mockInvoices.find((invoice) => invoice.id === id);

    console.log(data); // Invoice is an empty array []
    
    if (!data) {
      throw new Error('Invoice not found.');
    }

    const invoice = {
      ...data,
      // Convert amount from cents to dollars
      amount: data.amount / 100,
    };

    return invoice;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    // Mock customers data
    const customers: CustomerField[] = [
      { id: '1', name: 'Delba de Oliveira' },
      { id: '2', name: 'Lee Robinson' },
      { id: '3', name: 'Hector Simpson' },
      { id: '4', name: 'Steven Tey' },
      { id: '5', name: 'Sofia Davis' },
      { id: '6', name: 'Amy Burns' },
      { id: '7', name: 'Balazs Orban' },
      { id: '8', name: 'Michael Novotny' },
      { id: '9', name: 'Evil Rabbit' },
      { id: '10', name: 'Emma Wilson' },
      { id: '11', name: 'John Smith' },
      { id: '12', name: 'Sarah Johnson' },
    ];

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    // Mock customers data with invoice counts
    const mockCustomers: CustomersTableType[] = [
      {
        id: '1',
        name: 'Delba de Oliveira',
        email: 'delba@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
        total_invoices: 2,
        total_pending: 0,
        total_paid: 2000,
      },
      {
        id: '2',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
        total_invoices: 2,
        total_pending: 1800,
        total_paid: 0,
      },
      {
        id: '3',
        name: 'Hector Simpson',
        email: 'hector@simpson.com',
        image_url: '/customers/hector-simpson.png',
        total_invoices: 2,
        total_pending: 0,
        total_paid: 2200,
      },
      {
        id: '4',
        name: 'Steven Tey',
        email: 'steven@tey.com',
        image_url: '/customers/steven-tey.png',
        total_invoices: 2,
        total_pending: 2500,
        total_paid: 0,
      },
      {
        id: '5',
        name: 'Sofia Davis',
        email: 'sofia@davis.com',
        image_url: '/customers/sofia-davis.png',
        total_invoices: 2,
        total_pending: 0,
        total_paid: 2300,
      },
      {
        id: '6',
        name: 'Amy Burns',
        email: 'amy@burns.com',
        image_url: '/customers/amy-burns.png',
        total_invoices: 2,
        total_pending: 2800,
        total_paid: 0,
      },
      {
        id: '7',
        name: 'Balazs Orban',
        email: 'balazs@orban.com',
        image_url: '/customers/balazs-orban.png',
        total_invoices: 2,
        total_pending: 0,
        total_paid: 3200,
      },
      {
        id: '8',
        name: 'Michael Novotny',
        email: 'michael@novotny.com',
        image_url: '/customers/michael-novotny.png',
        total_invoices: 2,
        total_pending: 1900,
        total_paid: 0,
      },
    ];

    // Filter customers based on query
    const filteredCustomers = mockCustomers.filter((customer) => {
      const searchTerm = query.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
      );
    });

    const customers = filteredCustomers.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
