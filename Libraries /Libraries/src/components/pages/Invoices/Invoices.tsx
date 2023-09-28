import { Link } from 'react-router-dom';

import { InvoiceOrderTitle } from './InvoiceOrderTitle';
import { PayOrders } from './PayOrders';

const Invoices = () => (
  <div className='page' style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
    <InvoiceOrderTitle />
    <Link to='add'>Add invoice</Link>
    <PayOrders />
  </div>
);

export default Invoices;
