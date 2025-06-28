
export const questionsData = [
    {
        id: 'appType',
        text: 'Jenis aplikasi apa yang ingin Anda buat?',
        type: 'radio',
        options: [
            { value: 'e-commerce', label: 'E-commerce', description: 'Platform untuk jual beli produk.', icon: 'ShoppingCart' },
            { value: 'social-media', label: 'Media Sosial', description: 'Aplikasi untuk berbagi konten dan berinteraksi.', icon: 'Users' },
            { value: 'productivity-tool', label: 'Alat Produktivitas', description: 'Aplikasi untuk membantu manajemen tugas.', icon: 'ClipboardList' },
            { value: 'blog-portfolio', label: 'Blog/Portofolio', description: 'Situs untuk menampilkan karya atau tulisan.', icon: 'BookUser' },
            { value: 'online-course', label: 'Kursus Online', description: 'Platform untuk materi pembelajaran.', icon: 'School' },
            { value: 'booking-reservasi', label: 'Booking/Reservasi', description: 'Aplikasi untuk pemesanan jadwal atau tempat.', icon: 'CalendarCheck' },
            { value: 'berita-agregator', label: 'Berita/Agregator', description: 'Mengumpulkan dan menampilkan berita.', icon: 'Newspaper' },
            { value: 'aplikasi-keuangan', label: 'Aplikasi Keuangan', description: 'Untuk melacak pengeluaran dan pemasukan.', icon: 'Banknote' },
            { value: 'manajemen-proyek', label: 'Manajemen Proyek', description: 'Untuk mengatur alur kerja tim.', icon: 'Briefcase' },
            { value: 'company-landing', label: 'Company Profile/Landing Page', description: 'Halaman perkenalan untuk bisnis.', icon: 'Building2' },
            { value: 'galeri-foto', label: 'Galeri Foto/Video', description: 'Menampilkan koleksi media visual.', icon: 'Image' },
            { value: 'situs-event-konferensi', label: 'Situs Event/Konferensi', description: 'Informasi dan pendaftaran acara.', icon: 'CalendarPlus' },
            { value: 'platform-saas-kustom', label: 'Platform SaaS Kustom', description: 'Layanan perangkat lunak spesifik.', icon: 'CloudCog' },
            { value: 'aplikasi-internal-perusahaan', label: 'Aplikasi Internal Perusahaan', description: 'Alat untuk kebutuhan operasional internal.', icon: 'Factory' },
            { value: 'other', label: 'Lainnya...', description: 'Jelaskan ide unik Anda.', icon: 'Lightbulb' }
        ],
        basicModeOnly: false
    },
    {
        id: 'appName',
        text: 'Apa nama aplikasi Anda?',
        type: 'text',
        placeholder: 'Contoh: TokoCepat, SosmedKita, ProduktifApp',
        basicModeOnly: true
    },
    {
        id: 'appDescription',
        text: 'Jelaskan secara singkat tentang aplikasi Anda dalam satu kalimat.',
        type: 'textarea',
        placeholder: 'Contoh: Sebuah platform e-commerce untuk menjual produk fashion lokal.',
        basicModeOnly: true
    },
    {
        id: 'targetAudience',
        text: 'Siapa audiens utama yang akan menggunakan aplikasi ini?',
        type: 'radio',
        options: [
            { value: 'general-public', label: 'Masyarakat Umum', description: 'Untuk semua orang, antarmuka harus sangat mudah.', icon: 'Users' },
            { value: 'experts', label: 'Profesional/Ahli', description: 'Pengguna dengan pengetahuan spesifik di bidang tertentu.', icon: 'Briefcase' },
            { value: 'internal-team', label: 'Tim Internal Perusahaan', description: 'Digunakan untuk kebutuhan bisnis internal.', icon: 'Factory' },
            { value: 'students', label: 'Pelajar & Mahasiswa', description: 'Fokus pada kebutuhan edukasi dan pembelajaran.', icon: 'School' }
        ],
        basicModeOnly: false
    },
    {
        id: 'uniqueFeature',
        text: 'Jelaskan satu fitur paling unik atau paling penting dari aplikasi Anda.',
        type: 'textarea',
        placeholder: 'Contoh: Kemampuan untuk secara otomatis mengkategorikan belanjaan berdasarkan foto struk.',
        basicModeOnly: false
    },
    {
        id: 'businessModel',
        text: 'Apa tujuan utama atau model bisnis dari aplikasi ini?',
        type: 'radio',
        options: [
            { value: 'free-community', label: 'Gratis & Komunitas', description: 'Dibangun untuk penggunaan bebas, mungkin didukung donasi.', icon: 'Heart' },
            { value: 'advertisement', label: 'Menampilkan Iklan', description: 'Aplikasi gratis yang mendapatkan pemasukan dari iklan.', icon: 'Newspaper' },
            { value: 'subscription-saas', label: 'Berlangganan (SaaS)', description: 'Pengguna membayar biaya berulang untuk mengakses.', icon: 'CreditCard' },
            { value: 'direct-sales', label: 'Penjualan Langsung', description: 'Menjual produk atau layanan secara langsung.', icon: 'ShoppingCart' }
        ],
        basicModeOnly: false
    },
    {
        id: 'designAesthetics',
        text: 'Pilih estetika desain yang Anda inginkan:',
        type: 'radio',
        options: [
            { value: 'modern-sleek', label: 'Modern & Ramping', description: 'Garis bersih, banyak ruang kosong, fokus pada fungsionalitas.', icon: 'PanelLeft' },
            { value: 'minimalist', label: 'Minimalis', description: 'Sangat sederhana, hanya elemen-elemen esensial.', icon: 'Circle' },
            { value: 'bold-contemporary', label: 'Tebal & Kontemporer', description: 'Warna mencolok, tipografi besar, desain yang berani.', icon: 'Star' },
            { value: 'classic-elegant', label: 'Klasik & Elegan', description: 'Tipografi serif, palet warna yang tenang, terasa mewah.', icon: 'Gem' },
            { value: 'playful-bright', label: 'Ceria & Terang', description: 'Warna-warni, ilustrasi, cocok untuk audiens muda.', icon: 'Heart' },
            { value: 'retro-vintage', label: 'Retro/Vintage', description: 'Terinspirasi dari desain masa lalu.', icon: 'Camera' }
        ],
        basicModeOnly: false
    },
    {
        id: 'colorPalette',
        text: 'Pilih palet warna utama:',
        type: 'color-swatch',
        options: [
            { value: 'cool-palette', label: 'Palet Dingin', colors: ['#3B82F6', '#10B981', '#6366F1', '#EC4899'], description: 'Biru, hijau, ungu. Memberi kesan tenang dan profesional.' },
            { value: 'warm-palette', label: 'Palet Hangat', colors: ['#F59E0B', '#EF4444', '#D97706', '#84CC16'], description: 'Kuning, oranye, merah. Memberi kesan energi dan semangat.' },
            { value: 'vibrant-contrasting', label: 'Cerah & Kontras', colors: ['#F43F5E', '#38BDF8', '#A78BFA', '#FDE047'], description: 'Kombinasi warna yang kuat dan menarik perhatian.' },
            { value: 'monochromatic', label: 'Monokromatik', colors: ['#1F2937', '#4B5563', '#9CA3AF', '#F3F4F6'], description: 'Berbagai nuansa dari satu warna. Terlihat bersih dan elegan.' },
            { value: 'earthy-natural', label: 'Alami & Natural', colors: ['#16A34A', '#CA8A04', '#A16207', '#F7FEE7'], description: 'Hijau, coklat, krem. Memberi kesan organik dan tenang.' }
        ],
        basicModeOnly: false
    },
    {
        id: 'typographyChoice',
        text: 'Pilih jenis tipografi (font):',
        type: 'radio',
        options: [
            { value: 'sans-serif', label: 'Sans-serif (Modern)', exampleText: 'The quick brown fox jumps over the lazy dog.', fontFamily: 'Inter, sans-serif', description: 'Mudah dibaca di layar, bersih, dan modern. Pilihan aman.' },
            { value: 'serif', label: 'Serif (Klasik)', exampleText: 'The quick brown fox jumps over the lazy dog.', fontFamily: 'Georgia, serif', description: 'Terlihat tradisional, formal, dan elegan. Baik untuk tulisan panjang.' },
            { value: 'monospace', label: 'Monospace (Teknis)', exampleText: 'The quick brown fox jumps over the lazy dog.', fontFamily: 'Roboto Mono, monospace', description: 'Setiap huruf punya lebar sama. Terkesan teknis atau retro.' },
            { value: 'display', label: 'Display (Kreatif)', exampleText: 'The quick brown fox jumps over the lazy dog.', fontFamily: 'Lobster, cursive', description: 'Bergaya dan dekoratif. Cocok untuk judul, bukan untuk teks panjang.' }
        ],
        basicModeOnly: false
    },
    {
        id: 'mainUIComponents',
        text: 'Pilih komponen UI utama yang Anda butuhkan:',
        type: 'checkbox',
        options: [
            { value: 'navbar-header', label: 'Navbar/Header', description: 'Navigasi utama di bagian atas.', icon: 'Menu' },
            { value: 'sidebar-drawer', label: 'Sidebar/Drawer', description: 'Menu samping untuk navigasi tambahan.', icon: 'PanelLeft' },
            { value: 'content-cards', label: 'Kartu Konten', description: 'Untuk menampilkan item seperti produk atau post.', icon: 'LayoutGrid' },
            { value: 'interactive-forms', label: 'Formulir Interaktif', description: 'Untuk input data dari pengguna.', icon: 'ClipboardList' },
            { value: 'call-to-action-buttons', label: 'Tombol Call-to-Action', description: 'Tombol yang menonjol untuk aksi penting.', icon: 'MousePointer2' },
            { value: 'image-gallery-slider', label: 'Galeri/Slider Gambar', description: 'Menampilkan banyak gambar secara menarik.', icon: 'Image' },
            { value: 'user-authentication', label: 'Halaman Login/Register', description: 'Formulir untuk masuk dan mendaftar.', icon: 'User' }
        ],
        basicModeOnly: false
    },
    {
        id: 'responsiveness',
        text: 'Seberapa responsif aplikasi Anda?',
        type: 'radio',
        options: [
            { value: 'fully-responsive', label: 'Sepenuhnya Responsif', description: 'Tampilan sempurna di desktop, tablet, dan mobile.', icon: 'Smartphone' },
            { value: 'desktop-first', label: 'Fokus Desktop', description: 'Didesain utama untuk layar besar, tampilan mobile lebih sederhana.', icon: 'Monitor' },
            { value: 'mobile-first', label: 'Fokus Mobile', description: 'Didesain utama untuk layar kecil, tampilan desktop lebih sederhana.', icon: 'Smartphone' }
        ],
        basicModeOnly: false
    },
    {
        id: 'animationsTransitions',
        text: 'Pilih level animasi dan transisi:',
        type: 'radio',
        options: [
            { value: 'none', label: 'Tanpa Animasi', description: 'Aplikasi statis, cepat, dan langsung.', icon: 'Circle' },
            { value: 'subtle', label: 'Halus & Profesional', description: 'Transisi fade, slide, dan hover yang lembut.', icon: 'Sparkles' },
            { value: 'engaging', label: 'Menarik & Interaktif', description: 'Animasi yang lebih terlihat saat loading atau interaksi.', icon: 'Star' }
        ],
        basicModeOnly: false
    },
    {
        id: 'backendTechnology',
        text: 'Pilih teknologi backend (jika diperlukan):',
        type: 'radio',
        options: [
            { value: 'none-yet', label: 'Belum Perlu (Frontend Saja)', description: 'Aplikasi statis tanpa database atau logika server.', icon: 'Monitor' },
            { value: 'firebase-functions', label: 'Firebase Functions (Node.js)', description: 'Backend serverless yang terintegrasi baik dengan Firebase.', icon: 'CloudCog' },
            { value: 'google-apps-script', label: 'Google Apps Script', description: 'Backend yang terintegrasi dengan Google Sheets/Docs.', icon: 'Sheet' },
            { value: 'gemini-choice', label: 'Rekomendasi Gemini', description: 'Biarkan AI memilih yang terbaik untuk proyek Anda.', icon: 'Lightbulb' }
        ],
        basicModeOnly: false
    },
    {
        id: 'backendFunctions',
        text: 'Pilih fungsi backend utama yang Anda butuhkan:',
        type: 'checkbox',
        options: [
            { value: 'user-authentication', label: 'Autentikasi Pengguna', description: 'Sistem login, register, dan manajemen sesi.', icon: 'User' },
            { value: 'data-management', label: 'Manajemen Data (CRUD)', description: 'Membuat, membaca, update, dan hapus data.', icon: 'Database' },
            { value: 'api-for-frontend', label: 'API untuk Frontend', description: 'Menyediakan data untuk ditampilkan di aplikasi.', icon: 'Server' },
            { value: 'payment-processing', label: 'Proses Pembayaran', description: 'Integrasi dengan gateway pembayaran.', icon: 'CreditCard' },
            { value: 'real-time-updates', label: 'Update Real-time', description: 'Data otomatis terupdate (misal: chat, notifikasi).', icon: 'MessageSquare' }
        ],
        basicModeOnly: false
    },
    {
        id: 'authenticationType',
        text: 'Pilih jenis autentikasi pengguna:',
        type: 'radio',
        options: [
            { value: 'none', label: 'Tidak Perlu Autentikasi', description: 'Aplikasi publik tanpa login.', icon: 'Users' },
            { value: 'email-password', label: 'Email & Password', description: 'Metode login klasik.', icon: 'Mail' },
            { value: 'social-media', label: 'Login via Media Sosial', description: 'Login dengan akun Google, Facebook, dll.', icon: 'Globe' },
            { value: 'token-based', label: 'Token-based (JWT)', description: 'Untuk API atau aplikasi yang lebih kompleks.', icon: 'Key' }
        ],
        basicModeOnly: false
    },
    {
        id: 'databaseType',
        text: 'Pilih jenis database (jika diperlukan):',
        type: 'radio',
        options: [
            { value: 'none', label: 'Tidak Perlu Database', description: 'Aplikasi tidak menyimpan data.', icon: 'Database' },
            { value: 'firestore', label: 'Firestore (NoSQL)', description: 'Database fleksibel, real-time, cocok untuk banyak kasus.', icon: 'Database' },
            { value: 'realtime-database', label: 'Firebase Realtime DB', description: 'Sangat cepat untuk data yang sering berubah (JSON based).', icon: 'Database' },
            { value: 'google-sheets', label: 'Google Sheets', description: 'Menggunakan spreadsheet sebagai database sederhana.', icon: 'Sheet' }
        ],
        basicModeOnly: false
    },
    {
        id: 'keyDataModels',
        text: 'Jelaskan model data utama Anda.',
        type: 'textarea',
        placeholder: 'Contoh: Pengguna (Nama, Email), Produk (Nama, Harga, Deskripsi), Pesanan (ID Pengguna, ID Produk, Jumlah).',
        basicModeOnly: false
    },
    {
        id: 'scalabilityNeeds',
        text: 'Bagaimana kebutuhan skalabilitas Anda?',
        type: 'radio',
        options: [
            { value: 'small-personal', label: 'Proyek Pribadi/Kecil', description: 'Untuk beberapa pengguna, tidak ada lonjakan traffic.', icon: 'User' },
            { value: 'medium-business', label: 'Bisnis Menengah', description: 'Ratusan hingga ribuan pengguna, traffic stabil.', icon: 'Building' },
            { value: 'large-viral', label: 'Skala Besar/Viral', description: 'Didesain untuk puluhan ribu pengguna atau lebih.', icon: 'TrendingUp' }
        ],
        basicModeOnly: false
    },
    {
        id: 'appWorkflow',
        text: 'Jelaskan alur kerja utama aplikasi Anda.',
        type: 'textarea',
        placeholder: 'Contoh: 1. Pengguna mendaftar. 2. Pengguna membuat post. 3. Pengguna lain bisa berkomentar di post tersebut.',
        basicModeOnly: false
    }
];

export const icons = {
    ShoppingCart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>`,
    Users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    Settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.28a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.74v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.28a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    Circle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    Menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    PanelLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`,
    CreditCard: `<svg xmlns="http://www.w3.org/20                MousePointer2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-2"><path d="m4 4 7.07 17.68 2.54-6.36 6.36-2.54L4 4z"/><path d="m11.66 11.66 6.34 6.34"/></svg>`,
    MessageSquare: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    CalendarCheck: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-check"><path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M16 2v4"/><path d="oke-linejoin="round" class="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
    Briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M12 12h.01"/></svg>`,
    ClipboardList: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    Heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
};

export const suggestedFeaturesMap = {
    'e-commerce': {
        mainUIComponents: ['navbar-header', 'content-cards', 'call-to-action-buttons', 'image-gallery-slider'],
        backendFunctions: ['user-authentication', 'data-management', 'api-for-frontend', 'payment-processing'],
        authenticationType: ['email-password', 'social-media'],
        databaseType: ['firestore', 'realtime-database'],
           animationsTransitions: ['subtle'],
        backendTechnology: ['google-apps-script', 'firebase-functions']
    },
    'social-media': {
        mainUIComponents: ['navbar-header', 'content-cards', 'interactive-forms', 'image-gallery-slider'],
        backendFunctions: ['user-authentication', 'data-management', 'api-for-frontend', 'real-time-updates'],
        authenticationType: ['email-password', 'social-media'],
        databaseType: ['firestore', 'realtime-database'],
        designAesthetics: ['modern-sleek'],
        colorPalette: ['vibrant-contrasting', 'cool-palette'],
        typographyChoice: ['sans-serif'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['engaging'],
        backendTechnology: ['firebase-functions']
    },
    'productivity-tool': {
        mainUIComponenord'],
        databaseType: ['firestore'],
        designAesthetics: ['modern-sleek', 'minimalist'],
        colorPalette: ['cool-palette', 'monochromatic'],
        typographyChoice: ['sans-serif'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['subtle'],
        backendTechnology: ['firebase-functions']
    },
    'online-course': {
        mainUIComponents: ['navbar-header', 'content-cards', 'interactive-forms'],
        backendFunctions: ['user-authentication', 'data-management', 'api-for-frontend', 'payment-processing'],
        authenticationType: ['email-password'],
        databaseType: ['firestore', 'realtime-database'],
        designAesthetics: ['modern-sleek'],
        colorPalette: ['cool-palette', 'vibrant-contrasting'],
        typographyChoice: ['sans-serif'],
                mainUIComponents: ['navbar-header', 'content-cards', 'interactive-forms', 'sidebar-drawer'],
        backendFunctions: ['user-authentication', 'data-management', 'api-for-frontend', 'real-time-updates'],
        authenticationType: ['email-password', 'social-media'],
        databaseType: ['firestore', 'realtime-database'],
        designAesthetics: ['modern-sleek', 'minimalist'],
        colorPalette: ['cool-palette', 'monochromatic'],
        typographyChoice: ['sans-serif'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['engaging'],
        backendTechnology: ['firebase-functions']
    },
    'booking-reservasi': {
        mainUIComponents: ['navbar-header', 'interactive-forms', 'content-cards'],
        backendFunctions: ['user-authentication', 'data-management', 'api-for-frontend', 'payment-processing'],
 typographyChoice: ['serif', 'display'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['subtle', 'engaging'],
        backendTechnology: ['firebase-functions', 'none-yet']
    },
    'berita-agregator': {
        mainUIComponents: ['navbar-header', 'content-cards', 'sidebar-drawer'],
        backendFunctions: ['data-management', 'api-for-frontend', 'real-time-updates'],
        authenticationType: ['none'],
        databaseType: ['firestore'],
        designAesthetics: ['minimalist', 'modern-sleek'],
        colorPalette: ['cool-palette', 'monochromatic'],
        typographyChoice: ['serif', 'sans-serif'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['subtle'],
        backendTechnology: ['firebase-functions']
    },
    'aplikasi-keuangan': {
 ons: ['data-management', 'api-for-frontend', 'user-authentication'],
        authenticationType: ['none', 'email-password'],
        databaseType: ['google-sheets', 'firestore'],
        designAesthetics: ['minimalist', 'modern-sleek', 'classic-elegant', 'retro-vintage'],
        colorPalette: ['monochromatic', 'cool-palette', 'earthy-natural'],
        typographyChoice: ['sans-serif', 'serif', 'display'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['subtle', 'engaging'],
        backendTechnology: ['none-yet', 'google-apps-script']
    },
    'manajemen-proyek': {
        mainUIComponents: ['navbar-header', 'sidebar-drawer', 'content-cards', 'interactive-forms'],
        backendFunctions: ['user-authentication', 'data-management', 'api-for-frontend', 'real-time-updates'],
        authenticationType: ['email-password', 'so        backendFunctions: ['data-management'],
        authenticationType: ['none'],
        databaseType: ['none'],
        designAesthetics: ['minimalist', 'modern-sleek', 'classic-elegant'],
        colorPalette: ['monochromatic', 'cool-palette'],
        typographyChoice: ['sans-serif', 'serif'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['subtle'],
        backendTechnology: ['none-yet']
    },
    'situs-event-konferensi': {
        mainUIComponents: ['navbar-header', 'content-cards', 'interactive-forms', 'call-to-action-buttons'],
        backendFunctions: ['user-authentication', 'data-management', 'payment-processing'],
        authenticationType: ['email-password', 'none'],
        databaseType: ['firestore', 'google-sheets'],
        designAesthetics: ['bold-contemporary', 'playful-bright              responsiveness: ['fully-responsive'],
        animationsTransitions: ['engaging', 'subtle'],
        backendTechnology: ['firebase-functions']
    },
    'aplikasi-internal-perusahaan': {
        mainUIComponents: ['sidebar-drawer', 'content-cards', 'interactive-forms', 'navbar-header'],
        backendFunctions: ['user-authentication', 'data-management', 'api-for-frontend', 'real-time-updates'],
        authenticationType: ['email-password', 'token-based'],
        databaseType: ['firestore', 'google-sheets', 'realtime-database'],
        designAesthetics: ['minimalist', 'modern-sleek'],
        colorPalette: ['cool-palette', 'monochromatic'],
        typographyChoice: ['sans-serif', 'monospace'],
        responsiveness: ['fully-responsive'],
        animationsTransitions: ['subtle'],
        backendTechnology: ['firebase-functions']
    }
};
