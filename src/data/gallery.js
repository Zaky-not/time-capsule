// Flat, ordered list of every gallery photo. Order matters:
//   - The first 3 entries are shown as the cinematic FEATURED sequence.
//   - Everything from index 3 onward flows into the MEMORIES collection.
// Add or remove photos freely — nothing downstream is hardcoded to a count.
// Replace `src` paths with real files in /src/assets/photos/.

const gallery = [
  {
    id: 'photo-01',
    src: '/src/assets/photos/photo-01.jpg',
    title: 'THE FIRST DAY',
    description: 'Hari pertama kita memulai semuanya.',
    date: '2023',
    location: 'Campus',
  },
  {
    id: 'photo-02',
    src: '/src/assets/photos/photo-02.jpg',
    title: 'THAT RANDOM DAY',
    description: 'Entah kenapa hari itu terasa berbeda.',
    date: '2023',
    location: '',
  },
  {
    id: 'photo-03',
    src: '/src/assets/photos/photo-03.jpg',
    title: 'AFTER CLASS',
    description: 'Setelah kelas selesai, ceritanya baru dimulai.',
    date: '2023',
    location: 'Hallway',
  },
  {
    id: 'photo-04',
    src: '/src/assets/photos/photo-04.jpg',
    title: 'BREAK TIME',
    description: 'Lima menit yang terasa seperti satu jam.',
    date: '2024',
    location: '',
  },
  {
    id: 'photo-05',
    src: '/src/assets/photos/photo-05.jpg',
    title: 'FIELD TRIP',
    description: 'Bus yang bising, tawa yang lebih bising lagi.',
    date: '2024',
    location: '',
  },
  {
    id: 'photo-06',
    src: '/src/assets/photos/photo-06.jpg',
    title: 'RAINY AFTERNOON',
    description: 'Hujan turun, kelas jadi lebih hangat.',
    date: '2024',
    location: '',
  },
  {
    id: 'photo-07',
    src: '/src/assets/photos/photo-07.jpg',
    title: 'EXAM WEEK',
    description: 'Panik bareng-bareng juga ada enaknya.',
    date: '2024',
    location: '',
  },
  {
    id: 'photo-08',
    src: '/src/assets/photos/photo-08.jpg',
    title: 'CELEBRATION',
    description: 'Kabar baik selalu terasa lebih baik kalau dirayakan bersama.',
    date: '2025',
    location: '',
  },
  {
    id: 'photo-09',
    src: '/src/assets/photos/photo-09.jpg',
    title: 'ORDINARY MORNING',
    description: 'Nggak ada yang spesial, tapi diingat terus.',
    date: '2025',
    location: '',
  },
  {
    id: 'photo-10',
    src: '/src/assets/photos/photo-10.jpg',
    title: 'LAST WEEK TOGETHER',
    description: "Kita nggak tahu itu minggu terakhir, sampai akhirnya lewat.",
    date: '2026',
    location: '',
  },
];

export default gallery;
