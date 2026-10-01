import { MASCOT_NAME } from '../data/content.js'

// name = hug | rain | sad | chat | pray (ไฟล์อยู่ใน public/mascot)
export default function Mascot({ name, width, float = false, className = '' }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}mascot/${name}.webp`}
      alt={MASCOT_NAME}
      width={width}
      className={`h-auto ${float ? 'animate-float' : ''} ${className}`}
    />
  )
}
