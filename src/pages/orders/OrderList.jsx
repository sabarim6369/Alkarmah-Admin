import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { 
  FiPackage, 
  FiFilter, 
  FiDownload,
  FiEye,
  FiTruck,
  FiX,
  FiAlertCircle
} from 'react-icons/fi'
import PageHeader from '../../components/ui/PageHeader'
import SearchFilter from '../../components/ui/SearchFilter'
import EmptyState from '../../components/ui/EmptyState'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const OrderList = () => {
  const [searchParams] = useSearchParams()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Get status from URL params
  const statusParam = searchParams.get('status')
  
  // Sample order data (in a real app, this would come from an API)
  useEffect(() => {
    const sampleOrders = [
      {
        id: 'ORD-1001',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        date: new Date('2025-01-15T14:30:00'),
        total: 129.99,
        items: 3,
        status: 'Delivered',
        payment: 'Credit Card',
        fulfillment: 'Shipped',
      },
      {
        id: 'ORD-1002',
        customer: 'Jane Smith',
        email: 'jane.smith@example.com',
        date: new Date('2025-01-14T10:15:00'),
        total: 89.95,
        items: 2,
        status: 'Processing',
        payment: 'PayPal',
        fulfillment: 'Pending',
      },
      {
        id: 'ORD-1003',
        customer: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        date: new Date('2025-01-14T09:45:00'),
        total: 246.50,
        items: 5,
        status: 'Shipped',
        payment: 'Credit Card',
        fulfillment: 'Shipped',
      },
      {
        id: 'ORD-1004',
        customer: 'Emily Davis',
        email: 'emily.davis@example.com',
        date: new Date('2025-01-13T16:20:00'),
        total: 59.99,
        items: 1,
        status: 'Pending',
        payment: 'Awaiting Payment',
        fulfillment: 'Not Fulfilled',
      },
      {
        id: 'ORD-1005',
        customer: 'Michael Brown',
        email: 'michael.brown@example.com',
        date: new Date('2025-01-12T11:05:00'),
        total: 179.95,
        items: 4,
        status: 'Delivered',
        payment: 'Credit Card',
        fulfillment: 'Shipped',
      },
      {
        id: 'ORD-1006',
        customer: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        date: new Date('2025-01-11T15:30:00'),
        total: 119.90,
        items: 2,
        status: 'Cancelled',
        payment: 'Refunded',
        fulfillment: 'Cancelled',
      },
      {
        id: 'ORD-1007',
        customer: 'David Martinez',
        email: 'david.martinez@example.com',
        date: new Date('2025-01-10T09:10:00'),
        total: 345.50,
        items: 7,
        status: 'Delivered',
        payment: 'Credit Card',
        fulfillment: 'Shipped',
      },
      {
        id: 'ORD-1008',
        customer: 'Amanda Lee',
        email: 'amanda.lee@example.com',
        date: new Date('2025-01-09T14:25:00'),
        total: 79.99,
        items: 2,
        status: 'Processing',
        payment: 'PayPal',
        fulfillment: 'Pending',
      },
      {
        id: 'ORD-1009',
        customer: 'James Wilson',
        email: 'james.wilson@example.com',
        date: new Date('2025-01-08T10:40:00'),
        total: 199.95,
        items: 1,
        status: 'Shipped',
        payment: 'Credit Card',
        fulfillment: 'Shipped',
      },
      {
        id: 'ORD-1010',
        customer: 'Lisa Taylor',
        email: 'lisa.taylor@example.com',
        date: new Date('2025-01-07T13:15:00'),
        total: 149.99,
        items: 3,
        status: 'Delivered',
        payment: 'Debit Card',
        fulfillment: 'Shipped',
      }
    ]
    
    // Filter by status if provided in URL
    let filteredByStatus = sampleOrders
    if (statusParam) {
      const status = statusParam.charAt(0).toUpperCase() + statusParam.slice(1)
      filteredByStatus = sampleOrders.filter(order => order.status.toLowerCase() === statusParam.toLowerCase())
    }
    
    // Simulate API call
    setTimeout(() => {
      setOrders(sampleOrders)
      setFilteredOrders(filteredByStatus)
      setIsLoading(false)
    }, 800)
  }, [statusParam])
  
  // Handle search and filter
  const handleSearch = (query, filters) => {
    let results = [...orders]
    
    // Search by order ID or customer name
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(order => 
        order.id.toLowerCase().includes(lowerQuery) || 
        order.customer.toLowerCase().includes(lowerQuery) ||
        order.email.toLowerCase().includes(lowerQuery)
      )
    }
    
    // Apply filters
    if (filters.status) {
      results = results.filter(order => order.status === filters.status)
    }
    
    if (filters.payment) {
      results = results.filter(order => order.payment === filters.payment)
    }
    
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      results = results.filter(order => new Date(order.date) >= fromDate)
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      toDate.setHours(23, 59, 59, 999) // End of the day
      results = results.filter(order => new Date(order.date) <= toDate)
    }
    
    if (filters.minTotal) {
      results = results.filter(order => order.total >= parseFloat(filters.minTotal))
    }
    
    if (filters.maxTotal) {
      results = results.filter(order => order.total <= parseFloat(filters.maxTotal))
    }
    
    setFilteredOrders(results)
  }
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id))
    }
    setSelectAll(!selectAll)
  }
  
  // Handle individual select
  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
      setSelectAll(false)
    } else {
      setSelectedOrders([...selectedOrders, orderId])
      // Check if all orders are now selected
      if (selectedOrders.length + 1 === filteredOrders.length) {
        setSelectAll(true)
      }
    }
  }
  
  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedOrders.length === 0) {
      toast.error('No orders selected')
      return
    }
    
    // In a real app, this would make an API call
    let message = ''
    let newStatus = ''
    
    if (action === 'process') {
      newStatus = 'Processing'
      message = `${selectedOrders.length} orders marked as processing`
    } else if (action === 'ship') {
      newStatus = 'Shipped'
      message = `${selectedOrders.length} orders marked as shipped`
    } else if (action === 'deliver') {
      newStatus = 'Delivered'
      message = `${selectedOrders.length} orders marked as delivered`
    } else if (action === 'cancel') {
      newStatus = 'Cancelled'
      message = `${selectedOrders.length} orders cancelled`
    } else if (action === 'export') {
      // Handle export logic
      message = `${selectedOrders.length} orders exported`
      toast.success(message)
      setSelectedOrders([])
      setSelectAll(false)
      return
    }
    
    // Update status in both arrays
    if (newStatus) {
      const updateOrders = (orderList) => {
        return orderList.map(order => {
          if (selectedOrders.includes(order.id)) {
            return { ...order, status: newStatus }
          }
          return order
        })
      }
      
      setOrders(updateOrders(orders))
      setFilteredOrders(updateOrders(filteredOrders))
      toast.success(message)
    }
    
    setSelectedOrders([])
    setSelectAll(false)
  }
  
  // Filter configurations
  const filterOptions = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Pending', label: 'Pending' },
        { value: 'Processing', label: 'Processing' },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Delivered', label: 'Delivered' },
        { value: 'Cancelled', label: 'Cancelled' },
      ]
    },
    {
      name: 'payment',
      label: 'Payment Status',
      type: 'select',
      options: [
        { value: 'Credit Card', label: 'Credit Card' },
        { value: 'PayPal', label: 'PayPal' },
        { value: 'Debit Card', label: 'Debit Card' },
        { value: 'Awaiting Payment', label: 'Awaiting Payment' },
        { value: 'Refunded', label: 'Refunded' },
      ]
    },
    {
      name: 'dateFrom',
      label: 'Date From',
      type: 'date',
    },
    {
      name: 'dateTo',
      label: 'Date To',
      type: 'date',
    },
    {
      name: 'minTotal',
      label: 'Min Total',
      type: 'number',
      placeholder: '0.00',
    },
    {
      name: 'maxTotal',
      label: 'Max Total',
      type: 'number',
      placeholder: '1000.00',
    }
  ]
  
  // Status badge color mapping
  const statusColors = {
    'Pending': 'badge-warning',
    'Processing': 'badge-info',
    'Shipped': 'badge-info',
    'Delivered': 'badge-success',
    'Cancelled': 'badge-error',
  }
  
  return (
    <div>
      <PageHeader 
        title="Orders"
        subtitle="Manage and process customer orders"
        breadcrumbs={[
          { text: 'Dashboard', link: '/' },
          { text: 'Orders' }
        ]}
        actionButton={
          <button 
            onClick={() => handleBulkAction('export')}
            className="btn btn-secondary inline-flex items-center"
          >
            <FiDownload className="mr-2 h-5 w-5" />
            Export Orders
          </button>
        }
      />
      
      {/* Status Tabs */}
      <div className="flex mb-6 overflow-x-auto pb-2">
        <Link 
          to="/orders"
          className={`whitespace-nowrap px-4 py-2 border-b-2 text-sm font-medium ${
            !statusParam 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          All Orders
        </Link>
        <Link 
          to="/orders?status=pending"
          className={`whitespace-nowrap px-4 py-2 border-b-2 text-sm font-medium ${
            statusParam === 'pending' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Pending
        </Link>
        <Link 
          to="/orders?status=processing"
          className={`whitespace-nowrap px-4 py-2 border-b-2 text-sm font-medium ${
            statusParam === 'processing' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Processing
        </Link>
        <Link 
          to="/orders?status=shipped"
          className={`whitespace-nowrap px-4 py-2 border-b-2 text-sm font-medium ${
            statusParam === 'shipped' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Shipped
        </Link>
        <Link 
          to="/orders?status=delivered"
          className={`whitespace-nowrap px-4 py-2 border-b-2 text-sm font-medium ${
            statusParam === 'delivered' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Delivered
        </Link>
        <Link 
          to="/orders?status=cancelled"
          className={`whitespace-nowrap px-4 py-2 border-b-2 text-sm font-medium ${
            statusParam === 'cancelled' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Cancelled
        </Link>
      </div>
      
      {/* Search & Filters */}
      <div className="card mb-6">
        <SearchFilter 
          onSearch={handleSearch}
          placeholder="Search orders by ID, customer name, or email..."
          filters={filterOptions}
        />
      </div>
      
      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center mb-4 p-3 bg-primary-50 rounded-md animate-fade-in">
          <span className="text-sm font-medium text-primary-700 mr-4">
            {selectedOrders.length} orders selected
          </span>
          <div className="space-x-2">
            <button 
              onClick={() => handleBulkAction('process')}
              className="btn btn-warning text-sm py-1"
            >
              Process
            </button>
            <button 
              onClick={() => handleBulkAction('ship')}
              className="btn btn-info text-sm py-1"
            >
              <FiTruck className="mr-1 h-4 w-4" />
              Ship
            </button>
            <button 
              onClick={() => handleBulkAction('deliver')}
              className="btn btn-success text-sm py-1"
            >
              Mark Delivered
            </button>
            <button 
              onClick={() => handleBulkAction('cancel')}
              className="btn btn-danger text-sm py-1"
            >
              <FiX className="mr-1 h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Orders List */}
      <div className="card">
        {isLoading ? (
          // Loading State
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded mb-2"></div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          // Empty State
          <EmptyState 
            title="No orders found"
            description={
              statusParam 
                ? `No ${statusParam} orders found. They will appear here once customers place orders with this status.` 
                : "No orders found. They will appear here once customers place orders."
            }
            icon={<FiPackage className="h-8 w-8" />}
          />
        ) : (
          // Orders Table
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3 text-center">Items</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/orders/${order.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{format(order.date, 'MMM dd, yyyy')}</p>
                        <p className="text-xs text-gray-500">{format(order.date, 'hh:mm a')}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm text-center">
                      {order.items}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`badge ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {order.payment}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium">
                      <Link to={`/orders/${order.id}`} className="text-primary-600 hover:text-primary-900">
                        <FiEye className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="py-3 px-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{" "}
                  <span className="font-medium">{orders.length}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="btn btn-secondary py-1"
                  disabled
                >
                  Previous
                </button>
                <button
                  className="btn btn-secondary py-1"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderList