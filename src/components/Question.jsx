import { QUESTIONS } from '../data/content.js'

// step = 1..4 · onAnswer(option | null)  (null = ข้าม) · onBack = ย้อนกลับ
export default function Question({ step, onAnswer, onBack }) {
  const q = QUESTIONS[step - 1]
  return (
    <>
      <div className="flex h-11 items-center gap-2.5">
        <button aria-label="ย้อนกลับ" onClick={onBack}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[22px] font-bold text-ink hover:bg-white/70">←</button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-turq-2"
          role="progressbar" aria-valuenow={step} aria-valuemin={0} aria-valuemax={QUESTIONS.length}>
          <div className="h-full rounded-full bg-turq transition-[width] duration-[400ms]"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
        </div>
        <button className="link-skip" onClick={() => onAnswer(null)}>ข้าม</button>
      </div>
      <h1>{q.text}</h1>
      <p className="sub">ข้อ {step} จาก {QUESTIONS.length} · ไม่มีคำตอบที่ถูกหรือผิด</p>
      <div className="mt-4 flex flex-col gap-2.5">
        {q.options.map((o) => (
          <button key={o.label} className="opt opt-row" onClick={() => onAnswer(o)}>{o.label}</button>
        ))}
      </div>
    </>
  )
}
