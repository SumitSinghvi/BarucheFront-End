import React from 'react'

export default function Newsletter() {
  return (
    <div className="flex flex-col justify-center items-center py-32 bg-gray-100">
        <p className="text-3xl text-gray-500 py-4">Join our WhatsApp Channel</p>
        <p className="text-xm text-gray-500 pb-6">Vote on the Next Collection</p>
        <button onClick={() => {window.open('https://whatsapp.com/channel/0029VaKim8G4o7qFlOdIsT05', '_blank');}} className="bg-black text-white py-2 px-4 focus:outline-none focus:shadow-outline">Join Baruche WhatsApp</button>  
    </div>
  )
}
