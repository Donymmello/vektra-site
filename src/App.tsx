import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { ValueProps } from "./components/ValueProps"
import { Services } from "./components/Services"
import { Products } from "./components/Products"
import { Mission } from "./components/Mission"
import { Sectors } from "./components/Sectors"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { CookieConsent } from "./components/CookieConsent"

function App() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Visible only once focused: lets keyboard users jump the nav row. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-control focus:bg-text focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-bg"
      >
        Saltar para o conteúdo
      </a>
      {/* Rendered here, not at the end of the tree: it is position:fixed so
          the visual result is identical, but in DOM order it used to be the
          last thing on the page, putting "Aceitar" at tab stop 18 of 19. A
          banner covering the viewport from first paint has to be reachable
          before the content it covers. */}
      <CookieConsent />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <ValueProps />
        <Services />
        <Products />
        <Mission />
        <Sectors />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
