
# NOFoodWaste - Food Donation Logistics Platform

Single Page Application (SPA) for managing food donation logistics, built with React, Tailwind CSS.

## Tech Stack

- **Frontend:** React 19 + Vite 7
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **State Management:** React Context API
- **File Upload:** React Dropzone

## Features

### Role-Based Access Control
Three user roles with different permissions:
- **Admin:** Full system access, user management, analytics, pickup assignments
- **Coordinator:** Pickup request management, driver status tracking, delivery verification
- **Driver:** View assignments, submit pickup details, voice input support

### Driver Workflow (Critical Feature)
1. Driver sees assigned pickups grid on dashboard
2. Driver marks "Reached Pickup Location"
3. Driver fills mandatory form BEFORE picking food
4. Form includes voice input assistance for low-literacy drivers
5. Images uploaded to cloud storage
6. Status updates: Assigned → Reached → Submitted → Delivered → Verified

### Voice Input Feature
- Multi-language support (English, Hindi, Kannada, Tamil, Telugu)
- Audio recording with visual waveform
- Speech-to-text transcription
- AI-powered transcript parsing to auto-fill forms

## Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   └── ProtectedRoute.jsx
│   ├── common/               # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Spinner.jsx
│   │   ├── StatusBadge.jsx
│   │   └── Toast.jsx
│   ├── dashboard/            # Dashboard widgets
│   │   ├── HeroBanner.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── QuickActions.jsx
│   │   └── RecentActivity.jsx
│   ├── driver/               # Driver-specific components
│   │   ├── DriverAssignmentsGrid.jsx
│   │   ├── DriverAssignmentCard.jsx
│   │   ├── PickupDetailModal.jsx
│   │   ├── PickupForm.jsx
│   │   ├── VoiceInputPanel.jsx
│   │   └── Timeline.jsx
│   └── layout/               # Layout components
│       ├── DashboardLayout.jsx
│       ├── Header.jsx
│       └── Sidebar.jsx
├── contexts/
│   └── AuthContext.jsx       # Authentication state management
├── hooks/
│   └── useVoiceRecording.js  # Voice recording hook
├── pages/
│   ├── admin/                # Admin pages
│   │   ├── AnalyticsPage.jsx
│   │   ├── AssignPickupsPage.jsx
│   │   └── UserManagementPage.jsx
│   ├── coordinator/          # Coordinator pages
│   │   ├── DriverStatusPage.jsx
│   │   └── PickupRequestsPage.jsx
│   ├── driver/               # Driver pages
│   │   └── AssignmentsPage.jsx
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   └── SettingsPage.jsx
├── services/
│   ├── api.js                # API service layer
│   ├── mockData.js           # Mock data for development
│   ├── googleDriveUpload.js  # Google Drive integration example
│   └── voiceToText.js        # Voice-to-text integration example
├── App.jsx                   # Main app with routing
├── main.jsx                  # Entry point
└── index.css                 # Tailwind imports + custom styles
```

## API Contracts

### 1. POST /api/transcribe
Transcribe audio to text
```json
// Request: FormData with 'audio' file and 'language' field

// Response
{
  "transcript": "I collected 45 kg rice from Grand Hyatt..."
}
```

### 2. POST /api/parse-transcript
Parse transcript to structured JSON
```json
// Request
{ "transcript": "..." }

// Response
{
  "food_name": "Rice, Dal",
  "quantity_collected": "45 kg",
  "pickup_location": "Grand Hyatt",
  "drop_location": "Community Kitchen",
  "hunger_spot": "Whitefield",
  "estimated_delivery_time": "11:00 AM"
}
```

### 3. POST /api/upload-images
Upload images to Google Drive
```json
// Request: FormData with 'images' files

// Response
{
  "success": true,
  "files": [
    { "id": "abc123", "url": "https://drive.google.com/..." }
  ]
}
```

### 4. POST /api/submit-pickup-details
Save pickup details
```json
// Request
{
  "assignmentId": 1,
  "foodName": "Rice, Dal",
  "quantityCollected": "45 kg",
  "images": ["url1", "url2"]
}

// Response
{ "success": true, "assignmentId": 1 }
```

### 5. GET /api/driver-assignments
Get driver assignments
```json
// Response
{
  "assignments": [
    {
      "id": 1,
      "status": "assigned",
      "pickup": { ... },
      "delivery": { ... },
      "vehicle": { ... },
      "timeline": [ ... ]
    }
  ]
}
```

## Status Flow

```
Assigned
    ↓
Reached Pickup
    ↓
Details Submitted  ← Cannot skip! Form required
    ↓
Delivered
    ↓
Verified (by Coordinator)
```

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@nofoodwaste.org | admin123 |
| Coordinator | coordinator@nofoodwaste.org | coord123 |
| Driver | driver@nofoodwaste.org | driver123 |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

## UI/UX Features

- Mobile-first responsive design
- Smooth modal animations
- Loading states and spinners
- Toast notifications
- Status badges with colors
- Progress timeline tracking
- Drag-and-drop image upload
- Voice recording waveform animation

## Backend Integration

See `src/services/googleDriveUpload.js` and `src/services/voiceToText.js` for detailed backend implementation examples including:

- Google Drive API setup with service account
- Google Cloud Speech-to-Text integration
- OpenAI GPT for transcript parsing
- Alternative Python backend with spaCy

## License

NoFoodWaste
