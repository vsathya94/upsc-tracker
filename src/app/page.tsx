// File: app/page.tsx

import React from 'react';
import UPSCTracker from './UPSCTracker'; // Ensure the path is correct

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center mb-12">
        {/* Title instead of Image */}
        <h1 className="text-4xl font-bold mb-4">UPSC Prep Tracker</h1>
      </header>
      
      {/* UPSC Tracker Component */}
      <main>
        <UPSCTracker />
      </main>
      
      <footer className="text-center mt-12">
        <p className="text-sm">Powered by Next.js & Vercel</p>
        <a
          className="hover:underline"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deploy on Vercel
        </a>
      </footer>
    </div>
  );
}
