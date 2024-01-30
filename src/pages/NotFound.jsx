import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
        <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
        <h1 className="text-2xl-semi text-ui-fg-base">Page not found</h1>
        <p className="text-small-regular text-ui-fg-base">
            The page you tried to access does not exist.
        </p>
        <Link
        to="/">
        <p className='text-blue-400'>Go to frontpage</p>
        </Link>
        </div>
    </div>
  )
}
