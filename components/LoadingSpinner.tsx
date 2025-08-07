export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading BinToBloom
          </h2>
          <p className="text-gray-600">
            Preparing your sustainable experience...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
