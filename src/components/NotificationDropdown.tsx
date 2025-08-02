"use client"

import type React from "react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchNotifications, markAsRead } from "../store/slices/notificationSlice"
import { formatDistanceToNow } from "date-fns"

interface NotificationDropdownProps {
  onClose: () => void
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector((state) => state.notifications)

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  const handleMarkAsRead = (notificationId: number) => {
    dispatch(markAsRead(notificationId))
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Notifications</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications yet</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
              onClick={() => {
                if (!notification.read) {
                  handleMarkAsRead(notification.id)
                }
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t">
        <button onClick={onClose} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  )
}

export default NotificationDropdown
