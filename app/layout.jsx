import '@styles/globals.css';
// change the metadata to our application 
export const metadata = {
  title: "share_prompts_project",
  description: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;