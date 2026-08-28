import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { ValueProps } from "./components/ValueProps"
import { Services } from "./components/Services"
import { Products } from "./components/Products"
import { Mission } from "./components/Mission"
import { Sectors } from "./components/Sectors"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
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
