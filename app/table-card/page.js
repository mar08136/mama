import TableCard from '../../components/qr/TableCard';

export const metadata = {
  title: 'Printable table card',
  description: "Print-ready QR menu card for Mama's Kitchen tables.",
  robots: { index: false, follow: false },
};

export default function TableCardPage() {
  return <TableCard />;
}
