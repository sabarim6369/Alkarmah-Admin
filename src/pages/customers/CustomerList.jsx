import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiUser, 
  FiMail, 
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiPlus
} from 'react-icons/fi'
import PageHeader from '../../components/ui/PageHeader'
import SearchFilter from '../../components/ui/SearchFilter'
import EmptyState from '../../components/ui/EmptyState'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Sample customer data (in a real app, this would come from an API)
  useEffect(() => {
    const sampleCustomers = [
      {
        id: 'C1001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        location: 'New York, USA',
        totalOrders: 12,
        totalSpent: 1249.99,
        lastOrder: new Date('2025-01-15'),
        status: 'Active',
        joinDate: new Date('2024-06-15')
      },
      {
        id: 'C1002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '(555) 234-5678',
        location: 'Los Angeles, USA',
        totalOrders: 8,
        totalSpent: 879.50,
        lastOrder: new Date('2025-01-10'),
        status: 'Active',
        joinDate: new Date('2024-08-20')
      },
      {
        id: 'C1003',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        phone: '(555) 345-6789',
        location: 'Chicago, USA',
        totalOrders: 15,
        totalSpent: 1589.75,
        lastOrder: new Date('2025-01-12'),
        status: 'Active',
        joinDate: new Date('2024-05-10')
      },
      {
        id: 'C1004',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone: '(555) 456-7890',
        location: 'Houston, USA',
        totalOrders: 5,
        totalSpent: 459.95,
        lastOrder: new Date('2025-01-08'),
        status: 'Inactive',
        joinDate: new Date('2024-09-05')
      },
      {
        id: 'C1005',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '(555) 567-8901',
        location: 'Miami, USA',
        totalOrders: 20,
        totalSpent: 2150.25,
        lastOrder: new Date('2025-01-14'),
        status: 'Active',
        joinDate: new Date('2024-04-15')
      }
    ]
    
    // Simulate API call
    setTimeout(() => {
      setCustomers(sampleCustomers)
      setFilteredCustomers(sampleCustomers)
      setIsLoading(false)
    }, 800)
  }, [])
  
  // Handle search and filter
  const handleSearch = (query, filters) => {
    let results = [...customers]
    
    // Search by name or email
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(customer => 
        customer.name.toLowerCase().includes(lowerQuery) || 
        customer.email.toLowerCase().includes(lowerQuery)
      )
    }
    
    // Apply filters
    if (filters.status) {
      results = results.filter(customer => customer.status === filters.status)
    }
    
    if (filters.location) {
      results = results.filter(customer => 
        customer.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    if (filters.minOrders) {
      results = results.filter(customer => 
        customer.totalOrders >= parseInt(filters.minOrders)
      )
    }
    
    if (filters.minSpent) {
      results = results.filter(customer => 
        customer.totalSpent >= parseFloat(filters.minSpent)
      )
    }
    
    setFilteredCustomers(results)
  }
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(customer => customer.id))
    }
    setSelectAll(!selectAll)
  }
  
  // Handle individual select
  const handleSelectCustomer = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId))
      setSelectAll(false)
    } else {
      setSelectedCustomers([...selectedCustomers, customerId])
      // Check if all customers are now selected
      if (selectedCustomers.length + 1 === filteredCustomers.length) {
        setSelectAll(true)
      }
    }
  }
  
  // Handle customer deletion
  const handleDeleteCustomer = (customerId) => {
    // In a real app, this would make an API call
    setCustomers(customers.filter(customer => customer.id !== customerId))
    setFilteredCustomers(filteredCustomers.filter(customer => customer.id !== customerId))
    setSelectedCustomers(selectedCustomers.filter(id => id !== customerId))
    toast.success('Customer deleted successfully')
  }
  
  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedCustomers.length === 0) {
      toast.error('No customers selected')
      return
    }
    
    if (action === 'delete') {
      // In a real app, this would make an API call
      setCustomers(customers.filter(customer => !selectedCustomers.includes(customer.id)))
      setFilteredCustomers(filteredCustomers.filter(customer => !selectedCustomers.includes(customer.id)))
      setSelectedCustomers([])
      setSelectAll(false)
      toast.success(`${selectedCustomers.length} customers deleted successfully`)
    } else if (action === 'export') {
      // Handle export logic
      toast.success(`${selectedCustomers.length} customers exported`)
      setSelectedCustomers([])
      setSelectAll(false)
    }
  }
  
  // Filter configurations
  const filterOptions = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ]
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Filter by city or country'
    },
    {
      name: 'minOrders',
      label: 'Min Orders',
      type: 'number',
      placeholder: '0'
    },
    {
      name: 'minSpent',
      label: 'Min Total Spent',
      type: 'number',
      placeholder: '0.00'
    }
  ]

  return (
    <div>
      <PageHeader 
        title="Customers"
        subtitle="Manage your customer base"
        breadcrumbs={[
          { text: 'Dashboard', link: '/' },
          { text: 'Customers' }
        ]}
        actionButton={
          <Link to="/customers/add" className="btn btn-primary inline-flex items-center">
            <FiPlus className="mr-2 h-5 w-5" />
            Add Customer
          </Link>
        }
      />
      
      {/* Search & Filters */}
      <div className="card mb-6">
        <SearchFilter 
          onSearch={handleSearch}
          placeholder="Search customers by name or email..."
          filters={filterOptions}
        />
      </div>
      
      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="flex items-center mb-4 p-3 bg-primary-50 rounded-md animate-fade-in">
          <span className="text-sm font-medium text-primary-700 mr-4">
            {selectedCustomers.length} customers selected
          </span>
          <div className="space-x-2">
            <button 
              onClick={() => handleBulkAction('export')}
              className="btn btn-secondary text-sm py-1"
            >
              Export
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="btn btn-danger text-sm py-1"
            >
              <FiTrash2 className="mr-1 h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Customers List */}
      <div className="card">
        {isLoading ? (
          // Loading State
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded mb-2"></div>
            ))}
          </div>
        ) : filteredCustomers.length === 0 ? (
          // Empty State
          <EmptyState 
            title="No customers found"
            description="Try adjusting your search or filter to find what you're looking for."
            icon={<FiUser className="h-8 w-8" />}
            actionLink="/customers/add"
            actionText="Add New Customer"
          />
        ) : (
          // Customers Table
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
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-right">Orders</th>
                  <th className="px-4 py-3 text-right">Total Spent</th>
                  <th className="px-4 py-3 text-left">Last Order</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => handleSelectCustomer(customer.id)}
                          className="w-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <FiUser className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <Link 
                            to={`/customers/${customer.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-primary-600"
                          >
                            {customer.name}
                          </Link>
                          <p className="text-xs text-gray-500">
                            Member since {format(customer.joinDate, 'MMM yyyy')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="flex items-center text-gray-500">
                          <FiMail className="h-4 w-4 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-gray-500 mt-1">
                          <FiPhone className="h-4 w-4 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="h-4 w-4 mr-1" />
                        {customer.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end text-sm">
                        <FiShoppingBag className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {customer.totalOrders}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      <span className="font-medium text-gray-900">
                        ${customer.totalSpent.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="h-4 w-4 mr-1" />
                        {format(customer.lastOrder, 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`badge ${
                        customer.status === 'Active' ? 'badge-success' : 'badge-error'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          to={`/customers/edit/${customer.id}`}
                          className="text-gray-600 hover:text-primary-600"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="text-gray-600 hover:text-error-500"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            
            </table>
            
            {/* Pagination */}
            <div className="py-3 px-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of{" "}
                  <span className="font-medium">{customers.length}</span> results
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

export default CustomerList