import '@/styles/globals.css';

export const metadata = {
  title: 'spotify stats',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:title" content="NEXT SPOTIFY STATS" />
        <meta property="og:description" content="Search for an artist on Spotify" />
        <meta property="twitter:image" content="/logo.png" />
        <meta property="twitter:title" content="NEXT SPOTIFY STATS" />
        <meta property="twitter:description" content="Search for an artist on Spotify" />
      </head>

      <body>
        {children}
      </body>
    </html>
  )
}
