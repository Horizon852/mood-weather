import { useState } from 'react'
import { drawKeepsake, downloadBlob, shareBlob } from '../lib/keepsake.js'

// สร้างภาพที่ระลึกในเครื่องผู้ใช้ แล้วดาวน์โหลด/แชร์ได้
export default function Keepsake({ weather, line }) {
  const [blob, setBlob] = useState(null)
  const [url, setUrl] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)

  const create = async () => {
    setBusy(true); setError(false)
    try {
      const b = await drawKeepsake(weather, line)
      setBlob(b); setUrl(URL.createObjectURL(b)); downloadBlob(b)
    } catch { setError(true) } finally { setBusy(false) }
  }

  return (
    <div className="mt-5">
      <button className="btn" onClick={create} disabled={busy}>{busy ? 'กำลังสร้างภาพ…' : 'บันทึกภาพนี้ไว้'}</button>
      {error && <div role="alert" className="mt-2 text-center text-sm text-[#7a2f2c]">สร้างภาพไม่สำเร็จ ลองกดอีกครั้งนะ</div>}
      {!url && <div className="mt-2 text-center text-xs opacity-70">ภาพจะถูกดาวน์โหลดเป็นไฟล์ PNG ถ้าไม่ขึ้น กดค้างที่ภาพแล้วเลือก “บันทึกภาพ”</div>}
      {url && (
        <div className="card p-3.5">
          <img src={url} alt="ภาพที่ระลึกใจวันนี้" className="block w-full rounded-[18px]" />
          <button className="btn btn-sec mt-2.5" onClick={() => downloadBlob(blob)}>ดาวน์โหลดภาพอีกครั้ง</button>
          {navigator.share && <button className="btn btn-sec mt-2.5" onClick={() => shareBlob(blob)}>แชร์ภาพ</button>}
          <p className="mt-2 mb-0 text-center text-xs opacity-70">กดค้างที่ภาพเพื่อบันทึก ถ้าไฟล์ไม่ดาวน์โหลดอัตโนมัติ</p>
        </div>
      )}
    </div>
  )
}
