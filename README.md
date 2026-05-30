# 🌸 ไดอารี่แห่งความทรงจำ (Memory Diary)

แอปพลิเคชันบันทึกความทรงจำที่สวยงาม รองรับภาษาไทย พร้อม animation น่ารัก ✨

![Preview](https://via.placeholder.com/800x400/fdf4e7/3d3545?text=Memory+Diary+🌸)

## ✨ ฟีเจอร์

- 📝 **บันทึกความทรงจำ** - เขียนบันทึกด้วยรูปแบบกระดาษจริง
- 📷 **อัพโหลดรูปภาพ** - รองรับ JPG, PNG, GIF, WEBP
- 🎬 **อัพโหลดวิดีโอ** - รองรับ MP4, WebM, MOV (สูงสุด 50MB)
- 😊 **บันทึกอารมณ์** - เลือกอารมณ์ 8 แบบ
- 🌤️ **บันทึกสภาพอากาศ** - บันทึกสภาพอากาศในวันนั้น
- 📍 **บันทึกสถานที่** - จดบันทึกว่าอยู่ที่ไหน
- 🏷️ **แท็ก** - จัดหมวดหมู่บันทึกด้วยแท็ก
- 💕 **รายการโปรด** - บันทึกไว้เป็นรายการโปรด
- 🎨 **สีสัน** - เลือกสีพื้นหลังของแต่ละบันทึก
- 🔍 **ค้นหา** - ค้นหาบันทึกด้วยคำค้นหา
- 📊 **มุมมองหลายแบบ** - ตาราง, รายการ, ไทม์ไลน์
- 🌸 **Animation สวยงาม** - ดอกไม้ลอย, animation การ์ดสุดน่ารัก
- 🇹🇭 **รองรับภาษาไทย** - วันที่และ UI ภาษาไทยทั้งหมด
- 💾 **บันทึกอัตโนมัติ** - ข้อมูลเก็บใน localStorage

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น
- Node.js 18.0 หรือสูงกว่า
- npm, yarn, หรือ pnpm

### การติดตั้ง

```bash
# Clone repository
git clone https://github.com/your-username/memory-diary.git
cd memory-diary

# ติดตั้ง dependencies
npm install

# สร้างไฟล์ environment
cp .env.example .env.local

# รันในโหมด development
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## 📁 โครงสร้างโปรเจกต์

```
memory-diary/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout + fonts
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles + animations
│   ├── components/
│   │   ├── FloatingPetals.tsx  # ดอกไม้ลอยตกลงมา 🌸
│   │   ├── Sidebar.tsx         # แถบด้านข้าง + ค้นหา
│   │   ├── EntriesView.tsx     # แสดงรายการบันทึก
│   │   ├── EntryCard.tsx       # การ์ดบันทึก
│   │   ├── EntryEditor.tsx     # แก้ไข/สร้างบันทึก
│   │   ├── EntryDetail.tsx     # ดูบันทึกแบบเต็ม
│   │   └── MediaUploader.tsx   # อัพโหลดรูป/วิดีโอ
│   ├── lib/
│   │   ├── store.ts        # Zustand state management
│   │   └── utils.ts        # Utility functions
│   └── types/
│       └── diary.ts        # TypeScript types
├── public/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## 🌐 Deploy บน Vercel

### วิธีที่ 1: ผ่าน GitHub (แนะนำ)

1. **Push ขึ้น GitHub**
```bash
git init
git add .
git commit -m "🌸 Initial commit: Memory Diary"
git branch -M main
git remote add origin https://github.com/your-username/memory-diary.git
git push -u origin main
```

2. **Connect กับ Vercel**
- ไปที่ [vercel.com](https://vercel.com)
- คลิก "New Project"
- เชื่อมต่อ GitHub repository
- คลิก "Deploy" (ไม่ต้องตั้งค่าอะไรเพิ่มเติม!)

3. **รอ Deploy เสร็จ** ประมาณ 1-2 นาที 🎉

### วิธีที่ 2: ผ่าน Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 🛠️ Technology Stack

| เทคโนโลยี | การใช้งาน |
|-----------|-----------|
| **Next.js 14** | React framework + App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations |
| **Zustand** | State management + localStorage |
| **react-dropzone** | File upload |
| **date-fns** | Date formatting (Thai locale) |
| **lucide-react** | Icons |
| **react-hot-toast** | Notifications |

## 🎨 Design

- 🎨 **Theme**: Cream paper + floral accents
- 🖋️ **Fonts**: Playfair Display (หัวข้อ) + Sarabun (เนื้อหาภาษาไทย)
- 🌈 **Colors**: Cream, Rose, Lavender, Sage
- ✨ **Animations**: Floating petals, card hover, page transitions
- 📱 **Responsive**: Mobile-first design

## 📱 Responsive Design

- 📱 **Mobile**: Sidebar เป็น drawer + ปุ่ม FAB
- 💻 **Desktop**: Sidebar แสดงตลอด + layout 2 คอลัมน์

## 🔒 Privacy

ข้อมูลทั้งหมดเก็บอยู่ใน **localStorage** ของเบราว์เซอร์ ไม่มีการส่งข้อมูลไปยัง server ใดๆ

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ 💕

---

สร้างด้วย ❤️ เพื่อบันทึกทุกช่วงเวลาที่สวยงามของชีวิต 🌸
