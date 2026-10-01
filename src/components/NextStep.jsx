import { useState } from 'react'
import { SMALL_STEPS, OOCA_URL, MASCOT_NAME } from '../data/content.js'
import Mascot from './Mascot.jsx'

// เลือกแสดงตาม action ที่ได้จากคำตอบข้อ 3
export default function NextStep({ action }) {
  switch (action) {
    case 'vent': return <NoteBox title="ลองบอกสิ่งที่อยู่ในใจ" desc="ไม่ต้องเรียบเรียงให้ดี เขียนออกมาตามที่เป็นได้เลย ข้อความนี้อยู่แค่ในเครื่องคุณ" placeholder="ตอนนี้ฉันอยากบอกว่า…" cta="วางข้อความนี้ไว้ตรงนี้" />
    case 'organize': return <NoteBox title="จัดความคิดออกมา 1 เรื่อง" desc="เลือกเรื่องหนึ่งที่วนอยู่ในหัว แล้วเขียนมันออกมาสั้นๆ เพื่อให้มันอยู่นอกหัวสักครู่" placeholder="เรื่องที่ฉันอยากจัดความคิดคือ…" cta="เขียนไว้ตรงนี้" />
    case 'smallStep': return <SmallStep />
    case 'company': return <Company />
    default: return <Breathing />
  }
}

function Breathing() {
  const [going, setGoing] = useState(false)
  return (
    <div>
      <h2>ให้ใจได้พัก 1 นาที</h2>
      <p className="sub">ไม่ต้องแก้ปัญหาอะไรตอนนี้ แค่หยุดจากสิ่งรอบตัวสักครู่ แล้วหายใจตามจังหวะนี้</p>
      <div className={`mx-auto my-3.5 grid size-[110px] place-items-center rounded-full bg-turq-2 font-extrabold text-turq-text ${going ? 'animate-breathe' : ''}`}>
        {going ? 'หายใจตาม…' : 'พร้อมไหม'}
      </div>
      <button className="btn" onClick={() => setGoing(true)}>เริ่มหายใจ</button>
    </div>
  )
}

// ช่องเขียนข้อความ: ไม่เก็บอะไร กด "วาง" แล้วข้อความหายไป หรือคัดลอกไปเก็บเองได้
function NoteBox({ title, desc, placeholder, cta }) {
  const [text, setText] = useState('')
  const [released, setReleased] = useState(false)
  const [copied, setCopied] = useState(false)
  const release = () => text.trim() && (setText(''), setReleased(true))
  const copy = async () => {
    if (!text.trim()) return
    try { await navigator.clipboard.writeText(text); setCopied(true) } catch { /* เบราว์เซอร์ไม่อนุญาต */ }
  }
  if (released) {
    return (
      <div className="text-center">
        <Mascot name="pray" width={110} className="mx-auto" />
        <h2 className="mt-2">{MASCOT_NAME}รับฟังแล้วนะ</h2>
        <p className="sub">ขอบคุณที่บอกออกมา ข้อความนี้หายไปแล้ว ไม่มีใครเห็น</p>
      </div>
    )
  }
  return (
    <div>
      <h2>{title}</h2>
      <p className="sub">{desc}</p>
      <input value={text} maxLength={140} placeholder={placeholder} aria-label={title}
        onChange={(e) => { setText(e.target.value); setCopied(false) }}
        onKeyDown={(e) => e.key === 'Enter' && release()}
        className="w-full rounded-lg border-2 border-turq-2 bg-white p-3" />
      <button className="btn mt-2.5" disabled={!text.trim()} onClick={release}>{cta}</button>
      <button className="link-skip mx-auto mt-2.5 block" onClick={copy}>{copied ? 'คัดลอกแล้ว' : 'คัดลอกไว้ในโน้ตของฉัน'}</button>
    </div>
  )
}

function SmallStep() {
  const [picked, setPicked] = useState(null)
  if (picked) {
    return (
      <div className="text-center">
        <Mascot name="hug" width={100} className="mx-auto" />
        <h2 className="mt-2">ก้าวเล็กๆ ของวันนี้</h2>
        <p className="sub">“{picked}” แค่นี้ก็พอแล้ว</p>
      </div>
    )
  }
  return (
    <div>
      <h2>เลือกก้าวเล็กๆ แค่ 1 อย่าง</h2>
      <p className="sub">ไม่ต้องจัดการทุกอย่างพร้อมกัน เลือกสิ่งที่เล็กที่สุดที่ทำได้ภายในวันนี้</p>
      <div className="mt-3 flex flex-col gap-2.5">
        {SMALL_STEPS.map((s) => <button key={s} className="opt opt-row" onClick={() => setPicked(s)}>{s}</button>)}
      </div>
    </div>
  )
}

function Company() {
  return (
    <div>
      <h2>ลองให้ตัวเองมีใครสักคนรับฟัง</h2>
      <p className="sub">ถ้าตอนนี้ไม่อยากอยู่กับความรู้สึกนี้คนเดียว การคุยกับคนที่ไว้ใจหรือผู้เชี่ยวชาญก็เป็นทางเลือกหนึ่ง</p>
      <Mascot name="chat" width={104} className="mx-auto my-2" />
      <a className="btn btn-sec" href={OOCA_URL} target="_blank" rel="noopener">ดูนักจิตวิทยา ooca</a>
    </div>
  )
}
