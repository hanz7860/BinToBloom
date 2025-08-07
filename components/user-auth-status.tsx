"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LogOut, User } from "lucide-react"

export function UserAuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user?.image ? (
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white"
            >
              <User className="h-4 w-4" />
            </motion.div>
          )}
          <span className="text-sm font-medium">{session.user?.name}</span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </motion.div>
      </div>
    )
  }

  return null
}
