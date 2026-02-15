import { useState } from 'react';
import { Card, CardBody, Button, Input, Select, showToast } from '../../components/common';
import { mockOrganizations, mockHungerSpots, mockVehicles, mockUsers } from '../../services/mockData';
import { Plus, MapPin, Building2, Truck, User, Clock } from 'lucide-react';

export function AssignPickupsPage() {
  const [formData, setFormData] = useState({
    organizationId: '',
    contactPerson: '',
    contactNumber: '',
    pickupAddress: '',
    scheduledTime: '',
    hungerSpotId: '',
    deliveryAddress: '',
    driverId: '',
    vehicleId: '',
    vehiclePickupLocation: '',
    estimatedQuantity: '',
  });

  const drivers = mockUsers.filter((u) => u.role === 'driver');

  const handleChange = (field) => (e) => {
    const value = e.target?.value ?? e;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-fill organization details
    if (field === 'organizationId') {
      const org = mockOrganizations.find((o) => o.id === parseInt(value));
      if (org) {
        setFormData((prev) => ({
          ...prev,
          organizationId: value,
          contactPerson: org.contact,
          contactNumber: org.phone,
        }));
      }
    }

    // Auto-fill hunger spot address
    if (field === 'hungerSpotId') {
      const spot = mockHungerSpots.find((s) => s.id === parseInt(value));
      if (spot) {
        setFormData((prev) => ({
          ...prev,
          hungerSpotId: value,
          deliveryAddress: spot.address,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.organizationId || !formData.driverId || !formData.vehicleId) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // In production, this would call the API
    console.log('Creating pickup assignment:', formData);
    showToast('Pickup assignment created successfully!', 'success');

    // Reset form
    setFormData({
      organizationId: '',
      contactPerson: '',
      contactNumber: '',
      pickupAddress: '',
      scheduledTime: '',
      hungerSpotId: '',
      deliveryAddress: '',
      driverId: '',
      vehicleId: '',
      vehiclePickupLocation: '',
      estimatedQuantity: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assign Pickup</h1>
        <p className="text-gray-500">Create and assign new pickup requests to drivers</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pickup Source Details */}
          <Card>
            <CardBody>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Pickup Source</h3>
              </div>

              <div className="space-y-4">
                <Select
                  label="Organization *"
                  options={mockOrganizations.map((org) => ({
                    value: org.id,
                    label: org.name,
                  }))}
                  value={formData.organizationId}
                  onChange={(e) => handleChange('organizationId')(e)}
                  placeholder="Select organization"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Contact Person"
                    value={formData.contactPerson}
                    onChange={handleChange('contactPerson')}
                  />
                  <Input
                    label="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange('contactNumber')}
                  />
                </div>
                <Input
                  label="Pickup Address"
                  value={formData.pickupAddress}
                  onChange={handleChange('pickupAddress')}
                  placeholder="Enter pickup address"
                />
                <Input
                  label="Scheduled Time"
                  type="datetime-local"
                  value={formData.scheduledTime}
                  onChange={handleChange('scheduledTime')}
                />
                <Input
                  label="Estimated Quantity"
                  value={formData.estimatedQuantity}
                  onChange={handleChange('estimatedQuantity')}
                  placeholder="e.g., 50 kg"
                />
              </div>
            </CardBody>
          </Card>

          {/* Delivery Details */}
          <Card>
            <CardBody>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-green-50">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Delivery Details</h3>
              </div>

              <div className="space-y-4">
                <Select
                  label="Hunger Spot *"
                  options={mockHungerSpots.map((spot) => ({
                    value: spot.id,
                    label: spot.name,
                  }))}
                  value={formData.hungerSpotId}
                  onChange={(e) => handleChange('hungerSpotId')(e)}
                  placeholder="Select hunger spot"
                />
                <Input
                  label="Delivery Address"
                  value={formData.deliveryAddress}
                  onChange={handleChange('deliveryAddress')}
                  placeholder="Auto-filled from hunger spot"
                />
              </div>
            </CardBody>
          </Card>

          {/* Driver Assignment */}
          <Card>
            <CardBody>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-amber-50">
                  <User className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Driver Assignment</h3>
              </div>

              <div className="space-y-4">
                <Select
                  label="Assign Driver *"
                  options={drivers.map((driver) => ({
                    value: driver.id,
                    label: driver.name,
                  }))}
                  value={formData.driverId}
                  onChange={(e) => handleChange('driverId')(e)}
                  placeholder="Select driver"
                />
              </div>
            </CardBody>
          </Card>

          {/* Vehicle Assignment */}
          <Card>
            <CardBody>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Vehicle Assignment
                  <span className="text-xs font-normal text-gray-500 ml-2">
                    (Assigned offline)
                  </span>
                </h3>
              </div>

              <div className="space-y-4">
                <Select
                  label="Vehicle *"
                  options={mockVehicles.map((vehicle) => ({
                    value: vehicle.id,
                    label: `${vehicle.number} (${vehicle.type}) - ${vehicle.capacity}`,
                  }))}
                  value={formData.vehicleId}
                  onChange={(e) => handleChange('vehicleId')(e)}
                  placeholder="Select vehicle"
                />
                <Input
                  label="Vehicle Pickup Location (Optional)"
                  value={formData.vehiclePickupLocation}
                  onChange={handleChange('vehiclePickupLocation')}
                  placeholder="e.g., Depot - Koramangala"
                />
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Vehicle assignment is done offline. 
                  This record is for tracking purposes only.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <Button type="submit" icon={Plus} size="lg">
            Create Assignment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AssignPickupsPage;
