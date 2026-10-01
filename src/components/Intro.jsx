import { WEATHERS, MASCOT_NAME } from '../data/content.js'
import Mascot from './Mascot.jsx'
import WeatherIcon from './WeatherIcon.jsx'

export default function Intro({ onPick }) {
  return (
    <>
      <div className="mt-6 flex items-end gap-3">
        <Mascot name="hug" width={96} />
        <div className="flex-1 rounded-[18px_18px_18px_4px] bg-white px-3.5 py-3 text-[15px]">
          สวัสดี เราคือ{MASCOT_NAME} 2 นาทีนี้ ลองสำรวจใจไปด้วยกันนะ
        </div>
      </div>
      <h1>ตอนนี้ใจคุณเป็นอากาศแบบไหน?</h1>
      <p className="sub">เลือกอันที่ใกล้เคียงที่สุด ไม่มีถูกไม่มีผิด</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {Object.entries(WEATHERS).map(([key, w]) => (
          <button key={key} className="opt flex-col" onClick={() => onPick(key)}>
            <WeatherIcon kind={key} />
            {w.label}
          </button>
        ))}
      </div>
      <div className="card text-center text-sm">
        คำตอบนี้เป็นเพียงการสะท้อนใจสั้นๆ ไม่ใช่แบบประเมินหรือการวินิจฉัย และคุณข้ามคำถามได้เสมอ
      </div>
    </>
  )
}
