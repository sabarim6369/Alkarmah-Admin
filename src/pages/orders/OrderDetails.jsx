import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  FiChevronLeft,
  FiPrinter,
  FiMail,
  FiPackage,
  FiTruck,
  FiCheck,
  FiX,
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiCreditCard
} from 'react-icons/fi'
import PageHeader from '../../components/ui/PageHeader'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState(null)
  
  // Fetch order data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data for the order
      const mockOrder = {
        id: id,
        number: id.replace('ORD-', ''),
        customer: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567'
        },
        date: new Date('2025-01-15T14:30:00'),
        status: 'Processing',
        payment: {
          method: 'Credit Card',
          status: 'Paid',
          cardLast4: '4242',
          transactionId: 'txn_1J2s3K4L5M6N7O8P',
          amount: 129.99,
          date: new Date('2025-01-15T14:32:00')
        },
        shipping: {
          method: 'Standard Shipping',
          cost: 5.99,
          address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            postalCode: '12345',
            country: 'United States'
          },
          status: 'Pending',
          trackingNumber: '',
          estimatedDelivery: null
        },
        items: [
          {
            id: 'P1001',
            name: 'Wireless Noise-Cancelling Headphones',
            sku: 'WNCH-001',
            price: 89.99,
            quantity: 1,
            total: 89.99,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 'P1028',
            name: 'Smartphone Fast Charger',
            sku: 'CHAR-002',
            price: 19.99,
            quantity: 1,
            total: 19.99,
            image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 'P1005',
            name: 'Premium Phone Case',
            sku: 'CASE-001',
            price: 14.99,
            quantity: 1,
            total: 14.99,
            image: 'https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
        ],
        subtotal: 124.97,
        tax: 10.42,
        total: 141.38,
        notes: '',
        history: [
          {
            action: 'Order Placed',
            date: new Date('2025-01-15T14:30:00'),
            status: 'Order received'
          },
          {
            action: 'Payment Received',
            date: new Date('2025-01-15T14:32:00'),
            status: 'Payment confirmed'
          },
          {
            action: 'Processing',
            date: new Date('2025-01-15T14:45:00'),
            status: 'Order being processed'
          }
        ]
      }
      
      setOrder(mockOrder)
      setIsLoading(false)
    }, 800)
  }, [id])
  
  // Handle status update
  const handleStatusUpdate = (newStatus) => {
    // In a real app, this would be an API call
    
    // Update local state
    setOrder(prevOrder => {
      const updatedOrder = { 
        ...prevOrder, 
        status: newStatus,
        history: [
          ...prevOrder.history,
          {
            action: newStatus,
            date: new Date(),
            status: `Order ${newStatus.toLowerCase()}`
          }
        ]
      }
      
      // Update shipping info if status is Shipped
      if (newStatus === 'Shipped') {
        updatedOrder.shipping.status = 'Shipped'
        updatedOrder.shipping.trackingNumber = 'TRK' + Math.floor(Math.random() * 10000000)
        
        // Set estimated delivery to 3-5 days from now
        const deliveryDate = new Date()
        deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3))
        updatedOrder.shipping.estimatedDelivery = deliveryDate
      } else if (newStatus === 'Delivered') {
        updatedOrder.shipping.status = 'Delivered'
      } else if (newStatus === 'Cancelled') {
        updatedOrder.shipping.status = 'Cancelled'
      }
      
      return updatedOrder
    })
    
    // Show success message
    toast.success(`Order status updated to ${newStatus}`)
  }
  
  // Handle send notification
  const handleSendNotification = () => {
    // In a real app, this would be an API call
    toast.success(`Notification sent to ${order.customer.email}`)
  }
  
  // Handle cancel order
  const handleCancelOrder = () => {
    // In a real app, this would be an API call
    handleStatusUpdate('Cancelled')
  }
  
  // Status badge color mapping
  const statusColors = {
    'Pending': 'badge-warning',
    'Processing': 'badge-info',
    'Shipped': 'badge-primary',
    'Delivered': 'badge-success',
    'Cancelled': 'badge-error',
  }
  
  // Loading UI
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="card">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
        <p className="text-gray-500 mt-2">The order you're looking for doesn't exist or has been removed.</p>
        <Link to="/orders" className="btn btn-primary mt-4 inline-flex items-center">
          <FiChevronLeft className="mr-2 h-5 w-5" />
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title={`Order ${order.id}`}
        breadcrumbs={[
          { text: 'Dashboard', link: '/' },
          { text: 'Orders', link: '/orders' },
          { text: order.id }
        ]}
        actionButton={
          <div className="flex flex-wrap gap-2">
            <Link to="/orders" className="btn btn-secondary inline-flex items-center">
              <FiChevronLeft className="mr-2 h-5 w-5" />
              Back to Orders
            </Link>
            <button 
              onClick={() => window.print()}
              className="btn btn-secondary inline-flex items-center"
            >
              <FiPrinter className="mr-2 h-5 w-5" />
              Print
            </button>
          </div>
        }
      />
      
      {/* Order Status Banner */}
      <div className={`mb-6 rounded-lg p-4 ${
        order.status === 'Pending' ? 'bg-amber-50 border border-amber-200 text-amber-800' :
        order.status === 'Processing' ? 'bg-blue-50 border border-blue-200 text-blue-800' :
        order.status === 'Shipped' ? 'bg-primary-50 border border-primary-200 text-primary-800' :
        order.status === 'Delivered' ? 'bg-green-50 border border-green-200 text-green-800' :
        'bg-red-50 border border-red-200 text-red-800'
      }`}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${
              order.status === 'Pending' ? 'bg-amber-500' :
              order.status === 'Processing' ? 'bg-blue-500' :
              order.status === 'Shipped' ? 'bg-primary-500' :
              order.status === 'Delivered' ? 'bg-green-500' :
              'bg-red-500'
            }`}></span>
            <span className="font-medium">Status: {order.status}</span>
            {order.shipping.trackingNumber && (
              <span className="ml-4 text-sm">
                Tracking: <span className="font-medium">{order.shipping.trackingNumber}</span>
              </span>
            )}
            {order.shipping.estimatedDelivery && (
              <span className="ml-4 text-sm">
                Est. Delivery: <span className="font-medium">{format(order.shipping.estimatedDelivery, 'MMM dd, yyyy')}</span>
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
              <>
                <div className="flex gap-2">
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleStatusUpdate('Processing')}
                      className="btn btn-warning text-sm py-1.5"
                    >
                      <FiPackage className="mr-1 h-4 w-4" />
                      Process
                    </button>
                  )}
                  
                  {(order.status === 'Pending' || order.status === 'Processing') && (
                    <button
                      onClick={() => handleStatusUpdate('Shipped')}
                      className="btn btn-primary text-sm py-1.5"
                    >
                      <FiTruck className="mr-1 h-4 w-4" />
                      Ship
                    </button>
                  )}
                  
                  {(order.status === 'Pending' || order.status === 'Processing' || order.status === 'Shipped') && (
                    <button
                      onClick={() => handleStatusUpdate('Delivered')}
                      className="btn btn-success text-sm py-1.5"
                    >
                      <FiCheck className="mr-1 h-4 w-4" />
                      Mark Delivered
                    </button>
                  )}
                </div>
                
                <button
                  onClick={handleCancelOrder}
                  className="btn btn-danger text-sm py-1.5"
                >
                  <FiX className="mr-1 h-4 w-4" />
                  Cancel Order
                </button>
              </>
            )}
            
            <button
              onClick={handleSendNotification}
              className="btn btn-secondary text-sm py-1.5"
            >
              <FiMail className="mr-1 h-4 w-4" />
              Notify Customer
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Order Items & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <Link 
                      to={`/products/edit/${item.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                    <div className="flex flex-wrap gap-x-4 text-xs text-gray-500 mt-1">
                      <span>SKU: {item.sku}</span>
                      <span>Price: ${item.price.toFixed(2)}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">
                      ${item.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Totals */}
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Shipping:</span>
                <span>${order.shipping.cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-900">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Order History */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order History</h2>
            
            <div className="relative space-y-3">
              {/* Timeline connector */}
              <div className="absolute top-0 left-3.5 bottom-0 w-0.5 bg-gray-200"></div>
              
              {order.history.map((event, index) => (
                <div key={index} className="relative flex items-start">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center z-10 mt-0.5 ${
                    index === 0 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {index === 0 ? (
                      <FiPackage className="h-4 w-4" />
                    ) : event.action === 'Payment Received' ? (
                      <FiCreditCard className="h-4 w-4" />
                    ) : event.action === 'Processing' ? (
                      <FiPackage className="h-4 w-4" />
                    ) : event.action === 'Shipped' ? (
                      <FiTruck className="h-4 w-4" />
                    ) : event.action === 'Delivered' ? (
                      <FiCheck className="h-4 w-4" />
                    ) : event.action === 'Cancelled' ? (
                      <FiX className="h-4 w-4" />
                    ) : (
                      <FiPackage className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{event.action}</p>
                    <div className="flex text-xs text-gray-500 mt-0.5">
                      <span>{format(event.date, 'MMM dd, yyyy')}</span>
                      <span className="mx-1">•</span>
                      <span>{format(event.date, 'hh:mm a')}</span>
                    </div>
                    {event.status && (
                      <p className="text-xs text-gray-500 mt-0.5">{event.status}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Notes */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Order Notes</h3>
              {order.notes ? (
                <p className="text-sm text-gray-700">{order.notes}</p>
              ) : (
                <div className="relative">
                  <textarea
                    className="form-input h-20 w-full"
                    placeholder="Add a note about this order"
                  ></textarea>
                  <button
                    className="absolute bottom-2 right-2 btn btn-primary btn-sm text-xs py-1"
                  >
                    Add Note
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar - Customer Info, Shipping, Payment */}
        <div className="space-y-6">
          {/* Customer Details */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Customer</h2>
              <Link to="/customers" className="text-sm text-primary-600 hover:text-primary-700">
                View Profile
              </Link>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <FiUser className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                <p className="text-xs text-gray-500">Customer since Jan 2025</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-500 block">Email Address</span>
                <a href={`mailto:${order.customer.email}`} className="text-sm text-primary-600 hover:text-primary-700">
                  {order.customer.email}
                </a>
              </div>
              
              {order.customer.phone && (
                <div>
                  <span className="text-xs text-gray-500 block">Phone Number</span>
                  <a href={`tel:${order.customer.phone}`} className="text-sm text-gray-900">
                    {order.customer.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Shipping Details */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Shipping</h2>
              <span className={`badge ${
                order.shipping.status === 'Shipped' ? 'badge-primary' :
                order.shipping.status === 'Delivered' ? 'badge-success' :
                order.shipping.status === 'Cancelled' ? 'badge-error' :
                'badge-warning'
              }`}>
                {order.shipping.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 block">Shipping Method</span>
                <span className="text-sm text-gray-900">{order.shipping.method}</span>
              </div>
              
              <div>
                <div className="flex items-start">
                  <FiMapPin className="h-4 w-4 text-gray-400 mt-1 mr-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-gray-500 block">Shipping Address</span>
                    <address className="text-sm text-gray-900 not-italic">
                      {order.shipping.address.street}<br />
                      {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.postalCode}<br />
                      {order.shipping.address.country}
                    </address>
                  </div>
                </div>
              </div>
              
              {order.shipping.trackingNumber && (
                <div>
                  <span className="text-xs text-gray-500 block">Tracking Number</span>
                  <span className="text-sm text-gray-900">{order.shipping.trackingNumber}</span>
                </div>
              )}
              
              {order.shipping.estimatedDelivery && (
                <div>
                  <span className="text-xs text-gray-500 block">Estimated Delivery</span>
                  <span className="text-sm text-gray-900">{format(order.shipping.estimatedDelivery, 'MMM dd, yyyy')}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>
              <span className={`badge ${
                order.payment.status === 'Paid' ? 'badge-success' :
                order.payment.status === 'Refunded' ? 'badge-error' :
                'badge-warning'
              }`}>
                {order.payment.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 block">Payment Method</span>
                <span className="text-sm text-gray-900">
                  {order.payment.method}
                  {order.payment.cardLast4 && ` ending in ${order.payment.cardLast4}`}
                </span>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 block">Transaction ID</span>
                <span className="text-sm text-gray-900">{order.payment.transactionId}</span>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 block">Payment Date</span>
                <span className="text-sm text-gray-900">
                  {format(order.payment.date, 'MMM dd, yyyy')} at {format(order.payment.date, 'hh:mm a')}
                </span>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 block">Amount</span>
                <span className="text-sm text-gray-900 font-medium">${order.payment.amount.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Refund Button */}
            {order.payment.status === 'Paid' && (
              <button
                onClick={() => toast.info('Refund functionality would be implemented here')}
                className="btn btn-secondary w-full justify-center mt-4"
              >
                Issue Refund
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails