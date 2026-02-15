import { useState } from 'react';
import { Card, CardBody, StatusBadge } from '../../components/common';
import { mockAssignments } from '../../services/mockData';
import { MapPin, Clock, Phone, Truck, Navigation } from 'lucide-react';

export function DriverStatusPage() {
  const [drivers] = useState([
    {
      id: 1,
      name: 'John Driver',
      phone: '+91 98765 43210',
      currentAssignment: mockAssignments[0],
      lastLocation: { lat: 12.9716, lng: 77.5946 },
      lastUpdate: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Mike Driver',
      phone: '+91 98765 12345',
      currentAssignment: mockAssignments[1],
      lastLocation: { lat: 12.9750, lng: 77.6066 },
      lastUpdate: new Date(Date.now() - 5 * 60000).toISOString(),
    },
    {
      id: 3,
      name: 'Ram Driver',
      phone: '+91 99887 76655',
      currentAssignment: mockAssignments[2],
      lastLocation: { lat: 12.9941, lng: 77.7093 },
      lastUpdate: new Date(Date.now() - 15 * 60000).toISOString(),
    },
  ]);

  const getTimeSinceUpdate = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Driver Status</h1>
        <p className="text-gray-500">Track driver locations and assignments in real-time</p>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Navigation className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Map integration would display here</p>
          <p className="text-sm">Showing {drivers.length} active drivers</p>
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <Card key={driver.id}>
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                  <a
                    href={`tel:${driver.phone}`}
                    className="flex items-center gap-1 text-sm text-emerald-600 hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    {driver.phone}
                  </a>
                </div>
                {driver.currentAssignment && (
                  <StatusBadge status={driver.currentAssignment.status} />
                )}
              </div>

              {driver.currentAssignment ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Current Assignment</p>
                    <p className="text-sm font-medium text-gray-700">
                      {driver.currentAssignment.pickup.organizationName}
                    </p>
                    <p className="text-xs text-gray-500">
                      → {driver.currentAssignment.delivery.hungerSpotName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {driver.currentAssignment.vehicle.number}
                    </span>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${driver.lastLocation.lat},${driver.lastLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No active assignment</p>
              )}

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                Last update: {getTimeSinceUpdate(driver.lastUpdate)}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DriverStatusPage;
