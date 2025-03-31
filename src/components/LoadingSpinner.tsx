export const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900/90 z-50 flex-col gap-6 p-6">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 rounded-full border-8 border-blue-900/30 animate-spin"></div>

      <div className="absolute inset-2 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 animate-spin duration-1000"></div>

      <div className="absolute inset-6 rounded-full bg-blue-800/20 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-400 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
    </div>
    <div className="text-center">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
        Loading FIFA 17 Data
      </h2>
      <p className="text-gray-400 max-w-md">
        Authenticating your session and loading the Ultimate Team experience...
      </p>
    </div>
    <div className="w-full max-w-xs h-1.5 bg-gray-800 rounded-full overflow-hidden mt-4">
      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 animate-progress"></div>
    </div>
  </div>
);
