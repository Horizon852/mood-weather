# Mood Weather Check-in (ooca assignment)

ประสบการณ์ 2 นาทีสำหรับสำรวจใจ: เลือกสภาพอากาศของใจ → ตอบ 4 คำถามสั้นๆ → ได้ผลสะท้อนใจ ก้าวถัดไป และการ์ดที่ระลึก
ทำงานบนเบราว์เซอร์ทั้งหมด **ไม่เก็บและไม่ส่งข้อมูลผู้ใช้**

## รันในเครื่อง
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # ได้โฟลเดอร์ dist
```

## Deploy
Vercel หรือ Netlify: เชื่อม GitHub repo → Build command `npm run build` → Output `dist`

## โครงสร้าง
- `src/data/content.js` ข้อความ คำถาม สภาพอากาศ (แก้เนื้อหาที่นี่)
- `src/lib/` ตรรกะประกอบประโยคสะท้อนใจ, คะแนน safety net, วาดการ์ดบน canvas
- `src/components/` หน้าจอและส่วนประกอบ UI
- `src/index.css` design token ตาม CI (สี ฟอนต์ รูปทรง) และ Tailwind
- `public/mascot/` ภาพมาสคอต
