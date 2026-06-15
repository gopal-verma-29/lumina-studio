/**
 * HOME PAGE — 8 tight sections only
 * Removed: Stats, Materials (full), About (full), PressAwards, AIBrief, BeforeAfter
 * Kept: Hero → Marquee → Services → FeaturedProject → Work(preview) → Process → Testimonials → Enquiry → CTA
 */
import Hero from '../components/sections/Hero'
import MarqueeBand from '../components/sections/MarqueeBand'
import FeaturedProject from '../components/sections/FeaturedProject'
import Work from '../components/sections/Work'
import Process from '../components/sections/Process'
import Testimonials from '../components/sections/Testimonials'
import Enquiry from '../components/sections/Enquiry'
import CTABanner from '../components/sections/CTABanner'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeBand />
      <FeaturedProject />
      {/* Preview mode: shows 3 cards + "View all projects" → /projects */}
      <Work preview={true} showFilter={false} />
      <Process />
      <Testimonials />
      <Enquiry />
      <CTABanner />
    </main>
  )
}
