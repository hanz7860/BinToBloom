"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TeamMember {
  name: string
  position: string
  description: string
  color: string
}

interface SimpleAvatarViewProps {
  teamMembers: TeamMember[]
}

export function SimpleAvatarView({ teamMembers }: SimpleAvatarViewProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {teamMembers.map((member) => (
          <Card
            key={member.name}
            className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
            onClick={() => setSelectedMember(member)}
            style={{ borderColor: member.color }}
          >
            <div className="h-40 flex items-center justify-center" style={{ backgroundColor: `${member.color}20` }}>
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
                style={{ backgroundColor: member.color, color: "white" }}
              >
                {member.name[0]}
              </div>
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold" style={{ color: member.color }}>
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.position}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6">
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: selectedMember.color }}
                >
                  {selectedMember.name[0]}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: selectedMember.color }}>
                  {selectedMember.name}
                </h3>
                <p className="text-gray-600 mb-2">{selectedMember.position}</p>
                <p className="text-gray-500 mb-4">{selectedMember.description}</p>
                <Button onClick={() => setSelectedMember(null)} style={{ backgroundColor: selectedMember.color }}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
