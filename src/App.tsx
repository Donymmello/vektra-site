import { lazy, Suspense, useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { ValueProps } from "./components/ValueProps"
import { Services } from "./components/Services"
import { Products } from "./components/Products"
import { Mission } from "./components/Mission"
import { Team } from "./components/Team"
import { Sectors } from "./components/Sectors"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { CookieConsent } from "./components/CookieConsent"
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion"

gsap.registerPlugin(ScrollTrigger)

const HeroScene = lazy(() => import("./components/HeroScene"))

function App() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({ autoRaf: false, anchors: true })
    const updateScrollTrigger = () => ScrollTrigger.update()
    const raf = (time: number) => lenis.raf(time * 1000)
    lenis.on("scroll", updateScrollTrigger)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const context = gsap.context(() => {
      gsap.from("#top .hero-intro-item", {
        y: 24,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all",
      })

      gsap.to(".site-atmosphere__parallax", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: "#conteudo",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>("#conteudo > section:not(#top)").forEach((section) => {
        const targets = section.querySelectorAll<HTMLElement>("h2, .card, article, form")
        if (!targets.length) return

        gsap.from(targets, {
          y: 22,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        })
      })
    })

    return () => {
      context.revert()
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.off("scroll", updateScrollTrigger)
      lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <div className="relative isolate min-h-screen bg-bg">
      <div className="site-atmosphere fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="site-atmosphere__parallax">
          <div className="ambient-grid absolute inset-0" />
          <div className="bloom absolute inset-0" />
          <div className="site-atmosphere__scene">
            <Suspense fallback={null}>
              <HeroScene interactive={!reducedMotion} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="relative z-[1]">
        {/* Visible only once focused: lets keyboard users jump the nav row. */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-control focus:bg-text focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-bg"
        >
          Saltar para o conteúdo
        </a>
        {/* Rendered early in the DOM so the overlay's actions are reachable
            before the content it covers. */}
        <CookieConsent />
        <Navbar />
        <main id="conteudo">
          <Hero />
          <ValueProps />
          <Services />
          <Products />
          <Mission />
          <Team />
          <Sectors />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
