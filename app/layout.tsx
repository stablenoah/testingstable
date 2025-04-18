import { Inter, Cinzel, Space_Grotesk } from 'next/font/google'
import { Shell } from '@/components/layout/Shell'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata = {
  title: 'StableHold Vault | Elite Stallion Stud Fee Yields',
  description: 'Earn yield from elite stallion stud fees in the StableHold Vault.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable} ${spaceGrotesk.variable} font-inter`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  )
} 