import { Check, LoaderCircle } from 'lucide-react'

const steps = ['Brief', 'Outline', 'Composition', 'Asset', 'Build']

export function JobProgressBanner({ current = 2 }: { current?: number }) {
  return (
    <div className="job-progress" aria-label="Avanzamento generazione">
      {steps.map((step, index) => (
        <div className={`progress-step ${index < current ? 'complete' : ''} ${index === current ? 'current' : ''}`} key={step}>
          <span className="step-icon">{index < current ? <Check size={13} /> : index === current ? <LoaderCircle size={13} className="spin" /> : index + 1}</span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  )
}
