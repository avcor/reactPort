import type { SkillGroup } from '@/types'

export const skills: SkillGroup[] = [
  {
    label: 'Android',
    skills: [
      'Jetpack Compose',
      'ViewModel',
      'LiveData',
      'Room',
      'WorkManager',
      'Dagger Hilt',
      'Coroutines & Flows',
      'Retrofit',
      'OkHttp',
      'Proguard',
    ],
  },
  {
    label: 'Architecture',
    skills: ['MVVM', 'Clean Architecture', 'Offline-First', 'Modular Design'],
  },
  {
    label: 'Cross-Platform',
    skills: ['Flutter', 'React Native'],
  },
  {
    label: 'Tooling',
    skills: [
      'Git',
      'GitHub Actions',
      'CI/CD',
      'Grafana',
      'Loki',
      'Firebase Crashlytics',
      'Remote Config',
      'App Distribution',
      'Play Store Publishing',
    ],
  },
  {
    label: 'Languages',
    skills: ['Kotlin', 'Java', 'Dart', 'TypeScript'],
  },
]
