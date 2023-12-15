/* eslint-disable no-undef */
import { useState } from 'react';
import Layout from './Components/Layout'
import tabs from './Components/Tabs';
/* import { AnimatePresence,motion } from 'framer-motion' */
import UsersPage from './Components/Pages/UsersPage'
import ProductsPage from './Components/Pages/ProductsPage'
import OrdersPage from './Components/Pages/OrdersPage'
import HomePage from './Components/Pages/HomePage'

function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isVisible, setIsVisible] = useState(true);
  return(
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} setIsVisible={setIsVisible}>
      {isVisible == true && activeTab == "home" && (
        <HomePage></HomePage>
      )}
      {isVisible == true && activeTab == "users" && (
        <UsersPage></UsersPage>
      )}
      {isVisible == true && activeTab == "products" && (
        <ProductsPage></ProductsPage>
      )}
      {isVisible == true && activeTab == "orders" && (
        <OrdersPage></OrdersPage>
      )}
      </Layout>
    </>
  )
}

export default App
