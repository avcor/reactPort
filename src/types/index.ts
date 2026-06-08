export interface ExperienceItem {
  id: number
  company: string
  role: string
  period: string
  location: string
  current: boolean
  bullets: string[]
  chips: string[]
}

export interface Project {
  id: number
  name: string
  tagline: string
  tech: string[]
  problem: string
  solution: string
  impact: string
  screenshots: string[]
  github: string
  playstore: string
  badge: string | null
}

export interface SkillGroup {
  label: string
  skills: string[]
}

export interface AboutData {
  bio: string[]
  interests: Interest[]
}

export interface Interest {
  icon: string
  title: string
  description: string
}
