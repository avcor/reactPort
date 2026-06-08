import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.05em] text-text-muted">
            // projects
          </span>
        </ScrollReveal>

        <div className="mt-10 space-y-4">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} defaultOpen={index === 0} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
