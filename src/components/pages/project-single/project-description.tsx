import { ProjectSingle } from '@/types/projects.type'

export default function ProjectDescription({ description }: Pick<ProjectSingle, 'description'>) {
  return (
    <div>
      <h3>About the project</h3>
      <div className='grid grid-cols-2 mb-20'>
        <div>
          {description.paragraph.map((p, idx) => (
            <p key={idx} className='mb-4 last:mb-0'>
              {p}
            </p>
          ))}
        </div>
        <div className='justify-self-center'>
          {description.details.map((detail, idx) => (
            <div key={idx} className='mb-4 last:mb-0'>
              <strong>{detail.label}:</strong>
              <p>{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
