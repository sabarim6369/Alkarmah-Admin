import { useState } from 'react'
import { FiSave, FiGlobe, FiDollarSign, FiTruck, FiMail, FiLock } from 'react-icons/fi'
import PageHeader from '../../components/ui/PageHeader'
import { toast } from 'react-toastify'

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: 'My E-commerce Store',
    storeEmail: 'store@example.com',
    storePhone: '(555) 123-4567',
    storeAddress: '123 Main St, Anytown, ST 12345',
    currency: 'USD',
    timezone: 'America/New_York',
    orderPrefix: 'ORD-',
    lowStockThreshold: '5',
    shippingMethods: {
      standard: {
        enabled: true,
        name: 'Standard Shipping',
        price: '5.99',
        estimatedDays: '3-5'
      },
      express: {
        enabled: true,
        name: 'Express Shipping',
        price: '14.99',
        estimatedDays: '1-2'
      }
    },
    emailNotifications: {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      lowStock: true
    }
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      // Handle nested objects (e.g., shippingMethods.standard.enabled)
      const [parent, child, prop] = name.split('.')
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: {
            ...prev[parent][child],
            [prop]: type === 'checkbox' ? checked : value
          }
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call
    toast.success('Settings updated successfully')
  }

  return (
    <div>
      <PageHeader 
        title="Settings"
        subtitle="Configure your store settings"
        breadcrumbs={[
          { text: 'Dashboard', link: '/' },
          { text: 'Settings' }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Store Information */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FiGlobe className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Store Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="storeName" className="form-label">Store Name</label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  className="form-input"
                  value={settings.storeName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="storeEmail" className="form-label">Store Email</label>
                <input
                  type="email"
                  id="storeEmail"
                  name="storeEmail"
                  className="form-input"
                  value={settings.storeEmail}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="storePhone" className="form-label">Store Phone</label>
                <input
                  type="tel"
                  id="storePhone"
                  name="storePhone"
                  className="form-input"
                  value={settings.storePhone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="storeAddress" className="form-label">Store Address</label>
                <input
                  type="text"
                  id="storeAddress"
                  name="storeAddress"
                  className="form-input"
                  value={settings.storeAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* General Settings */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FiDollarSign className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="currency" className="form-label">Currency</label>
                <select
                  id="currency"
                  name="currency"
                  className="form-input"
                  value={settings.currency}
                  onChange={handleChange}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="timezone" className="form-label">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  className="form-input"
                  value={settings.timezone}
                  onChange={handleChange}
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="orderPrefix" className="form-label">Order Number Prefix</label>
                <input
                  type="text"
                  id="orderPrefix"
                  name="orderPrefix"
                  className="form-input"
                  value={settings.orderPrefix}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lowStockThreshold" className="form-label">Low Stock Threshold</label>
                <input
                  type="number"
                  id="lowStockThreshold"
                  name="lowStockThreshold"
                  className="form-input"
                  value={settings.lowStockThreshold}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* Shipping Methods */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FiTruck className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Shipping Methods</h2>
            </div>
            
            <div className="space-y-4">
              {/* Standard Shipping */}
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Standard Shipping</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="shippingMethods.standard.enabled"
                      checked={settings.shippingMethods.standard.enabled}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable</span>
                  </label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label">Method Name</label>
                    <input
                      type="text"
                      name="shippingMethods.standard.name"
                      className="form-input"
                      value={settings.shippingMethods.standard.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="shippingMethods.standard.price"
                      className="form-input"
                      value={settings.shippingMethods.standard.price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Estimated Days</label>
                    <input
                      type="text"
                      name="shippingMethods.standard.estimatedDays"
                      className="form-input"
                      value={settings.shippingMethods.standard.estimatedDays}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Express Shipping */}
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Express Shipping</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="shippingMethods.express.enabled"
                      checked={settings.shippingMethods.express.enabled}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable</span>
                  </label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label">Method Name</label>
                    <input
                      type="text"
                      name="shippingMethods.express.name"
                      className="form-input"
                      value={settings.shippingMethods.express.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="shippingMethods.express.price"
                      className="form-input"
                      value={settings.shippingMethods.express.price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Estimated Days</label>
                    <input
                      type="text"
                      name="shippingMethods.express.estimatedDays"
                      className="form-input"
                      value={settings.shippingMethods.express.estimatedDays}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Email Notifications */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FiMail className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Email Notifications</h2>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications.orderConfirmation"
                  checked={settings.emailNotifications.orderConfirmation}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Order confirmation emails</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications.orderShipped"
                  checked={settings.emailNotifications.orderShipped}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Order shipped emails</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications.orderDelivered"
                  checked={settings.emailNotifications.orderDelivered}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Order delivered emails</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications.lowStock"
                  checked={settings.emailNotifications.lowStock}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Low stock alerts</span>
              </label>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary inline-flex items-center"
            >
              <FiSave className="mr-2 h-5 w-5" />
              Save Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Settings