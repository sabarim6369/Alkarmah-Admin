import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiShoppingBag, 
  FiPackage, 
  FiDollarSign, 
  FiUsers,
  FiArrowUp,
  FiArrowDown,
  FiAlertCircle
} from 'react-icons/fi'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import PageHeader from '../components/ui/PageHeader'
import StatCard from '../components/ui/StatCard'
import { format } from 'date-fns'

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
)

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Sales data for chart
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 1700, 2400, 2800, 2600, 3100],
        fill: true,
        backgroundColor: 'rgba(0, 102, 204, 0.1)',
        borderColor: 'rgba(0, 102, 204, 0.7)',
        tension: 0.4,
      },
    ],
  }
  
  // Product categories data for doughnut chart
  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Other'],
    datasets: [
      {
        data: [35, 25, 15, 20, 5],
        backgroundColor: [
          '#0066CC',
          '#FF9500',
          '#34C759',
          '#5856D6',
          '#FF3B30',
        ],
        borderWidth: 0,
      },
    ],
  }
  
  // Recent orders data
  const recentOrders = [
    { id: 'ORD-1234', customer: 'John Doe', total: '$129.99', date: new Date(2025, 0, 15), status: 'Delivered' },
    { id: 'ORD-1235', customer: 'Jane Smith', total: '$89.95', date: new Date(2025, 0, 14), status: 'Processing' },
    { id: 'ORD-1236', customer: 'Robert Johnson', total: '$246.50', date: new Date(2025, 0, 14), status: 'Shipped' },
    { id: 'ORD-1237', customer: 'Emily Davis', total: '$59.99', date: new Date(2025, 0, 13), status: 'Pending' },
    { id: 'ORD-1238', customer: 'Michael Brown', total: '$179.95', date: new Date(2025, 0, 12), status: 'Delivered' },
  ]
  
  // Low stock items
  const lowStockItems = [
    { id: 'P-1001', name: 'Wireless Earbuds', stock: 3, category: 'Electronics' },
    { id: 'P-1045', name: 'Cotton T-Shirt (Medium)', stock: 2, category: 'Clothing' },
    { id: 'P-1023', name: 'Smart Watch', stock: 5, category: 'Electronics' },
  ]
  
  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  }
  
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
    cutout: '70%',
  }
  
  // Loading UI
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
  
  // Status badge color mapping
  const statusColors = {
    'Delivered': 'badge-success',
    'Shipped': 'badge-info',
    'Processing': 'badge-warning',
    'Pending': 'badge-error',
  }

  return (
    <div>
      <PageHeader 
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your store"
      />
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Products" 
          value="312" 
          icon={<FiShoppingBag className="h-5 w-5 text-primary-500" />}
          change="+8% from last month"
          changeType="positive"
        />
        <StatCard 
          title="Total Orders" 
          value="54" 
          icon={<FiPackage className="h-5 w-5 text-primary-500" />}
          change="+12% from last month"
          changeType="positive"
        />
        <StatCard 
          title="Revenue" 
          value="$8,240" 
          icon={<FiDollarSign className="h-5 w-5 text-primary-500" />}
          change="-3% from last month"
          changeType="negative"
        />
        <StatCard 
          title="Customers" 
          value="89" 
          icon={<FiUsers className="h-5 w-5 text-primary-500" />}
          change="+5% from last month"
          changeType="positive"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
              <select className="form-input !w-auto py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="h-72">
              <Line data={salesData} options={lineChartOptions} />
            </div>
          </div>
        </div>
        
        {/* Categories Chart */}
        <div>
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Categories</h3>
            <div className="h-72 flex items-center justify-center">
              <Doughnut data={categoryData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <Link to="/orders" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        <Link to={`/orders/${order.id}`} className="text-primary-600 hover:text-primary-700">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.customer}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{format(order.date, 'MMM dd, yyyy')}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.total}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`badge ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Low Stock Alert */}
        <div>
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Low Stock Items</h3>
              <Link to="/products" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </Link>
            </div>
            
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-gray-500">No items with low stock.</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                    <div className="mr-3 text-warning-500">
                      <FiAlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <Link to={`/products/edit/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600">
                        {item.name}
                      </Link>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-sm font-medium text-error-500">
                      {item.stock} left
                    </div>
                  </div>
                ))}
                
                <Link 
                  to="/reports/inventory" 
                  className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium pt-2"
                >
                  Generate inventory report
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard