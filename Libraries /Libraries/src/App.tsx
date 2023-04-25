import { Suspense } from 'react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NotificationAlert } from 'src/components/alerts/NotificationAlert';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import MultiStepForm from 'src/components/multistep_form/MultiStepForm';
import { InvoicesContextProvider } from 'src/contexts/context/InvoicesContext';
import { AuthProvider } from 'src/contexts/context/LoginAuthContext';
import { NotificationProvider } from 'src/contexts/context/NotificationContext';
import { ThemeProvider } from 'src/contexts/context/ThemeContext';

import { AsideMenu } from './components/aside_menu/AsideMenu';
import { ClientDetails } from './components/clients_form/card/ClientDetails';
import { EditUser } from './components/clients_form/edit_user/Edit';
import AddUserForm from './components/clients_form/form/AddUserForm';
import { OrdersForm } from './components/clients_form/form/OrdersForm';
import { OrderDetails } from './components/orders/OrderDetails';
import { ProtectProvider } from './contexts/context/ProtectedProvider';

import './App.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 50_000,
    },
  },
});

const FakeLogin = React.lazy(() => import('./components/login/FakeLogin'));
const FakeRegister = React.lazy(() => import('./components/register/FakeRegister'));
const Orders = React.lazy(() => import('./components/pages/Orders/Orders'));
const Posts = React.lazy(() => import('./components/pages/Posts'));
const Invoices = React.lazy(() => import('./components/pages/Invoices'));
const Clients = React.lazy(() => import('./components/pages/Clients'));

const App = () => (
  <>
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              {<ReactQueryDevtools position='bottom-right' initialIsOpen={false} />}
              <Suspense fallback={<h1>Loading...</h1>}>
                <InvoicesContextProvider>
                  <BrowserRouter>
                    <AsideMenu />
                    <NotificationAlert />
                    <Routes>
                      <Route path='/' element={<FakeLogin />} />
                      <Route path='/clients'>
                        <Route index element={<Clients />} />
                        <Route path='add' element={<AddUserForm />} />
                        <Route path=':clientId'>
                          <Route index element={<ClientDetails />} />
                          <Route path='edit' element={<EditUser />} />
                        </Route>
                      </Route>
                      <Route path='/orders'>
                        <Route index element={<Orders />} />
                        <Route path='add' element={<OrdersForm />} />

                        <Route path=':orderId' element={<OrderDetails />} />
                      </Route>
                      <Route path='/register' element={<FakeRegister />} />

                      <Route path='/invoices'>
                        <Route
                          index
                          element={
                            <ProtectProvider>
                              <Invoices />
                            </ProtectProvider>
                          }
                        />
                        <Route path='add' element={<MultiStepForm />} />
                      </Route>

                      <Route path='/posts' element={<Posts />} />
                      <Route path='*' element={<div className='page'>404 - Not Found</div>} />
                    </Routes>
                  </BrowserRouter>
                </InvoicesContextProvider>
              </Suspense>
            </QueryClientProvider>
          </ErrorBoundary>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  </>
);

export default App;
