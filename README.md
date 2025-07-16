# หมูดาว - เกมเรียนรู้ดาราศาสตร์

เว็บแอปพลิเคชันสำหรับเรียนรู้กลุ่มดาวทั้ง 88 กลุ่ม ผ่านเกมและบทเรียน

## คุณสมบัติ
- เรียนรู้กลุ่มดาวทั้ง 88 กลุ่ม
- เกมทดสอบความรู้
- ระบบสถิติการเล่น
- ระบบเสียงและเอฟเฟกต์
- รองรับการใช้งานแบบ Offline (PWA)

## การติดตั้งและใช้งาน

### วิธีที่ 1: ใช้งานผ่าน GitHub Pages
1. อัปโหลดโค้ดทั้งหมดไปยัง GitHub Repository
2. ไปที่ Settings > Pages
3. เลือก Source เป็น "Deploy from a branch"
4. เลือก Branch เป็น "main" และ Folder เป็น "/ (root)"
5. กด Save

### วิธีที่ 2: ใช้งานผ่าน Netlify
1. ไปที่ [netlify.com](https://netlify.com)
2. ลากโฟลเดอร์โปรเจคไปวางในพื้นที่ Drag & Drop
3. รอการ deploy อัตโนมัติ

### วิธีที่ 3: ใช้งานผ่าน Vercel
1. ไปที่ [vercel.com](https://vercel.com)
2. เชื่อมต่อกับ GitHub Repository
3. กด Deploy

## โครงสร้างไฟล์
```
├── index.html          # หน้าหลัก
├── learn.html          # หน้าเรียนรู้
├── exercise.html       # หน้าเกม
├── stats.html          # หน้าสถิติ
├── login.html          # หน้าเข้าสู่ระบบ
├── js/                 # JavaScript files
├── data/               # ข้อมูลกลุ่มดาว
├── images/             # รูปภาพ
├── sounds/             # เสียง
├── videos/             # วิดีโอ
├── manifest.json       # PWA manifest
└── sw.js              # Service Worker
```

## การพัฒนา
- เปิดไฟล์ `index.html` ในเบราว์เซอร์เพื่อทดสอบ
- ใช้ Live Server extension ใน VS Code สำหรับการพัฒนา

## หมายเหตุ
- เว็บไซต์นี้เป็น PWA สามารถติดตั้งบนมือถือได้
- รองรับการใช้งานแบบ Offline
- ใช้ Service Worker สำหรับการ cache ข้อมูล 