// Mock data for development and demonstration

export const mockAssignments = [
  {
    id: 1,
    status: 'assigned',
    pickup: {
      organizationName: 'Grand Hyatt Hotel',
      contactPerson: 'Rajesh Kumar',
      contactNumber: '+91 98765 43210',
      location: {
        address: '123 MG Road, Bangalore',
        coordinates: { lat: 12.9716, lng: 77.5946 },
        mapLink: 'https://maps.google.com/?q=12.9716,77.5946',
      },
      scheduledTime: '2026-02-14T10:00:00',
      estimatedQuantity: '50 kg',
    },
    delivery: {
      hungerSpotName: 'Community Kitchen - Whitefield',
      locationName: 'Whitefield Community Center',
      location: {
        address: '456 ITPL Main Road, Whitefield',
        coordinates: { lat: 12.9698, lng: 77.7500 },
        mapLink: 'https://maps.google.com/?q=12.9698,77.7500',
      },
    },
    vehicle: {
      number: 'KA-01-AB-1234',
      type: 'Mini Truck',
      pickupLocation: 'Depot - Koramangala',
    },
    timeline: [
      { status: 'assigned', timestamp: '2026-02-14T08:00:00', note: 'Assignment created' },
    ],
  },
  {
    id: 2,
    status: 'reached',
    pickup: {
      organizationName: 'Taj Vivanta',
      contactPerson: 'Priya Sharma',
      contactNumber: '+91 98765 12345',
      location: {
        address: '789 Brigade Road, Bangalore',
        coordinates: { lat: 12.9750, lng: 77.6066 },
        mapLink: 'https://maps.google.com/?q=12.9750,77.6066',
      },
      scheduledTime: '2026-02-14T11:30:00',
      estimatedQuantity: '30 kg',
    },
    delivery: {
      hungerSpotName: 'Anna Bhavan - Indiranagar',
      locationName: 'Indiranagar 100ft Road',
      location: {
        address: '100ft Road, Indiranagar',
        coordinates: { lat: 12.9784, lng: 77.6408 },
        mapLink: 'https://maps.google.com/?q=12.9784,77.6408',
      },
    },
    vehicle: {
      number: 'KA-01-CD-5678',
      type: 'Van',
      pickupLocation: 'Depot - HSR Layout',
    },
    timeline: [
      { status: 'assigned', timestamp: '2026-02-14T09:00:00', note: 'Assignment created' },
      { status: 'reached', timestamp: '2026-02-14T11:15:00', note: 'Driver reached pickup location' },
    ],
  },
  {
    id: 3,
    status: 'submitted',
    pickup: {
      organizationName: 'Marriott Hotel',
      contactPerson: 'Amit Patel',
      contactNumber: '+91 99887 76655',
      location: {
        address: '321 Airport Road, Bangalore',
        coordinates: { lat: 12.9941, lng: 77.7093 },
        mapLink: 'https://maps.google.com/?q=12.9941,77.7093',
      },
      scheduledTime: '2026-02-14T09:00:00',
      estimatedQuantity: '45 kg',
    },
    delivery: {
      hungerSpotName: 'Hope Foundation - KR Puram',
      locationName: 'KR Puram Railway Station',
      location: {
        address: 'Near KR Puram Station',
        coordinates: { lat: 13.0012, lng: 77.6855 },
        mapLink: 'https://maps.google.com/?q=13.0012,77.6855',
      },
    },
    vehicle: {
      number: 'KA-01-EF-9012',
      type: 'Mini Truck',
      pickupLocation: 'Depot - Marathahalli',
    },
    submittedDetails: {
      foodName: 'Rice, Dal, Vegetables',
      quantityCollected: '42 kg',
      pickupTime: '2026-02-14T09:30:00',
      estimatedDeliveryTime: '2026-02-14T10:30:00',
      images: [
        'https://drive.google.com/file/d/abc123',
        'https://drive.google.com/file/d/def456',
      ],
    },
    timeline: [
      { status: 'assigned', timestamp: '2026-02-14T07:00:00', note: 'Assignment created' },
      { status: 'reached', timestamp: '2026-02-14T08:45:00', note: 'Driver reached pickup location' },
      { status: 'submitted', timestamp: '2026-02-14T09:30:00', note: 'Pickup details submitted' },
    ],
  },
  {
    id: 4,
    status: 'delivered',
    pickup: {
      organizationName: 'ITC Gardenia',
      contactPerson: 'Suresh Reddy',
      contactNumber: '+91 98123 45678',
      location: {
        address: '1 Residency Road, Bangalore',
        coordinates: { lat: 12.9698, lng: 77.5960 },
        mapLink: 'https://maps.google.com/?q=12.9698,77.5960',
      },
      scheduledTime: '2026-02-14T08:00:00',
      estimatedQuantity: '60 kg',
    },
    delivery: {
      hungerSpotName: 'Akshaya Patra - Electronic City',
      locationName: 'Electronic City Phase 1',
      location: {
        address: 'Electronic City Phase 1',
        coordinates: { lat: 12.8456, lng: 77.6603 },
        mapLink: 'https://maps.google.com/?q=12.8456,77.6603',
      },
    },
    vehicle: {
      number: 'KA-01-GH-3456',
      type: 'Large Truck',
      pickupLocation: 'Depot - Jayanagar',
    },
    submittedDetails: {
      foodName: 'Biryani, Rotis, Curries',
      quantityCollected: '58 kg',
      pickupTime: '2026-02-14T08:15:00',
      estimatedDeliveryTime: '2026-02-14T09:30:00',
      actualDeliveryTime: '2026-02-14T09:25:00',
      images: [
        'https://drive.google.com/file/d/ghi789',
      ],
    },
    timeline: [
      { status: 'assigned', timestamp: '2026-02-14T06:00:00', note: 'Assignment created' },
      { status: 'reached', timestamp: '2026-02-14T07:45:00', note: 'Driver reached pickup location' },
      { status: 'submitted', timestamp: '2026-02-14T08:15:00', note: 'Pickup details submitted' },
      { status: 'delivered', timestamp: '2026-02-14T09:25:00', note: 'Food delivered to hunger spot' },
    ],
  },
  {
    id: 5,
    status: 'verified',
    pickup: {
      organizationName: 'Oberoi Hotel',
      contactPerson: 'Meera Nair',
      contactNumber: '+91 97654 32100',
      location: {
        address: '37/39 MG Road, Bangalore',
        coordinates: { lat: 12.9758, lng: 77.6045 },
        mapLink: 'https://maps.google.com/?q=12.9758,77.6045',
      },
      scheduledTime: '2026-02-13T14:00:00',
      estimatedQuantity: '35 kg',
    },
    delivery: {
      hungerSpotName: 'Seva Kitchen - Malleshwaram',
      locationName: '8th Cross, Malleshwaram',
      location: {
        address: '8th Cross, Malleshwaram',
        coordinates: { lat: 13.0035, lng: 77.5647 },
        mapLink: 'https://maps.google.com/?q=13.0035,77.5647',
      },
    },
    vehicle: {
      number: 'KA-01-IJ-7890',
      type: 'Van',
      pickupLocation: 'Depot - Rajajinagar',
    },
    submittedDetails: {
      foodName: 'Pulao, Raita, Desserts',
      quantityCollected: '33 kg',
      pickupTime: '2026-02-13T14:20:00',
      estimatedDeliveryTime: '2026-02-13T15:30:00',
      actualDeliveryTime: '2026-02-13T15:15:00',
      images: [
        'https://drive.google.com/file/d/jkl012',
        'https://drive.google.com/file/d/mno345',
      ],
    },
    timeline: [
      { status: 'assigned', timestamp: '2026-02-13T12:00:00', note: 'Assignment created' },
      { status: 'reached', timestamp: '2026-02-13T13:45:00', note: 'Driver reached pickup location' },
      { status: 'submitted', timestamp: '2026-02-13T14:20:00', note: 'Pickup details submitted' },
      { status: 'delivered', timestamp: '2026-02-13T15:15:00', note: 'Food delivered to hunger spot' },
      { status: 'verified', timestamp: '2026-02-13T15:30:00', note: 'Verified by coordinator' },
    ],
  },
];

export const mockAnalytics = {
  totalFoodSaved: '2,450 kg',
  hungerSpotsServed: 45,
  activeDrivers: 12,
  totalDeliveries: 156,
  thisWeek: {
    foodSaved: '320 kg',
    deliveries: 24,
  },
  thisMonth: {
    foodSaved: '1,200 kg',
    deliveries: 89,
  },
};

export const mockHungerSpots = [
  { id: 1, name: 'Community Kitchen - Whitefield', address: 'Whitefield Community Center' },
  { id: 2, name: 'Anna Bhavan - Indiranagar', address: 'Indiranagar 100ft Road' },
  { id: 3, name: 'Hope Foundation - KR Puram', address: 'KR Puram Railway Station' },
  { id: 4, name: 'Akshaya Patra - Electronic City', address: 'Electronic City Phase 1' },
  { id: 5, name: 'Seva Kitchen - Malleshwaram', address: '8th Cross, Malleshwaram' },
];

export const mockVehicles = [
  { id: 1, number: 'KA-01-AB-1234', type: 'Mini Truck', capacity: '500 kg' },
  { id: 2, number: 'KA-01-CD-5678', type: 'Van', capacity: '200 kg' },
  { id: 3, number: 'KA-01-EF-9012', type: 'Mini Truck', capacity: '500 kg' },
  { id: 4, number: 'KA-01-GH-3456', type: 'Large Truck', capacity: '1000 kg' },
  { id: 5, number: 'KA-01-IJ-7890', type: 'Van', capacity: '200 kg' },
];

export const mockOrganizations = [
  { id: 1, name: 'Grand Hyatt Hotel', contact: 'Rajesh Kumar', phone: '+91 98765 43210' },
  { id: 2, name: 'Taj Vivanta', contact: 'Priya Sharma', phone: '+91 98765 12345' },
  { id: 3, name: 'Marriott Hotel', contact: 'Amit Patel', phone: '+91 99887 76655' },
  { id: 4, name: 'ITC Gardenia', contact: 'Suresh Reddy', phone: '+91 98123 45678' },
  { id: 5, name: 'Oberoi Hotel', contact: 'Meera Nair', phone: '+91 97654 32100' },
];

export const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@nofoodwaste.org', role: 'admin', status: 'active' },
  { id: 2, name: 'Sarah Coordinator', email: 'sarah@nofoodwaste.org', role: 'coordinator', status: 'active' },
  { id: 3, name: 'John Driver', email: 'john@nofoodwaste.org', role: 'driver', status: 'active' },
  { id: 4, name: 'Mike Driver', email: 'mike@nofoodwaste.org', role: 'driver', status: 'active' },
  { id: 5, name: 'Lisa Coordinator', email: 'lisa@nofoodwaste.org', role: 'coordinator', status: 'inactive' },
];

export const mockRecentActivity = [
  { id: 1, type: 'delivery', message: 'Food delivered to Akshaya Patra', time: '10 minutes ago', user: 'John Driver' },
  { id: 2, type: 'pickup', message: 'Pickup created from Grand Hyatt', time: '25 minutes ago', user: 'Sarah Coordinator' },
  { id: 3, type: 'verification', message: 'Delivery verified at Seva Kitchen', time: '1 hour ago', user: 'Sarah Coordinator' },
  { id: 4, type: 'assignment', message: 'New assignment created for Mike', time: '2 hours ago', user: 'Admin User' },
  { id: 5, type: 'user', message: 'New driver registered', time: '3 hours ago', user: 'Admin User' },
];
