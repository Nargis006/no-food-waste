# Technical Analysis of NoFoodWaste Project

## 1. User Roles

### Defined Roles
- **Admin**: Full system access, user management, analytics, pickup assignments.
- **Coordinator**: Pickup request management, driver status tracking, delivery verification.
- **Driver**: View assignments, submit pickup details, voice input support.

### Role Permissions
- **Admin**: Full system access, user management, analytics, pickup assignments.
- **Coordinator**: Pickup request management, driver status tracking, delivery verification.
- **Driver**: View assignments, submit pickup details, voice input support.

## 2. Authentication and Authorization

### Login Mechanism
- **For Testin**
- Mock users are defined in `AuthContext.jsx`.
- Login validates credentials against `MOCK_USERS`.
- Successful login stores user details in `localStorage`.

### Authorization
- `hasRole` function checks if the user has the required role(s).
- `isAdmin`, `isCoordinator`, `isDriver` flags are derived from the user's role.

## 3. Lifecycle of Key Processes

### Schedule Creation
- Not explicitly implemented in the codebase.

### Driver Assignment
- Need to implement.

### Pickup Submission
- Drivers submit pickup details via forms (UI components like `PickupForm.jsx`).

### Drop Submission
- Need to implement.

### Manual Verification
- Coordinators verify deliveries.

## 4. API Endpoints

- `/process-audio`:
  - Accepts audio files, transcribes them, and extracts metadata.
- No other endpoints are explicitly defined in the extracted code.

## 5. UI Routes

### Admin Pages
- `AnalyticsPage.jsx`
- `AssignPickupsPage.jsx`
- `UserManagementPage.jsx`

### Coordinator Pages
- `DriverStatusPage.jsx`
- `PickupRequestsPage.jsx`

### Driver Pages
- `AssignmentsPage.jsx`

## 6. Database Interaction
- Need to implement.

## 7. State Transitions
- Driver workflow includes the following states:
  - `Assigned → Reached → Submitted → Delivered → Verified`.
