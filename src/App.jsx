import { useState } from 'react'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Ready to Create?</h1>
        <p className="subtitle">
          Your project is set up and ready. Update <code>App.jsx</code> to build something amazing!
        </p>
      </header>
      
      <main>
        {/* Your code goes here */}
        <section className="welcome-section">
          <p>
            This template includes <strong>Inter</strong> font, modern CSS variables, 
            and a sleek gradient background.
          </p>
          <div className="action-area">
             <button onClick={() => console.log("HBD! Time to code.")}>
               Start Building
             </button>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} - Built with Vite + React</p>
      </footer>

      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 4rem 2rem;
        }

        .subtitle {
          font-size: 1.1em;
          color: #888;
          margin-top: -1rem;
        }

        .welcome-section {
          background: rgba(255, 255, 255, 0.03);
          padding: 3rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          max-width: 600px;
          margin-top: 2rem;
        }

        .action-area {
          margin-top: 2rem;
        }

        footer {
          margin-top: 4rem;
          font-size: 0.9em;
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}

export default App
