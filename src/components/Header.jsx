import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiBell, FiUser, FiSearch } from 'react-icons/fi'

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const userMenuRef = useRef(null)
  const notificationRef = useRef(null)
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleSearch = (e) => {
    e.preventDefault()
    // Handle search logic here
    console.log('Searching for:', searchQuery)
  }
  
  // Sample notifications
  const notifications = [
    { id: 1, text: 'New order #1234 received', time: '5 min ago', read: false },
    { id: 2, text: 'Product "Wireless Earbuds" is out of stock', time: '1 hour ago', read: false },
    { id: 3, text: 'Monthly sales report available', time: '3 hours ago', read: true },
  ]

  return (
    <header className="bg-white shadow-subtle z-10">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none focus:text-primary-500 mr-4"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              className="text-gray-600 focus:outline-none focus:text-primary-500 relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <FiBell className="h-6 w-6" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 transform translate-x-1/4 -translate-y-1/4"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-elevated overflow-hidden z-20 animate-fade-in">
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-2 text-center text-sm text-gray-500">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-100 last:border-0 ${notification.read ? '' : 'bg-blue-50'}`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                    <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <FiUser className="h-5 w-5 text-gray-600" />
              </div>
              <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">Admin</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-elevated overflow-hidden z-20 animate-fade-in">
                <div className="py-1">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header