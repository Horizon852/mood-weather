import { WEATHERS } from '../data/content.js'
import { iconShapes } from '../lib/weatherSvg.js'

export default function WeatherIcon({ kind, size = 64 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: iconShapes(kind, WEATHERS[kind].color) }} />
  )
}
