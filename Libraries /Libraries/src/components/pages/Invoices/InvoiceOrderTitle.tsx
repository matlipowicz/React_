import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/redux/store/Money';

export function InvoiceOrderTitle() {
  const invoices = useAppSelector((state) => state.order);
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginBottom: '30px',
        }}
      >
        <p>Go to order details</p>
        {invoices.map((order) => (
          <Link to={`/orders/${order.id}`} key={order.id}>
            {order.title}
          </Link>
        ))}
      </div>
    </>
  );
}
