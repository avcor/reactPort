import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { OpeningSequence } from '@/components/sections/OpeningSequence'
import { ChapterTransition } from '@/components/sections/ChapterTransition'
import { Ch1Performance } from '@/components/sections/Ch1Performance'
import { Ch2Reliability } from '@/components/sections/Ch2Reliability'
import { Ch3Modernizing } from '@/components/sections/Ch3Modernizing'
import { Ch4Trust } from '@/components/sections/Ch4Trust'
import { Ch5Product } from '@/components/sections/Ch5Product'
import { FinalChapter } from '@/components/sections/FinalChapter'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main>
        <OpeningSequence />

        <Ch1Performance />

        <ChapterTransition
          statement="Speed solved one problem."
          followUp="Reliability solves another."
          chapterNumber="Chapter 02"
          chapterLabel="Building Reliable Systems"
        />

        <Ch2Reliability />

        <ChapterTransition
          statement="Reliable systems age."
          followUp="Great engineers make them evolve."
          chapterNumber="Chapter 03"
          chapterLabel="Modernizing Platforms"
        />

        <Ch3Modernizing />

        <ChapterTransition
          statement="Authentication proves identity."
          followUp="Trust proves presence."
          chapterNumber="Chapter 04"
          chapterLabel="Trust & Verification"
        />

        <Ch4Trust />

        <ChapterTransition
          statement="The hardest engineering problems"
          followUp="are the ones that begin in a requirements doc."
          chapterNumber="Chapter 05"
          chapterLabel="Product Engineering"
        />

        <Ch5Product />

        <FinalChapter />

        <Contact />
      </main>
      <Footer />
    </div>
  )
}
