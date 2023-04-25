import { Order } from 'src/api/orders';
export type InitialData = {
  dateFrom: string;
  dateTo: string;
  name: string;
  orders: Order[];
  phoneNumber: string;
  postalCode: string;
  price: string;
  street: string;
  subRegion: string;
  surname: string;
  town: string;
};

export type OrderContextMultiStepFormType = {
  handleButtonAdd: (e: React.SyntheticEvent, id: string | number) => void;
  invoiceArray: Order[];
  orderData: Order[] | null;
};

export type UpdateTypes = {
  updateForm: (inputField: Partial<InitialData>) => void;
};
