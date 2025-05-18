import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiShoppingBag,
  FiEye,
  FiAlertCircle,
  FiCheck
} from 'react-icons/fi'
import PageHeader from '../../components/ui/PageHeader'
import SearchFilter from '../../components/ui/SearchFilter'
import EmptyState from '../../components/ui/EmptyState'
import { toast } from 'react-toastify'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Sample product data (in a real app, this would come from an API)
  useEffect(() => {
    const sampleProducts = [
      {
        id: 'P1001',
        name: 'Wireless Noise-Cancelling Headphones',
        sku: 'WNCH-001',
        price: 249.99,
        category: 'Electronics',
        stock: 18,
        status: 'Active',
        created: '2025-01-10'
      },
      {
        id: 'P1002',
        name: 'Ultra HD Smart TV 55"',
        sku: 'TV-UHD-55',
        price: 699.99,
        category: 'Electronics',
        stock: 7,
        status: 'Active',
        created: '2025-01-05'
      },
      {
        id: 'P1003',
        name: 'Premium Cotton T-Shirt',
        sku: 'APP-TS-001',
        price: 24.99,
        category: 'Clothing',
        stock: 52,
        status: 'Active',
        created: '2025-01-15'
      },
      {
        id: 'P1004',
        name: 'Professional Chef Knife Set',
        sku: 'KIT-CHF-001',
        price: 129.99,
        category: 'Kitchen',
        stock: 12,
        status: 'Active',
        created: '2025-01-02'
      },
      {
        id: 'P1005',
        name: 'Ergonomic Office Chair',
        sku: 'FRN-CHR-001',
        price: 199.99,
        category: 'Furniture',
        stock: 0,
        status: 'Out of Stock',
        created: '2024-12-28'
      },
      {
        id: 'P1006',
        name: 'Fitness Smartwatch',
        sku: 'WTC-FIT-001',
        price: 179.99,
        category: 'Electronics',
        stock: 3,
        status: 'Low Stock',
        created: '2025-01-08'
      },
      {
        id: 'P1007',
        name: 'Organic Skincare Set',
        sku: 'BTY-SKN-001',
        price: 89.99,
        category: 'Beauty',
        stock: 9,
        status: 'Active',
        created: '2025-01-12'
      },
      {
        id: 'P1008',
        name: 'Classic Leather Wallet',
        sku: 'ACC-WLT-001',
        price: 49.99,
        category: 'Accessories',
        stock: 21,
        status: 'Active',
        created: '2025-01-03'
      },
      {
        id: 'P1009',
        name: 'Stainless Steel Water Bottle',
        sku: 'KIT-BTL-001',
        price: 19.99,
        category: 'Kitchen',
        stock: 0,
        status: 'Hidden',
        created: '2024-12-15'
      },
      {
        id: 'P1010',
        name: 'Bluetooth Portable Speaker',
        sku: 'ELC-SPK-001',
        price: 79.99,
        category: 'Electronics',
        stock: 14,
        status: 'Active',
        created: '2025-01-01'
      }
    ]
    
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts)
      setFilteredProducts(sampleProducts)
      setIsLoading(false)
    }, 800)
  }, [])
  
  // Handle search and filter
  const handleSearch = (query, filters) => {
    let results = [...products]
    
    // Search by name or SKU
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.sku.toLowerCase().includes(lowerQuery)
      )
    }
    
    // Apply filters
    if (filters.category) {
      results = results.filter(product => product.category === filters.category)
    }
    
    if (filters.status) {
      results = results.filter(product => product.status === filters.status)
    }
    
    if (filters.minPrice) {
      results = results.filter(product => product.price >= parseFloat(filters.minPrice))
    }
    
    if (filters.maxPrice) {
      results = results.filter(product => product.price <= parseFloat(filters.maxPrice))
    }
    
    setFilteredProducts(results)
  }
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id))
    }
    setSelectAll(!selectAll)
  }
  
  // Handle individual select
  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
      setSelectAll(false)
    } else {
      setSelectedProducts([...selectedProducts, productId])
      // Check if all products are now selected
      if (selectedProducts.length + 1 === filteredProducts.length) {
        setSelectAll(true)
      }
    }
  }
  
  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    // In a real app, this would make an API call
    setProducts(products.filter(product => product.id !== productId))
    setFilteredProducts(filteredProducts.filter(product => product.id !== productId))
    setSelectedProducts(selectedProducts.filter(id => id !== productId))
    toast.success('Product deleted successfully')
  }
  
  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedProducts.length === 0) {
      toast.error('No products selected')
      return
    }
    
    if (action === 'delete') {
      // In a real app, this would make an API call
      setProducts(products.filter(product => !selectedProducts.includes(product.id)))
      setFilteredProducts(filteredProducts.filter(product => !selectedProducts.includes(product.id)))
      setSelectedProducts([])
      setSelectAll(false)
      toast.success(`${selectedProducts.length} products deleted successfully`)
    } else if (action === 'active' || action === 'inactive') {
      // Update status in both arrays
      const newStatus = action === 'active' ? 'Active' : 'Hidden'
      
      const updateProducts = (productList) => {
        return productList.map(product => {
          if (selectedProducts.includes(product.id)) {
            return { ...product, status: newStatus }
          }
          return product
        })
      }
      
      setProducts(updateProducts(products))
      setFilteredProducts(updateProducts(filteredProducts))
      setSelectedProducts([])
      setSelectAll(false)
      toast.success(`${selectedProducts.length} products updated successfully`)
    }
  }
  
  // Filter configurations
  const filterOptions = [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Kitchen', label: 'Kitchen' },
        { value: 'Furniture', label: 'Furniture' },
        { value: 'Beauty', label: 'Beauty' },
        { value: 'Accessories', label: 'Accessories' },
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Out of Stock', label: 'Out of Stock' },
        { value: 'Low Stock', label: 'Low Stock' },
        { value: 'Hidden', label: 'Hidden' },
      ]
    },
    {
      name: 'minPrice',
      label: 'Min Price',
      type: 'number',
      placeholder: '0.00',
    },
    {
      name: 'maxPrice',
      label: 'Max Price',
      type: 'number',
      placeholder: '1000.00',
    }
  ]
  
  return (
    <div>
      <PageHeader 
        title="Products"
        subtitle="Manage your product inventory"
        breadcrumbs={[
          { text: 'Dashboard', link: '/' },
          { text: 'Products' }
        ]}
        actionButton={
          <Link to="/products/add" className="btn btn-primary inline-flex items-center">
            <FiPlus className="mr-2 h-5 w-5" />
            Add Product
          </Link>
        }
      />
      
      {/* Search & Filters */}
      <div className="card mb-6">
        <SearchFilter 
          onSearch={handleSearch}
          placeholder="Search products by name or SKU..."
          filters={filterOptions}
        />
      </div>
      
      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="flex items-center mb-4 p-3 bg-primary-50 rounded-md animate-fade-in">
          <span className="text-sm font-medium text-primary-700 mr-4">
            {selectedProducts.length} products selected
          </span>
          <div className="space-x-2">
            <button 
              onClick={() => handleBulkAction('active')}
              className="btn btn-success text-sm py-1"
            >
              <FiCheck className="mr-1 h-4 w-4" />
              Set Active
            </button>
            <button 
              onClick={() => handleBulkAction('inactive')}
              className="btn btn-secondary text-sm py-1"
            >
              <FiEye className="mr-1 h-4 w-4" />
              Hide
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
      
      {/* Products List */}
      <div className="card">
        {isLoading ? (
          // Loading State
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded mb-2"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          // Empty State
          <EmptyState 
            title="No products found"
            description="Try adjusting your search or filter to find what you're looking for."
            icon={<FiShoppingBag className="h-8 w-8" />}
            actionLink="/products/add"
            actionText="Add New Product"
          />
        ) : (
          // Products Table
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
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-center">Stock</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                          <FiShoppingBag className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{product.sku}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{product.category}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-4 text-sm text-center">
                      {product.stock === 0 ? (
                        <span className="text-error-500 flex items-center justify-center">
                          <FiAlertCircle className="h-4 w-4 mr-1" />
                          Out
                        </span>
                      ) : product.stock <= 5 ? (
                        <span className="text-warning-500">{product.stock}</span>
                      ) : (
                        <span className="text-gray-700">{product.stock}</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`badge ${
                        product.status === 'Active' ? 'badge-success' :
                        product.status === 'Out of Stock' ? 'badge-error' :
                        product.status === 'Low Stock' ? 'badge-warning' :
                        'badge-info'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/products/edit/${product.id}`} className="text-gray-600 hover:text-primary-600">
                          <FiEdit2 className="h-5 w-5" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{" "}
                  <span className="font-medium">{products.length}</span> results
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

export default ProductList