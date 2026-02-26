import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './pages/Hero'
import Content from './pages/Content'
import { useEffect, useState } from 'react'

function App() {
  const [schemes, setSchemes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [language, setLanguage] = useState('english')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleSearch = async (payload) => {
    try {
      setHasSubmitted(true)
      setIsLoading(true)
      setError('')

      const response = await fetch('http://localhost:8080/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch schemes')
      }

      const data = await response.json()
      setSchemes(data.recommendedSchemes || [])
    } catch (apiError) {
      console.error('API error:', apiError)
      setSchemes([])
      setError('Could not fetch schemes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
        }
      />
      <main>
        <Hero
          onSearch={handleSearch}
          language={language}
          isFullHeight={!hasSubmitted}
        />
        {hasSubmitted && (
          <Content
            schemes={schemes}
            isLoading={isLoading}
            error={error}
            language={language}
          />
        )}
      </main>
      {/* <Footer language={language} /> */}
    </>
  )
}

export default App
