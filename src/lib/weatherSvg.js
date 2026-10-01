// รูปทรงไอคอนสภาพอากาศ ใช้ทั้งใน React และ canvas ของการ์ดที่ระลึก
export function iconShapes(kind, c) {
  switch (kind) {
    case 'sun':
      return `<circle cx="50" cy="50" r="18" fill="${c}"/>` + [...Array(8)].map((_, i) =>
        `<line x1="50" y1="14" x2="50" y2="22" stroke="${c}" stroke-width="5" stroke-linecap="round" transform="rotate(${i * 45} 50 50)"/>`).join('')
    case 'cloud':
      return `<path d="M28 66a14 14 0 010-28 20 20 0 0138-4 15 15 0 012 32z" fill="${c}"/>`
    case 'storm':
      return `<path d="M28 56a14 14 0 010-28 20 20 0 0138-4 15 15 0 012 32z" fill="${c}"/><path d="M52 58l-8 14h8l-5 14 14-18h-8l6-10z" fill="#F9A000"/>`
    default:
      return `<g stroke="${c}" stroke-width="7" stroke-linecap="round"><line x1="18" y1="36" x2="70" y2="36"/><line x1="30" y1="52" x2="84" y2="52"/><line x1="18" y1="68" x2="66" y2="68"/></g>`
  }
}
