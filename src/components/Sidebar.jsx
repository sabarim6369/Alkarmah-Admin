import { NavLink, Link, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiShoppingBag, 
  FiPackage, 
  FiUsers, 
  FiBarChart2, 
  FiSettings, 
  FiHelpCircle,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import logo from '../assets/logo.svg'

const Sidebar = ({ isOpen, isMobile }) => {
  const location = useLocation()
  
  // Set up expandable menu sections
  const [expandedMenus, setExpandedMenus] = useState({
    products: false,
    orders: false,
    customers: false,
  })
  
  // Check the current route and expand the appropriate menu
  useEffect(() => {
    const currentPath = location.pathname
    
    setExpandedMenus({
      products: currentPath.includes('/products'),
      orders: currentPath.includes('/orders'),
      customers: currentPath.includes('/customers'),
    })
  }, [location.pathname])
  
  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    })
  }
  
  // Define sidebar menu items
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/',
      exact: true
    },
    {
      name: 'Products',
      icon: <FiShoppingBag className="w-5 h-5" />,
      submenu: [
        { name: 'All Products', path: '/products' },
        { name: 'Add Product', path: '/products/add' },
        { name: 'Categories', path: '/products/categories' },
      ]
    },
    {
      name: 'Orders',
      icon: <FiPackage className="w-5 h-5" />,
      submenu: [
        { name: 'All Orders', path: '/orders' },
        { name: 'Pending', path: '/orders?status=pending' },
        { name: 'Processing', path: '/orders?status=processing' },
        { name: 'Completed', path: '/orders?status=completed' },
      ]
    },
    {
      name: 'Customers',
      icon: <FiUsers className="w-5 h-5" />,
      path: '/customers'
    },
    {
      name: 'Analytics',
      icon: <FiBarChart2 className="w-5 h-5" />,
      path: '/analytics'
    },
    {
      name: 'Settings',
      icon: <FiSettings className="w-5 h-5" />,
      path: '/settings'
    },
    {
      name: 'Help',
      icon: <FiHelpCircle className="w-5 h-5" />,
      path: '/help'
    }
  ]
  
  // Classes based on sidebar state
  const sidebarClasses = `bg-white fixed h-full shadow-md z-20 sidebar-transition ${
    isOpen ? 'w-64' : 'w-0 lg:w-16'
  } ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`;

  return (
    <aside className={sidebarClasses}>
      <div className="h-full flex flex-col">
        {/* Sidebar Header - Logo & Brand */}
        <div className={`flex items-center h-16 px-4 ${!isOpen && 'lg:justify-center'}`}>
          <Link to="/" className="flex items-center">
            {isOpen ? (
              <>
                <img src={logo || '/vite.svg'} alt="Logo" className="h-8 w-8" />
                <span className="ml-2 text-xl font-semibold text-gray-800">Admin</span>
              </>
            ) : (
              <img src={logo || '/vite.svg'} alt="Logo" className="h-8 w-8" />
            )}
          </Link>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-0.5">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  // Menu item with submenu
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name.toLowerCase())}
                      className={`flex items-center w-full px-4 py-2.5 text-left transition-colors duration-200 hover:bg-gray-100 ${
                        expandedMenus[item.name.toLowerCase()] ? 'text-primary-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span className="inline-flex items-center">
                        {item.icon}
                        {isOpen && <span className="ml-3">{item.name}</span>}
                      </span>
                      
                      {isOpen && (
                        <span className="ml-auto">
                          {expandedMenus[item.name.toLowerCase()] ? 
                            <FiChevronDown className="w-4 h-4" /> : 
                            <FiChevronRight className="w-4 h-4" />
                          }
                        </span>
                      )}
                    </button>
                    
                    {/* Submenu items */}
                    {expandedMenus[item.name.toLowerCase()] && isOpen && (
                      <ul className="pl-4 pt-1 pb-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) => 
                                `flex items-center px-4 py-2 text-sm transition-colors duration-200 hover:text-primary-600 ${
                                  isActive ? 'text-primary-600 font-medium' : 'text-gray-600'
                                }`
                              }
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-300 mr-2"></span>
                              {subItem.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular menu item
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2.5 transition-colors duration-200 hover:bg-gray-100 ${
                        isActive ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'
                      } ${!isOpen && 'lg:justify-center'}`
                    }
                  >
                    {item.icon}
                    {isOpen && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Admin Info */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium">A</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar