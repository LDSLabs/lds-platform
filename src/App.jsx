import { useTranslation } from 'react-i18next'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Product from './components/Product/Product.jsx'
import Benefits from './components/Benefits/Benefits.jsx'
import Roadmap from './components/Roadmap/Roadmap.jsx'
import WaitlistForm from './components/WaitlistForm/WaitlistForm.jsx'
import Footer from './components/Footer/Footer.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.jsx'
import { isPrivacyRoute } from './utils/routing.js'

function App() {
  const { t } = useTranslation()
  const showPrivacyPolicy = isPrivacyRoute()

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <Header />
      <main id="main-content">
        {showPrivacyPolicy ? (
          <PrivacyPolicy />
        ) : (
          <>
            <Hero />
            <Product />
            <Benefits />
            <Roadmap />
            <WaitlistForm />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
