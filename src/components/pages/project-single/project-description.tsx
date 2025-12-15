import { ProjectDetails } from '@/types/projects.type'
import { WPRendered } from '@/types/wp.types'

export default function ProjectDescription({ 
  content, 
  details 
}: {
  content: WPRendered,
  details: ProjectDetails[]
}) {
  return (
    <div>
      <h3>About the project</h3>
      <div className='grid grid-cols-2 mb-20'>
        <div>
          <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
        </div>
        <div className='justify-self-center'>
          {details.map((detail, idx) => (
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
