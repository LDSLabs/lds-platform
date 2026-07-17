import { useTranslation } from 'react-i18next'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Product from './components/Product/Product.jsx'
import Benefits from './components/Benefits/Benefits.jsx'
import Roadmap from './components/Roadmap/Roadmap.jsx'
import WaitlistForm from './components/WaitlistForm/WaitlistForm.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const { t } = useTranslation()

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Product />
        <Benefits />
        <Roadmap />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  )
}

export default App
