import { WEATHERS } from '../data/content.js'

// answers = [option|null ×4]  (null = ข้ามคำถาม)
const HEAVY_THRESHOLD = 7 // คะแนนเต็ม 9 (base 2 + 2 + 1 + 2 + 2)

export function isHeavy(weatherKey, answers) {
  const sum = answers.reduce((t, a) => t + (a?.score ?? 0), 0)
  return WEATHERS[weatherKey].base + sum >= HEAVY_THRESHOLD
}

// ข้อความกำลังใจ: ตามสิ่งที่เลือกในข้อ 3 → ข้อ 4 → ถ้าข้ามทั้งคู่ สุ่มจากชุดของสภาพอากาศ
export function supportMessage(weatherKey, answers) {
  const [, , a3, a4] = answers
  if (a3?.msg) return a3.msg
  if (a4?.msg) return a4.msg
  const lines = WEATHERS[weatherKey].lines
  return lines[Math.floor(Math.random() * lines.length)]
}

export const nextAction = (answers) => answers[2]?.action ?? 'rest'

// ประกอบประโยคสะท้อนใจจากวลีสำเร็จรูปของแต่ละตัวเลือก
export function buildReflection(weatherKey, answers) {
  const [a1, a2, , a4] = answers
  const second = a1?.phrase
    ? a1.phrase + (a2?.topic ? ` โดยเฉพาะ${a2.topic}` : '')
    : a2?.topic ? `วันนี้${a2.topic}ใช้พลังใจอยู่` : ''
  const release = a4 && !a4.skip ? `สิ่งที่อยากวางลงสักครู่คือ${a4.label}` : ''
  return [WEATHERS[weatherKey].lead, second, release].filter(Boolean).join(' ')
}
