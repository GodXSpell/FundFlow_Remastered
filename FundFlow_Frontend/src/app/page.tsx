"use client"

import { Button } from "@/components/ui/button"
import Snowfall from 'react-snowfall'

export default function RootPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background Snowfall */}
      <div className="absolute inset-0 z-0">
        <Snowfall
          color="#3b82f6" // Light blue snow
          snowflakeCount={200}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">

        {/* Logo Area */}
        <div className="flex items-center gap-2 mb-8 animate-fade-in-up">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.6 10.8L13.2 2.4C12.8 2 12.2 2 11.8 2.4L3.4 10.8C3 11.2 3 11.8 3.4 12.2L11.8 20.6C12.2 21 12.8 21 13.2 20.6L21.6 12.2C22 11.8 22 11.2 21.6 10.8Z" fill="#3b82f6" fillOpacity="0.2" />
            <path d="M12.5 6.5L17.5 11.5L12.5 16.5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xl font-medium text-slate-300">Google Antigravity</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
          TRACK. SAVE. THRIVE <br />
          <span className="text-slate-400 text-3xl md:text-5xl">We promise no migraines here</span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Button
            size="lg"
            className="h-14 px-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-base font-medium transition-transform hover:scale-105"
          >
            <span className="mr-2">❖</span> Download for Windows
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-8 rounded-full bg-slate-800 text-white hover:bg-slate-700 text-base font-medium transition-transform hover:scale-105"
          >
            Explore use cases
          </Button>
        </div>

      </div>
    </div>
  )
}