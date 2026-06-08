import { useState, useEffect, useRef } from 'react'

interface TypewriterOptions {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseAfterTyped?: number
  pauseAfterDeleted?: number
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseAfterTyped = 1800,
  pauseAfterDeleted = 400,
}: TypewriterOptions) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const wordIndex = useRef(0)

  useEffect(() => {
    const current = words[wordIndex.current % words.length]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1))
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseAfterTyped)
          }
        } else {
          setText(current.slice(0, text.length - 1))
          if (text.length - 1 === 0) {
            setIsDeleting(false)
            wordIndex.current += 1
            setTimeout(() => {}, pauseAfterDeleted)
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting, words, typeSpeed, deleteSpeed, pauseAfterTyped, pauseAfterDeleted])

  return text
}
