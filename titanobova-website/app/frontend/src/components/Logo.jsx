import React from 'react'

export default function Logo() {
  return (
    <div className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer">
      <img 
        src="/Titanobova-private-limited.png" 
        alt="Titanobova Private Limited" 
        className="w-12 h-12"
      />
      <div className="flex flex-col">
        <span className="font-bold text-lg bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent leading-tight">TITANOBOVA</span>
        <span className="text-xs font-semibold text-amber-700">Private Limited</span>
      </div>
    </div>
  )
}
