import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'


import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (


    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} >
          <ToastProvider />
          {/* Its primary purpose is to ensure that the content within it is only rendered after the component has fully mounted. */}
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

{/* <div className="flex min-h-screen items-center justify-center">
  {children}
</div> */}
