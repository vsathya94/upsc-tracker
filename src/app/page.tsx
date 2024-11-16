// File: app/page.js

import Image from "next/image";
import UPSCTracker from './UPSCTracker'; // Adjust this import if the file is in a different location
console.log('UPSCTracker:', UPSCTracker); // Should print a function, not undefined or an object

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center mb-12">
        <Image
          className="dark:invert mx-auto"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
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
