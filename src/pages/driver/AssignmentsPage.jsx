import { DriverAssignmentsGrid } from '../../components/driver';

export function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
        <p className="text-gray-500">View and manage your assigned pickups</p>
      </div>

      <DriverAssignmentsGrid />
    </div>
  );
}

export default AssignmentsPage;
