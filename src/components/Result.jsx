import { useState } from 'react'
import { WEATHERS, QUESTIONS, OOCA_URL, MASCOT_NAME } from '../data/content.js'
import { buildReflection, isHeavy, nextAction, supportMessage } from '../lib/reflection.js'
import Mascot from './Mascot.jsx'
import WeatherIcon from './WeatherIcon.jsx'
import NextStep from './NextStep.jsx'
import SupportCard from './SupportCard.jsx'
import Keepsake from './Keepsake.jsx'
import Footer from './Footer.jsx'

export default function Result({ weather, answers, onRestart }) {
  const w = WEATHERS[weather]
  const [line] = useState(() => supportMessage(weather, answers)) // สุ่มครั้งเดียว ใช้ทั้งหน้าและการ์ด
  const reflection = buildReflection(weather, answers)
  const heavy = isHeavy(weather, answers)
  const need = answers[2]

  return (
    <div className="pt-2 pb-5">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[34px] p-3 shadow-[0_16px_32px_rgba(0,196,179,.10)]"
        style={{ background: `linear-gradient(145deg, ${w.bg[0]}, ${w.bg[1]})` }}>
        <span className="pointer-events-none absolute -top-20 -right-[90px] size-[180px] rounded-full bg-white/50" />
        <span className="pointer-events-none absolute bottom-10 -left-20 size-[140px] rounded-full bg-white/35" />
        <div className="relative z-10 rounded-[28px] border border-white/90 bg-white/80 px-5 pt-6 pb-[22px] text-center backdrop-blur-sm">
          <Mascot name={w.mascot} float className="mx-auto mb-0.5 max-h-[126px] w-auto drop-shadow-[0_8px_12px_rgba(53,89,86,.10)]" />
          <div className="mx-auto mb-2.5 inline-flex size-16 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(53,89,86,.10)]">
            <WeatherIcon kind={weather} size={42} />
          </div>
          <div>
            <span className="mb-[7px] inline-block rounded-full border border-turq/15 bg-white/70 px-3 py-[5px] text-[13px] font-extrabold">
              <span className="mr-1.5 inline-block size-2 rounded-full" style={{ background: w.color }} />
              สภาพใจวันนี้ · {w.label}
            </span>
          </div>
          <h1 className="mt-0.5 mb-[9px] text-[28px] leading-[1.3]">{w.title}</h1>
          <p className="mx-auto max-w-[350px] text-[15px] leading-[1.78] opacity-90">{reflection}</p>
          <div className="mx-auto mt-[18px] max-w-[350px] rounded-[20px] border-l-[5px] bg-white px-[18px] py-4 text-left font-extrabold shadow-[0_8px_18px_rgba(53,89,86,.07)]"
            style={{ borderColor: w.color }}>
            <div className="mb-1 text-xs opacity-70">{MASCOT_NAME}อยากบอกว่า</div>
            {line}
          </div>
        </div>
      </div>

      {/* Next step */}
      <section className="mt-6 px-0.5">
        <div className="mb-1 text-[13px] font-extrabold text-turq-text">ก้าวเล็กๆ สำหรับตอนนี้</div>
        <h2 className="text-[21px]">{need ? `เพราะคุณเลือก “${need.label}”` : 'ลองเลือกสิ่งที่เหมาะกับใจคุณ'}</h2>
        <div className="mt-2.5 rounded-3xl border border-turq/10 bg-white p-5 shadow-[0_8px_16px_rgba(0,196,179,.10)]">
          <NextStep action={nextAction(answers)} />
        </div>
      </section>

      <SupportCard heavy={heavy} />
      <Keepsake weather={weather} line={line} />
      <button className="btn btn-sec mt-3" onClick={onRestart}>เช็กอินใหม่</button>
      <p className="mt-3 text-center text-[13px] opacity-80">
        อยากรู้จักบริการเพิ่ม <a className="font-extrabold text-turq-text" href={OOCA_URL} target="_blank" rel="noopener">เยี่ยมชม ooca</a>
      </p>
      <Footer />
    </div>
  )
}
