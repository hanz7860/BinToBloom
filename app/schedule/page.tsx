import { ProtectedRoute } from '@/components/protected-route'
import { PickupForm } from '@/components/pickup-form'

export default function SchedulePage() {
  return (
    <ProtectedRoute allowedUserTypes={['household', 'restaurant']}>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Schedule Your Pickup
          </h1>
          <p className="text-gray-600 mt-2">
            Book a convenient time for waste collection
          </p>
        </div>
        <PickupForm />
      </div>
    </ProtectedRoute>
  )
}
