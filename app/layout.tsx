import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Langbaan Invest | อ่านตลาด เข้าใจการลงทุน',description:'รวมแหล่งข่าวและข้อมูลการลงทุน แบ่งหมวด A–G พร้อมค้นหาและบันทึกแหล่งอ้างอิง'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="th"><body>{children}</body></html>}
