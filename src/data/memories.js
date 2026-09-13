// Dummy data. Shape matches what a real backend (Supabase / Firebase / Appwrite)
// should return. Swap fetchMemories()/postMemory() in MemoryWall.jsx to hit a
// real endpoint later — the rest of the UI will not need to change.

const memories = [
  {
    id: 1,
    name: 'Zaky',
    message: "Gak nyangka akhirnya sampai di sini.",
    anonymous: false,
    createdAt: '2026-05-14T10:00:00Z',
  },
  {
    id: 2,
    name: null,
    message: 'Makasih sudah menjadi bagian dari cerita ini.',
    anonymous: true,
    createdAt: '2026-05-14T10:05:00Z',
  },
  {
    id: 3,
    name: null,
    message: 'Kalau bisa balik ke satu hari, gue tahu hari apa.',
    anonymous: true,
    createdAt: '2026-05-14T10:10:00Z',
  },
  {
    id: 4,
    name: 'Raka',
    message: 'Semoga nanti kita ketemu lagi, dalam versi terbaik kita masing-masing.',
    anonymous: false,
    createdAt: '2026-05-14T10:15:00Z',
  },
  {
    id: 5,
    name: null,
    message: 'Ruang kelas itu udah kosong, tapi berisiknya masih kebayang.',
    anonymous: true,
    createdAt: '2026-05-14T10:20:00Z',
  },
  {
    id: 6,
    name: 'Dinda',
    message: 'Terima kasih sudah bikin hari-hari biasa jadi nggak biasa.',
    anonymous: false,
    createdAt: '2026-05-14T10:25:00Z',
  },
];

export default memories;
