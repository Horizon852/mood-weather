import { OOCA_URL, HOTLINE } from '../data/content.js'

const Tel = ({ className = '' }) => <a href={`tel:${HOTLINE}`} className={`font-extrabold ${className}`}>{HOTLINE}</a>

// heavy = true → แสดงกล่อง safety net เด่นขึ้น และปุ่ม ooca เป็นปุ่มหลัก
export default function SupportCard({ heavy }) {
  return (
    <>
      {heavy && (
        <div className="mt-4 rounded-3xl bg-flamingo-light px-[18px] py-3.5 text-[15px] text-[#7a2f2c]">
          <b>ดูเหมือนช่วงนี้จะหนักมาก</b> คุณไม่ต้องรับมือคนเดียว โทรสายด่วนสุขภาพจิต <Tel /> ได้ตลอด 24 ชั่วโมง
        </div>
      )}
      <div className="mt-4 rounded-3xl border border-turq/10 bg-white/90 px-5 py-[18px] shadow-[0_8px_16px_rgba(0,196,179,.08)]">
        <div className="mb-1 text-[17px] font-extrabold">ถ้าอยากได้ความช่วยเหลือเพิ่มเติม</div>
        <p className="sub">คุณสามารถคุยกับผู้เชี่ยวชาญผ่าน ooca หรือ หากเป็นภาวะฉุกเฉินด้านสุขภาพจิต โทร <Tel className="text-inherit" /> ได้ตลอด 24 ชั่วโมง</p>
        <a className={`btn ${heavy ? '' : 'btn-sec'}`} href={OOCA_URL} target="_blank" rel="noopener">
          {heavy ? 'คุยกับนักจิตวิทยา ooca' : 'รู้จักบริการ ooca'}
        </a>
      </div>
    </>
  )
}
