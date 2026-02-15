// API Base URL - configure based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('nofoodwaste_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ============ Driver Assignments API ============
export const driverApi = {
  // Get all assignments for current driver
  getAssignments: () => apiCall('/driver-assignments'),

  // Get single assignment details
  getAssignment: (id) => apiCall(`/driver-assignments/${id}`),

  // Update assignment status
  updateStatus: (id, status) =>
    apiCall(`/driver-assignments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Submit pickup details
  submitPickupDetails: (id, details) =>
    apiCall(`/driver-assignments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(details),
    }),
};

// ============ Transcription API ============
export const transcriptionApi = {
  // Transcribe audio to text
  transcribe: async (audioBlob, language = 'en') => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', language);

    return apiCall('/transcribe', {
      method: 'POST',
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  },

  // Parse transcript to structured JSON
  parseTranscript: (transcript) =>
    apiCall('/parse-transcript', {
      method: 'POST',
      body: JSON.stringify({ transcript }),
    }),
};

// ============ Image Upload API ============
export const uploadApi = {
  // Upload images to Google Drive
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    return apiCall('/upload-images', {
      method: 'POST',
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  },
};

// ============ Coordinator API ============
export const coordinatorApi = {
  // Get all pickup requests
  getPickupRequests: () => apiCall('/pickup-requests'),

  // Create new pickup request
  createPickupRequest: (data) =>
    apiCall('/pickup-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Verify submitted pickup
  verifyPickup: (id) =>
    apiCall(`/pickup-requests/${id}/verify`, {
      method: 'POST',
    }),

  // Get live driver status
  getLiveDriverStatus: () => apiCall('/drivers/status'),

  // Assign hunger spot
  assignHungerSpot: (assignmentId, hungerSpotId) =>
    apiCall(`/assignments/${assignmentId}/hunger-spot`, {
      method: 'PATCH',
      body: JSON.stringify({ hungerSpotId }),
    }),
};

// ============ Admin API ============
export const adminApi = {
  // User management
  getUsers: () => apiCall('/users'),
  createUser: (data) =>
    apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateUser: (id, data) =>
    apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteUser: (id) =>
    apiCall(`/users/${id}`, {
      method: 'DELETE',
    }),

  // Pickup assignment
  assignPickup: (data) =>
    apiCall('/assign-pickup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Vehicle assignment (recorded offline)
  recordVehicleAssignment: (data) =>
    apiCall('/vehicle-assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Analytics
  getAnalytics: () => apiCall('/analytics'),
};

// ============ Common API ============
export const commonApi = {
  // Get hunger spots
  getHungerSpots: () => apiCall('/hunger-spots'),

  // Get vehicles
  getVehicles: () => apiCall('/vehicles'),

  // Get organizations
  getOrganizations: () => apiCall('/organizations'),
};

export default {
  driver: driverApi,
  transcription: transcriptionApi,
  upload: uploadApi,
  coordinator: coordinatorApi,
  admin: adminApi,
  common: commonApi,
};
