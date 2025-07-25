"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PickupForm() {
  const [formData, setFormData] = useState({
    scheduledDateTime: "",
    address: "",
    contactNumber: "",
    specialInstructions: "",
    estimatedWeight: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/schedule-pickup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          scheduledDateTime: new Date(formData.scheduledDateTime).toISOString(),
          estimatedWeight: Number.parseFloat(formData.estimatedWeight) || 0,
        }),
      })

      if (response.ok) {
        setMessage("Pickup scheduled successfully!")
        setFormData({
          scheduledDateTime: "",
          address: "",
          contactNumber: "",
          specialInstructions: "",
          estimatedWeight: "",
        })
      } else {
        setMessage("Failed to schedule pickup. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-gray-200">
      <CardHeader>
        <CardTitle>Schedule a Pickup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="scheduledDateTime" className="block text-sm font-medium mb-1">
              Pickup Date & Time
            </label>
            <input
              type="datetime-local"
              id="scheduledDateTime"
              name="scheduledDateTime"
              value={formData.scheduledDateTime}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200"
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200"
            />
          </div>

          <div>
            <label htmlFor="estimatedWeight" className="block text-sm font-medium mb-1">
              Estimated Weight (kg)
            </label>
            <input
              type="number"
              id="estimatedWeight"
              name="estimatedWeight"
              value={formData.estimatedWeight}
              onChange={handleChange}
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200"
            />
          </div>

          <div>
            <label htmlFor="specialInstructions" className="block text-sm font-medium mb-1">
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
          >
            {isSubmitting ? "Scheduling..." : "Schedule Pickup"}
          </Button>

          {message && (
            <div className={`text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
