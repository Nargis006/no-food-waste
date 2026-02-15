import { NavLink } from 'react-router-dom';
import { X, Home, Truck, ClipboardList, Users, BarChart3, Settings, Heart } from 'lucide-react';
import { useAuth, ROLES } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: [ROLES.ADMIN, ROLES.COORDINATOR, ROLES.DRIVER] },
  { name: 'My Assignments', href: '/assignments', icon: Truck, roles: [ROLES.DRIVER] },
  { name: 'Pickup Requests', href: '/pickups', icon: ClipboardList, roles: [ROLES.COORDINATOR] },
  { name: 'Driver Status', href: '/drivers', icon: Truck, roles: [ROLES.COORDINATOR] },
  { name: 'User Management', href: '/users', icon: Users, roles: [ROLES.ADMIN] },
  { name: 'Assign Pickups', href: '/assign', icon: ClipboardList, roles: [ROLES.ADMIN] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: [ROLES.ADMIN] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: [ROLES.ADMIN, ROLES.COORDINATOR, ROLES.DRIVER] },
];

export function Sidebar({ isOpen, onClose }) {
  const { user, hasRole } = useAuth();

  const filteredNavigation = navigation.filter((item) => hasRole(item.roles));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">NOFoodWaste</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            NOFoodWaste v1.0.0
          </p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
