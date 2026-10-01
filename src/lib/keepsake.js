import { WEATHERS, MASCOT_NAME } from '../data/content.js'
import { iconShapes } from './weatherSvg.js'

const FONT = '"Gotham Rounded","Noto Sans Thai",Tahoma,sans-serif'
const FILE_NAME = 'ooca-mood-check-in.png'
const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src })

// วาดการ์ด 1080x1350 บน canvas ในเครื่องผู้ใช้ ไม่ส่งข้อมูลไปไหน
export async function drawKeepsake(weatherKey, line) {
  const w = WEATHERS[weatherKey]
  try { await Promise.all([document.fonts.load(`800 60px ${FONT}`), document.fonts.load(`500 40px ${FONT}`)]) } catch { /* ใช้ฟอนต์สำรอง */ }
  const [mascot, icon] = await Promise.all([
    load(`${import.meta.env.BASE_URL}mascot/${w.mascot}.webp`),
    load('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${iconShapes(weatherKey, w.color)}</svg>`)),
  ])
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1350
  const x = c.getContext('2d')
  // จัดกึ่งกลางเอง ไม่พึ่ง textAlign='center' (บางมือถือจัดข้อความไทยเพี้ยน)
  x.direction = 'ltr'; x.textAlign = 'left'
  const centered = (t, y) => x.fillText(t, (1080 - x.measureText(t).width) / 2, y)
  const g = x.createLinearGradient(0, 0, 0, 1350); g.addColorStop(0, w.bg[0]); g.addColorStop(1, w.bg[1])
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1350)
  x.fillStyle = w.color; x.fillRect(0, 0, 1080, 16)

  const r = Math.min(520 / mascot.width, 420 / mascot.height)
  const mw = mascot.width * r, mh = mascot.height * r
  x.drawImage(mascot, (1080 - mw) / 2, 530 - mh, mw, mh)
  x.drawImage(icon, 485, 560, 110, 110)

  x.fillStyle = '#355956'
  x.font = `800 72px ${FONT}`; centered(w.title, 770)

  // ตัดบรรทัดภาษาไทยตามคำด้วย Intl.Segmenter
  const rowsOf = (text, max, font) => {
    x.font = font
    const parts = typeof Intl.Segmenter === 'function'
      ? [...new Intl.Segmenter('th', { granularity: 'word' }).segment(text)].map((s) => s.segment) : [...text]
    const rows = []; let row = ''
    for (const p of parts) {
      if (x.measureText(row + p).width > max && row) { rows.push(row); row = p.trimStart() } else row += p
    }
    rows.push(row)
    return rows.map((t) => t.trim())
  }
  const wrap = (text, max, y, step, font) => rowsOf(text, max, font).forEach((t, i) => centered(t, y + i * step))
  wrap(w.summary, 880, 845, 56, `500 38px ${FONT}`)
  // กล่องกำลังใจ: ปรับความสูงตามบรรทัด ถ้าเกิน 3 บรรทัดลดขนาดตัวอักษร
  let fs = 40, st = 58, rows = rowsOf(line, 780, `600 ${fs}px ${FONT}`)
  if (rows.length > 3) { fs = 34; st = 50; rows = rowsOf(line, 780, `600 ${fs}px ${FONT}`) }
  const bh = Math.max(170, rows.length * st + 70)
  x.fillStyle = 'rgba(255,255,255,.85)'; x.beginPath(); x.roundRect(90, 985, 900, bh, 40); x.fill()
  x.fillStyle = '#009688'; x.font = `600 ${fs}px ${FONT}`
  rows.forEach((t, i) => centered(t, 985 + bh / 2 - ((rows.length - 1) * st) / 2 + fs * 0.35 + i * st))
  x.fillStyle = '#355956'; x.font = `500 30px ${FONT}`
  centered(new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }), 1268)
  centered('2-Minute Mood Weather · ooca', 1312)

  return new Promise((res) => c.toBlob(res, 'image/png'))
}

export function downloadBlob(blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = FILE_NAME
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}

export function shareBlob(blob) {
  const file = new File([blob], FILE_NAME, { type: 'image/png' })
  const data = { title: 'ใจวันนี้เป็นอากาศแบบไหน', text: `ลองเช็กอินใจ 2 นาทีกับ${MASCOT_NAME}` }
  const canFile = navigator.canShare?.({ files: [file] })
  return (canFile ? navigator.share({ ...data, files: [file] }) : navigator.share(data)).catch(() => {})
}