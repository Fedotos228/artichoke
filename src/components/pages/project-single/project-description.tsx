import { ProjectDetails } from '@/types/projects.type'
import { WPRendered } from '@/types/wp.types'

export default function ProjectDescription({ 
  content, 
  details,
  text
}: {
  content: WPRendered,
  details: ProjectDetails[]
  text: string
}) {
  return (
    <div>
      <h3>{text}</h3>
      <div className='grid md:grid-cols-2 mb-10 md:mb-20'>
        <div>
          <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
        </div>
        <div className='mt-6 md:mt-0 md:justify-self-center'>
          {details.map((detail, idx) => (
            <div key={idx} className='flex items-center gap-1.5 md:block mb-4 last:mb-0'>
              <strong>{detail.label}:</strong>
              <p>{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
