import './globals.css'

export const metadata = {
  title: 'OpenAI API Samples',
  description: 'OpenAI API Samples',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={`wrapper`}>
          {children}
        </div>
      </body>
    </html>
  )
}
