// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'My Next.js App',
  description: 'A basic layout example in Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header style={{ padding: '1rem', background: '#f5f5f5' }}>
          <h1>My App Header</h1>
        </header>

        <main style={{ padding: '2rem' }}>
          {children}
        </main>

        <footer style={{ padding: '1rem', background: '#f5f5f5', marginTop: '2rem' }}>
          <p>&copy; 2025 My App</p>
        </footer>
      </body>
    </html>
  )
}
