'use client'

interface Props {
  error: Error
  reset: () => void
}

const ErrorPage = ({ error, reset }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-2xl font-bold text-error">Something went wrong</h2>
      <p className="text-gray-500">{error.message}</p>
      <button className="btn btn-primary btn-sm" onClick={() => reset()}>
        Retry
      </button>
    </div>
  )
}

export default ErrorPage
