import { useState } from 'react';
import { Card, CardBody, Button, StatusBadge, Modal, showToast } from '../../components/common';
import { mockAssignments, mockHungerSpots } from '../../services/mockData';
import { 
  Plus, Eye, MapPin, Clock, CheckCircle, 
  Building2, Phone, User, Image as ImageIcon 
} from 'lucide-react';

export function PickupRequestsPage() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const handleVerify = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'verified',
              timeline: [
                ...a.timeline,
                {
                  status: 'verified',
                  timestamp: new Date().toISOString(),
                  note: 'Verified by coordinator',
                },
              ],
            }
          : a
      )
    );
    setSelectedAssignment(null);
    showToast('Pickup verified successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pickup Requests</h1>
          <p className="text-gray-500">Manage and verify pickup requests</p>
        </div>
        <Button icon={Plus}>Create New Pickup</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'assigned', 'reached', 'submitted', 'delivered', 'verified'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  filter === status
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} hoverable onClick={() => setSelectedAssignment(assignment)}>
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {assignment.pickup.organizationName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {assignment.pickup.contactPerson}
                  </p>
                </div>
                <StatusBadge status={assignment.status} />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{assignment.pickup.location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{assignment.delivery.hungerSpotName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>
                    {new Date(assignment.pickup.scheduledTime).toLocaleString()}
                  </span>
                </div>
              </div>

              {assignment.submittedDetails && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Collected:</p>
                  <p className="text-sm font-medium text-gray-700">
                    {assignment.submittedDetails.foodName} - {assignment.submittedDetails.quantityCollected}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        title="Pickup Details"
        size="lg"
      >
        {selectedAssignment && (
          <div className="p-6 space-y-6">
            {/* Organization Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Organization</p>
                <p className="font-medium">{selectedAssignment.pickup.organizationName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Contact Person</p>
                <p className="font-medium">{selectedAssignment.pickup.contactPerson}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{selectedAssignment.pickup.contactNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <StatusBadge status={selectedAssignment.status} />
              </div>
            </div>

            {/* Locations */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 font-medium mb-1">Pickup Location</p>
                <p className="text-sm">{selectedAssignment.pickup.location.address}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600 font-medium mb-1">Delivery Location</p>
                <p className="text-sm font-medium">{selectedAssignment.delivery.hungerSpotName}</p>
                <p className="text-xs text-gray-500">{selectedAssignment.delivery.location.address}</p>
              </div>
            </div>

            {/* Submitted Details */}
            {selectedAssignment.submittedDetails && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Submitted Details</h4>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Food Name</p>
                    <p className="font-medium">{selectedAssignment.submittedDetails.foodName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="font-medium">{selectedAssignment.submittedDetails.quantityCollected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pickup Time</p>
                    <p className="font-medium">
                      {new Date(selectedAssignment.submittedDetails.pickupTime).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Est. Delivery Time</p>
                    <p className="font-medium">
                      {selectedAssignment.submittedDetails.estimatedDeliveryTime
                        ? new Date(selectedAssignment.submittedDetails.estimatedDeliveryTime).toLocaleString()
                        : '-'}
                    </p>
                  </div>
                </div>

                {/* Images */}
                {selectedAssignment.submittedDetails.images?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</p>
                    <div className="flex gap-2">
                      {selectedAssignment.submittedDetails.images.map((url, i) => (
                        <div
                          key={i}
                          className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center"
                        >
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="secondary" onClick={() => setSelectedAssignment(null)}>
                Close
              </Button>
              {selectedAssignment.status === 'delivered' && (
                <Button
                  variant="success"
                  icon={CheckCircle}
                  onClick={() => handleVerify(selectedAssignment.id)}
                >
                  Verify Delivery
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default PickupRequestsPage;
