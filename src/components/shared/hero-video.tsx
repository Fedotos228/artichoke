import { WPImages } from '@/types/wp.types'

export default function HeroVideo({ video, poster }: { video: WPImages, poster: WPImages }) {
  return (
    <div className='2xl:h-[800px] lg:h-[600px] h-[500px] w-full relative overflow-hidden '>
      <video
        src={video.source_url}
        loop
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        poster={poster.source_url}
        preload="metadata"
        className='w-full h-full object-cover'
      >
        <source type='video/webm' src={video.source_url} />
      </video>
    </div>
  )
}