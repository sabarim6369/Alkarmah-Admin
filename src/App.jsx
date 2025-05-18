import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/products/ProductList'
import AddProduct from './pages/products/AddProduct'
import EditProduct from './pages/products/EditProduct'
import OrderList from './pages/orders/OrderList'
import OrderDetails from './pages/orders/OrderDetails'
import CustomerList from './pages/customers/CustomerList'
import Settings from './pages/settings/Settings'
import Help from './pages/help/Help'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="orders">
          <Route index element={<OrderList />} />
          <Route path=":id" element={<OrderDetails />} />
        </Route>
        <Route path="customers" element={<CustomerList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App