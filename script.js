import { questionsData, icons, suggestedFeaturesMap } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const startGuidedButton = document.getElementById('start-guided-button');
    const startBasicButton = document.getElementById('start-basic-button');
    const loadProgressButton = document.getElementById('load-progress-button');
    const appContainer = document.getElementById('app-container');
    const saveProgressButton = document.getElementById('save-progress-button');
    const geminiResponseContainer = document.getElementById('gemini-response-container');
    const loadingOverlay = document.getElementById('loading-overlay');
    const questionText = document.getElementById('question-text');
    const stepCounter = document.getElementById('step-counter');
    const optionsContainer = document.getElementById('options-container');
    const previousButton = document.getElementById('previous-button');
    const randomizeDesignButton = document.getElementById('randomize-design-button');
    const nextButton = document.getElementById('next-button');
    const geminiResponseText = document.getElementById('gemini-response-text');
    const copyPromptButton = document.getElementById('copy-prompt-button');
    const copyFeedbackMessage = document.getElementById('copy-feedback-message');
    const newPromptButton = document.getElementById('new-prompt-button');
    const htmlCodeText = document.getElementById('html-code-text');
    const copyHtmlButton = document.getElementById('copy-html-button');
    const copyHtmlFeedbackMessage = document.getElementById('copy-html-feedback-message');
    const welcomeScreen = document.getElementById('welcome-screen');
    const conceptualPreviewContainer = document.getElementById('conceptual-preview-container');
    const conceptualPreviewIframe = document.getElementById('conceptual-preview-iframe');

    // --- State Management ---
    let currentStep = 0;
    let promptDetails = {};
    let showWelcome = true;
    let loading = false;
    let currentMode = 'guided'; // 'guided' or 'basic'
    let filteredQuestions = [];
    let aiSuggesting = false; // New state for AI suggestion loading

    // --- Functions ---

    function saveProgress() {
        try {
            const savedData = {
                promptDetails: promptDetails,
                currentStep: currentStep,
                currentMode: currentMode
            };
            localStorage.setItem('promptGeneratorProgress', JSON.stringify(savedData));
            showFeedback('Progress berhasil disimpan!', true, copyFeedbackMessage);
        } catch (e) {
            showFeedback('Gagal menyimpan progress: ' + e.message, false, copyFeedbackMessage);
            console.error("Error saving progress:", e);
        }
    }

    function loadProgress() {
        try {
            const savedData = localStorage.getItem('promptGeneratorProgress');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                promptDetails = parsedData.promptDetails || {};
                currentStep = parsedData.currentStep || 0;
                currentMode = parsedData.currentMode || 'guided';
                showWelcome = false;
                geminiResponseText.textContent = '';
                htmlCodeText.textContent = '';
                updateUI();
                showFeedback('Progress berhasil dimuat!', true, copyFeedbackMessage);
            } else {
                showFeedback('Tidak ada progress tersimpan.', false, copyFeedbackMessage);
            }
        } catch (e) {
            showFeedback('Gagal memuat progress: ' + e.message, false, copyFeedbackMessage);
            console.error("Error loading progress:", e);
        }
    }

    function setFilteredQuestions(mode) {
        if (mode === 'basic') {
            filteredQuestions = questionsData.filter(q => q.basicModeOnly === true || q.id === 'appType');
        } else {
            filteredQuestions = questionsData.filter(q => {
                if (q.id === 'backendFunctions') {
                    return promptDetails.backendTechnology && promptDetails.backendTechnology !== 'none-yet' && promptDetails.backendTechnology !== 'gemini-choice';
                }
                if (q.id === 'authenticationType') {
                    return promptDetails.backendFunctions && promptDetails.backendFunctions.includes('user-authentication');
                }
                if (q.id === 'databaseType') {
                    return promptDetails.backendTechnology && promptDetails.backendTechnology !== 'none-yet' && promptDetails.backendTechnology !== 'gemini-choice';
                }
                return true;
            });
        }
    }

    function validateCurrentStep() {
        const currentQuestion = filteredQuestions[currentStep];
        if (!currentQuestion) return false;

        if (currentQuestion.type === 'text' || currentQuestion.type === 'textarea') {
            return promptDetails[currentQuestion.id] && promptDetails[currentQuestion.id].trim() !== '';
        }
        return promptDetails[currentQuestion.id] !== undefined;
    }

    function updateConceptualPreview() {
        const htmlContent = generateConceptualHtml();
        if (conceptualPreviewIframe) {
            conceptualPreviewIframe.srcdoc = htmlContent;
        }
    }

    function updateUI() {
        try {
            // Hide all main containers initially
            welcomeScreen.classList.add('hidden');
            appContainer.classList.add('hidden');
            geminiResponseContainer.classList.add('hidden');
            loadingOverlay.classList.add('hidden');

            if (showWelcome) {
                welcomeScreen.classList.remove('hidden');
            } else if (loading || aiSuggesting) {
                loadingOverlay.classList.remove('hidden');
            } else if (geminiResponseText.textContent !== '') {
                geminiResponseContainer.classList.remove('hidden');
            } else { // Main app view
                appContainer.classList.remove('hidden');
                // Ensure animation classes are reset for proper display
                appContainer.classList.remove('content-fade-enter-from');
                appContainer.classList.add('content-fade-enter-active', 'content-fade-enter-to');

                // Rest of the app container specific logic
                setFilteredQuestions(currentMode);
                const currentQuestion = filteredQuestions[currentStep];

                if (!currentQuestion) {
                    currentStep = filteredQuestions.length - 1;
                    if (currentStep < 0) currentStep = 0;
                    updateUI(); // Recurse to re-evaluate state
                    return;
                }

                questionText.textContent = currentQuestion.text;
                stepCounter.textContent = `Langkah ${currentStep + 1} dari ${filteredQuestions.length}`;
                renderOptions(currentQuestion);

                previousButton.classList.toggle('hidden', currentStep === 0);
                nextButton.textContent = (currentStep === filteredQuestions.length - 1) ? 'Buat Prompt' : 'Lanjut';

                const designQuestionIds = ['designAesthetics', 'colorPalette', 'typographyChoice'];
                const isDesignStep = currentQuestion && designQuestionIds.includes(currentQuestion.id);
                randomizeDesignButton.classList.toggle('hidden', !isDesignStep);

                const designRelatedQuestionIds = ['designAesthetics', 'colorPalette', 'typographyChoice', 'mainUIComponents', 'responsiveness', 'animationsTransitions'];
                const isDesignRelatedStep = currentQuestion && designRelatedQuestionIds.includes(currentQuestion.id);

                conceptualPreviewContainer.classList.toggle('hidden', !isDesignRelatedStep);
                if (isDesignRelatedStep) {
                    updateConceptualPreview();
                }

                saveProgressButton.classList.remove('hidden');

                const isStepValid = validateCurrentStep();
                nextButton.disabled = !isStepValid || aiSuggesting;
                nextButton.classList.toggle('opacity-50', !isStepValid || aiSuggesting);
                nextButton.classList.toggle('cursor-not-allowed', !isStepValid || aiSuggesting);
            }

            // Always check load progress button visibility
            if (localStorage.getItem('promptGeneratorProgress')) {
                loadProgressButton.classList.remove('hidden');
            } else {
                loadProgressButton.classList.add('hidden');
            }

        } catch (e) {
            console.error("Error in updateUI:", e);
            // Fallback to show a general error message if UI update fails critically
            welcomeScreen.classList.add('hidden');
            appContainer.classList.add('hidden');
            geminiResponseContainer.classList.remove('hidden'); // Show response container for error message
            geminiResponseText.textContent = `Terjadi kesalahan fatal pada aplikasi: ${e.message}. Mohon coba segarkan halaman.`;
            loadingOverlay.classList.add('hidden');
        }
    }

    function getSmartPlaceholder(questionId, appTypeValue) {
        const suggestions = {
            'e-commerce': {
                keyDataModels: 'Contoh: Produk (ID, Nama, Harga, Deskripsi, Stok, Kategori); Pengguna (ID, Nama, Email, Alamat); Pesanan (ID, ID_Pengguna, Tanggal, Total, Status, Item_Pesanan[ID_Produk, Jumlah]).\n\nHubungan: Satu Pengguna bisa memiliki banyak Pesanan. Satu Pesanan bisa memiliki banyak Produk.',
                appWorkflow: 'Contoh: Pengguna mencari produk (Input) -> Tampilkan daftar produk (Output) -> Pengguna menambahkan ke keranjang, checkout (Input) -> Proses pembayaran, update stok (Proses) -> Konfirmasi pesanan, kirim email (Output).'
            },
            'social-media': {
                keyDataModels: 'Contoh: Pengguna (ID, Username, Email, Password_Hash, Profil_Bio, Foto_Profil); Post (ID, ID_Pengguna, Konten, Tanggal, URL_Gambar); Komentar (ID, ID_Post, ID_Pengguna, Komentar, Tanggal); Like (ID, ID_Post/Komentar, ID_Pengguna).\n\nHubungan: Pengguna bisa membuat banyak Post, Komentar, dan Like.',
                appWorkflow: 'Contoh: Pengguna mendaftar/login (Input) -> Tampilkan feed/beranda (Output) -> Pengguna membuat post baru (Input) -> Post disimpan, tampil di feed (Proses) -> Pengguna memberi komentar/like (Input) -> Update data, notifikasi (Proses) -> Tampilkan komentar/like baru (Output).'
            },
            'productivity-tool': {
                keyDataModels: 'Contoh: Tugas (ID, Nama, Deskripsi, Status[To-Do, In Progress, Done], Prioritas, Tanggal_Deadline, ID_Pengguna); Pengguna (ID, Nama, Email).\n\nHubungan: Satu Pengguna memiliki banyak Tugas.',
                appWorkflow: 'Contoh: Pengguna login (Input) -> Tampilkan daftar tugas (Output) -> Pengguna menambahkan tugas baru (Input) -> Tugas disimpan, tampil di daftar (Proses) -> Pengguna mengubah status tugas (Input) -> Update status, notifikasi (Proses) -> Tampilkan tugas dengan status baru (Output).'
            },
            'blog-portfolio': {
                keyDataModels: 'Contoh: Post (ID, Judul, Konten, Tanggal_Publikasi, Penulis, Kategori, Tag); Komentar (ID, ID_Post, ID_Pengguna, Konten, Tanggal); Pengguna (ID, Nama, Email, Peran[Admin/Penulis]).\n\nHubungan: Post memiliki banyak Komentar. Pengguna bisa memiliki banyak Post.',
                appWorkflow: 'Contoh: Pengunjung masuk ke website (Input) -> Melihat daftar post/relevan (Output) -> Klik post untuk detail (Input) -> Tampilkan konten post (Output) -> Pengunjung bisa isi formulir kontak (Input) -> Kirim email ke admin (Proses) -> Konfirmasi pengiriman (Output).'
            },
            'online-course': {
                keyDataModels: 'Contoh: Kursus (ID, Judul, Deskripsi, Harga, URL_Gambar); Modul (ID, ID_Kursus, Judul, Konten_Video, Teks_Materi); Pengguna (ID, Nama, Email, Progres_Kursus[ID_Kursus:persentase]).\n\nHubungan: Kursus memiliki banyak Modul. Pengguna memiliki progres di banyak Kursus.',
                appWorkflow: 'Contoh: Pengguna mendaftar kursus (Input) -> Proses pembayaran (Proses) -> Akses materi kursus (Output) -> Pengguna menyelesaikan modul (Input) -> Progres disimpan, lencana/sertifikat diberikan (Proses) -> Tampilkan progres kursus (Output).'
            },
            'booking-reservasi': {
                keyDataModels: 'Contoh: Layanan (ID, Nama, Deskripsi, Durasi, Harga); Slot_Waktu (ID, ID_Layanan, Tanggal, Waktu, Kapasitas_Tersedia); Reservasi (ID, ID_Slot_Waktu, ID_Pengguna, Status_Reservasi).\n\nHubungan: Layanan memiliki banyak Slot_Waktu. Pengguna membuat Reservasi untuk Slot_Waktu.',
                appWorkflow: 'Contoh: Pengguna memilih layanan, tanggal, waktu (Input) -> Cek ketersediaan (Proses) -> Konfirmasi reservasi, proses pembayaran (Input/Proses) -> Notifikasi konfirmasi, update ketersediaan (Output).'
            },
            'berita-agregator': {
                keyDataModels: 'Contoh: Artikel (ID, Judul, Sumber, URL, Tanggal_Publikasi, Kategori); Pengguna (ID, Preferensi_Kategori).\n\nHubungan: Pengguna memiliki Preferensi_Kategori.',
                appWorkflow: 'Contoh: Pengguna membuka aplikasi (Input) -> Tampilkan artikel terbaru/relevan (Output) -> Pengguna memilih kategori (Input) -> Filter artikel berdasarkan kategori (Proses) -> Tampilkan artikel yang difilter (Output).'
            },
            'aplikasi-keuangan': {
                keyDataModels: 'Contoh: Transaksi (ID, ID_Akun, Tanggal, Deskripsi, Jumlah, Tipe[Pemasukan/Pengeluaran], Kategori); Akun (ID, ID_Pengguna, Nama_Akun, Saldo); Pengguna (ID, Nama, Email, Password_Hash).\n\nHubungan: Satu Pengguna bisa memiliki banyak Akun. Satu Akun memiliki banyak Transaksi.',
                appWorkflow: 'Contoh: Pengguna login (Input) -> Tampilkan dashboard ringkasan keuangan (Output) -> Pengguna input transaksi baru (Input) -> Validasi, update saldo akun, kategorikan (Proses) -> Tampilkan transaksi terbaru, perbarui laporan (Output).'
            },
            'manajemen-proyek': {
                keyDataModels: 'Contoh: Proyek (ID, Nama, Deskripsi, Status, Tanggal_Mulai, Tanggal_Selesai, ID_Manajer_Proyek); Tugas (ID, ID_Proyek, Nama, Deskripsi, Status, Tanggal_Deadline, ID_Assignee); Pengguna (ID, Nama, Email, Peran[Admin/Anggota]).\n\nHubungan: Satu Proyek memiliki banyak Tugas. Satu Tugas di-assign ke satu Pengguna.',
                appWorkflow: 'Contoh: Manajer membuat proyek baru (Input) -> Menetapkan tugas ke tim, mengatur deadline (Proses) -> Anggota tim memperbarui status tugas (Input) -> Update status, notifikasi (Proses) -> Tampilkan progres proyek (Output).'
            },
            'company-landing': {
                keyDataModels: 'Contoh: Pesan_Kontak (ID, Nama, Email, Subjek, Pesan, Tanggal_Kirim); Mitra (Nama, Logo_URL, Deskripsi).\n\nHubungan: Tidak ada hubungan kompleks, fokus pada data statis.',
                appWorkflow: 'Contoh: Pengunjung masuk ke website (Input) -> Melihat informasi perusahaan, layanan (Output) -> Mengisi formulir kontak (Input) -> Kirim email ke admin (Proses) -> Konfirmasi pengiriman (Output).'
            },
            'galeri-foto': {
                keyDataModels: 'Contoh: Foto (ID, Judul, Deskripsi, URL_Gambar, Album); Album (ID, Nama_Album, Deskripsi, Tanggal_Dibuat).\n\nHubungan: Album memiliki banyak Foto.',
                appWorkflow: 'Contoh: Pengunjung membuka galeri (Input) -> Melihat thumbnail foto (Output) -> Klik foto untuk memperbesar (Input) -> Tampilkan foto ukuran penuh (Output).'
            },
            'situs-event-konferensi': {
                keyDataModels: 'Contoh: Event (ID, Nama_Event, Tanggal, Lokasi, Deskripsi, URL_Pendaftaran); Pembicara (ID, Nama, Judul_Sesi, Biografi); Tiket (ID, ID_Event, Tipe_Tiket, Harga).\n\nHubungan: Event memiliki banyak Pembicara dan Tipe_Tiket.',
                appWorkflow: 'Contoh: Pengunjung melihat website (Input) -> Melihat jadwal dan pembicara (Output) -> Melakukan pendaftaran/pembelian tiket (Input) -> Proses pembayaran, kirim e-tiket (Proses) -> Konfirmasi pendaftaran (Output).'
            },
            'platform-saas-kustom': {
                keyDataModels: 'Contoh: Pengguna (ID, Email, Password_Hash, Paket_Langganan, Status_Aktif); Fitur_Platform (ID, Nama_Fitur, Deskripsi, Akses_Level); Data_Khusus_Pengguna (ID_Pengguna, Data_A, Data_B).\n\nHubungan: Pengguna memiliki akses ke Fitur_Platform tertentu. Data_Khusus_Pengguna terkait dengan Pengguna.',
                appWorkflow: 'Contoh: Pengguna mendaftar paket (Input) -> Proses aktivasi akun (Proses) -> Pengguna login ke dashboard (Input) -> Menggunakan fitur platform (Proses) -> Tampilkan hasil/data (Output).'
            },
            'aplikasi-internal-perusahaan': {
                keyDataModels: 'Contoh: Karyawan (ID, Nama, Departemen, Jabatan); ProyekInternal (ID, Nama, Deskripsi, Status, ID_Manajer); Dokumen (ID, Judul, Konten, ID_Penulis, Tanggal_Upload).\n\nHubungan: Karyawan terlibat dalam ProyekInternal. Dokumen dibuat oleh Karyawan.',
                appWorkflow: 'Contoh: Karyawan login (Input) -> Melihat dashboard dengan informasi relevan (Output) -> Mengakses dokumen atau data proyek (Input) -> Melakukan tindakan (misal: update status) (Proses) -> Tampilkan perubahan (Output).'
            },
            'other': {
                keyDataModels: 'Contoh: [Entitas Utama] (ID, Properti1, Properti2); [Entitas Terkait] (ID, ID_EntitasUtama, Properti3).\n\nHubungan: [Jelaskan hubungan antar entitas].',
                appWorkflow: 'Contoh: Pengguna melakukan [Tindakan A] (Input) -> Sistem melakukan [Logika B] (Proses) -> Tampilkan [Hasil C] (Output).'
            }
        };

        if (suggestions[appTypeValue] && suggestions[appTypeValue][questionId]) {
            return suggestions[appTypeValue][questionId];
        }
        return placeholder;
    }

    function renderOptions(question) {
        let optionsHtml = '';
        if (question.type === 'text' || question.type === 'textarea') {
            const value = promptDetails[question.id] || '';
            const placeholder = getSmartPlaceholder(question.id, promptDetails.appType);
            const isTextArea = question.type === 'textarea';

            optionsHtml = `
                <div class="flex flex-col w-full">
                    <${isTextArea ? 'textarea' : 'input'} id="${question.id}" oninput="handleTextInput('${question.id}', this.value)" class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${isTextArea ? 'rows="4"' : 'type="text"'}" placeholder="${placeholder}">${isTextArea ? value : ''}</${isTextArea ? 'textarea' : 'input'}>
                    <button type="button" onclick="getAISuggestion('${question.id}')" class="mt-2 px-4 py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300 ease-in-out ${aiSuggesting ? 'opacity-50 cursor-not-allowed' : ''}" ${aiSuggesting ? 'disabled' : ''}>
                        ${aiSuggesting ? 'Membuat Saran...' : 'Saran AI'}
                    </button>
                </div>
            `;
            if (!isTextArea) {
                // For input type=text, set value attribute separately
                optionsHtml = optionsHtml.replace(`value=""`, `value="${value}"`);
            }

        } else {
            const selectedValue = promptDetails[question.id];
            question.options.forEach(option => {
                const isSelected = (question.multiple && Array.isArray(selectedValue) && selectedValue.includes(option.value)) ||
                                   (!question.multiple && selectedValue === option.value);
                
                let descriptionHtml = option.description ? `<p class="text-gray-500 text-sm mt-1">${option.description}</p>` : '';
                let exampleTextHtml = option.exampleText ? `<p class="font-mono text-xs text-gray-600 mt-1">${option.exampleText}</p>` : '';
                let colorSwatchesHtml = '';

                if (question.type === 'color-swatch' && option.colors) {
                    colorSwatchesHtml = `<div class="flex mt-2 space-x-1">` +
                                        option.colors.map(color => `<div class="w-6 h-6 rounded-full shadow-inner" style="background-color: ${color};">\u003c/div>`).join('') +
                                        `</div>`;
                }

                let buttonClasses = `flex flex-col items-center p-4 rounded-lg border-2 transition duration-200 ease-in-out option-button`;
                if (isSelected) {
                    buttonClasses += ' selected';
                } else {
                    buttonClasses += ' border-gray-200 hover:border-indigo-300 hover:bg-gray-50';
                }

                optionsHtml += `
                    <button type="button" class="${buttonClasses}"
                            onclick="handleSelect('${question.id}', '${option.value}')">
                        ${option.icon && icons[option.icon] ? `<div class="lucide-icon">${icons[option.icon]}\u003c/div>` : ''}
                        <span class="font-semibold text-gray-800 text-center">${option.label}</span>
                        ${descriptionHtml}
                        ${exampleTextHtml}
                        ${colorSwatchesHtml}
                    \u003c/button>
                `;
            });

            if (question.id === 'appType' && selectedValue === 'other') {
                optionsHtml += `
                    <div class="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
                        <span class="font-semibold text-gray-800 mb-2">Jelaskan jenis aplikasi lainnya:\u003c/span>
                        <input type="text" class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                               placeholder="Masukkan detail lain..."
                               value="${promptDetails.appTypeOther || ''}"
                               oninput="handleOtherInput(event)">
                    \u003c/div>
                `;
            }
        }
        optionsContainer.innerHTML = optionsHtml;
    }

    window.handleTextInput = function(questionId, value) {
        promptDetails[questionId] = value;
        const appInfoQuestionIds = ['appName', 'appDescription', 'uniqueFeature', 'keyDataModels', 'appWorkflow'];
        const designRelatedQuestionIds = ['designAesthetics', 'colorPalette', 'typographyChoice', 'mainUIComponents', 'responsiveness', 'animationsTransitions'];

        if (appInfoQuestionIds.includes(questionId) || designRelatedQuestionIds.includes(questionId)) {
            updateConceptualPreview();
        }
        updateUI();
    }

    window.handleSelect = function(questionId, value) {
        const question = filteredQuestions.find(q => q.id === questionId);
        if (question.multiple) {
            const currentSelections = promptDetails[questionId] || [];
            if (currentSelections.includes(value)) {
                promptDetails[questionId] = currentSelections.filter(item => item !== value);
            } else {
                promptDetails[questionId] = [...currentSelections, value];
            }
        } else {
            promptDetails[questionId] = value;
        }

        const designRelatedQuestionIds = ['designAesthetics', 'colorPalette', 'typographyChoice', 'mainUIComponents', 'responsiveness', 'animationsTransitions'];
        if (designRelatedQuestionIds.includes(questionId)) {
            updateConceptualPreview();
        }

        if (questionId === 'appType' || questionId === 'backendTechnology' || questionId === 'backendFunctions') {
            updateUI();
        } else {
            renderOptions(filteredQuestions[currentStep]);
            updateUI();
        }
    }

    window.getAISuggestion = function(questionId) {
        aiSuggesting = true;
        updateUI(); // Show loading state

        // Simulate API call to AI
        setTimeout(() => {
            let suggestion = '';
            const appType = promptDetails.appType;
            const appName = promptDetails.appName || 'aplikasi Anda';
            const appDescription = promptDetails.appDescription || '';
            const targetAudience = questionsData.find(q => q.id === 'targetAudience')?.options.find(o => o.value === promptDetails.targetAudience)?.label || '';

            switch (questionId) {
                case 'appDescription':
                    suggestion = `Sebuah platform ${appType || 'web'} yang inovatif untuk ${targetAudience ? `audiens ${targetAudience}` : 'pengguna umum'} yang bertujuan untuk ${appDescription || 'memecahkan masalah X dengan cara Y'}.`;
                    break;
                case 'uniqueFeature':
                    suggestion = `Fitur unggulan dari ${appName} adalah kemampuan untuk secara otomatis ${appType === 'e-commerce' ? 'merekomendasikan produk berdasarkan riwayat pembelian dan preferensi pengguna' : appType === 'social-media' ? 'menganalisis sentimen postingan dan menyarankan balasan yang sesuai' : 'melakukan tugas spesifik yang relevan dengan jenis aplikasi'}.`;
                    break;
                case 'keyDataModels':
                    suggestion = `Contoh: Pengguna (ID, Nama, Email, Password_Hash); ${appType === 'e-commerce' ? 'Produk (ID, Nama, Harga, Deskripsi, Stok, Kategori); Pesanan (ID, ID_Pengguna, Tanggal, Total, Status, Item_Pesanan[ID_Produk, Jumlah])' : appType === 'social-media' ? 'Post (ID, ID_Pengguna, Konten, Tanggal, URL_Gambar); Komentar (ID, ID_Post, ID_Pengguna, Komentar, Tanggal); Like (ID, ID_Post/Komentar, ID_Pengguna)' : '[Entitas Utama] (ID, Properti1, Properti2); [Entitas Terkait] (ID, ID_EntitasUtama, Properti3)'}.\n\nHubungan: [Jelaskan hubungan antar entitas, misal: Satu Pengguna bisa memiliki banyak Pesanan].`;
                    break;
                case 'appWorkflow':
                    suggestion = `Contoh: 1. Pengguna ${appType === 'e-commerce' ? 'mencari produk dan menambahkannya ke keranjang' : appType === 'social-media' ? 'membuat postingan baru' : 'melakukan tindakan utama aplikasi'}. 2. Sistem ${appType === 'e-commerce' ? 'memproses pembayaran dan memperbarui stok' : appType === 'social-media' ? 'menyimpan postingan dan menampilkannya di feed' : 'melakukan logika bisnis yang relevan'}. 3. Pengguna ${appType === 'e-commerce' ? 'menerima konfirmasi pesanan' : appType === 'social-media' ? 'melihat postingan mereka di feed' : 'melihat hasil dari tindakan mereka'}.`;
                    break;
                default:
                    suggestion = 'Saran AI untuk ini belum tersedia.';
            }

            promptDetails[questionId] = suggestion;
            aiSuggesting = false;
            updateUI(); // Update UI to reflect new suggestion and hide loading
        }, 1500); // Simulate AI processing time
    }

    function randomizeDesign() {
        const designQuestionIds = ['designAesthetics', 'colorPalette', 'typographyChoice'];

        designQuestionIds.forEach(questionId => {
            const question = questionsData.find(q => q.id === questionId);
            if (question && question.options) {
                const randomIndex = Math.floor(Math.random() * question.options.length);
                promptDetails[questionId] = question.options[randomIndex].value;
            }
        });

        updateUI();
    }

    function showFeedback(message, isSuccess, targetMessageElement) {
        targetMessageElement.textContent = message;
        targetMessageElement.classList.remove('hidden', 'text-green-600', 'text-red-600');
        targetMessageElement.classList.add('show', isSuccess ? 'text-green-600' : 'text-red-600');
        setTimeout(() => {
            targetMessageElement.classList.add('hidden');
        }, 3000);
    }

    window.handleOtherInput = function(event) {
        promptDetails.appTypeOther = event.target.value;
        if (promptDetails.appType !== 'other') {
            promptDetails.appType = 'other';
        }
        updateUI();
    }

    function generateAndShowPrompt() {
        loading = true;
        updateUI();

        setTimeout(() => {
            const finalPrompt = generatePrompt();
            geminiResponseText.textContent = finalPrompt;
            htmlCodeText.textContent = generateConceptualHtml();
            loading = false;
            updateUI();
        }, 1000); // Simulate API call delay
    }

    function generatePrompt() {
        let projectType = "aplikasi web";
        const selectedAppTypeVal = promptDetails.appType;
        const appTypeOption = questionsData.find(q => q.id === 'appType').options.find(o => o.value === selectedAppTypeVal);

        if (appTypeOption) {
            if (appTypeOption.category === 'website') {
                projectType = "situs web";
            } else if (appTypeOption.category === 'webapp') {
                projectType = "aplikasi web";
            }
        }

        let prompt = `Buatkan saya sebuah ${projectType} lengkap berdasarkan spesifikasi berikut:\n\n`;
        prompt += "## Spesifikasi Aplikasi Web:\n\n";

        prompt += "### Frontend:\n";
        prompt += `- **Teknologi Frontend:** HTML, CSS, JavaScript, Tailwind CSS (wajib). Penggunaan kerangka kerja seperti React sangat dianjurkan jika sesuai dengan kompleksitas aplikasi.\n`;
        if (promptDetails.appType) {
            const currentAppTypeOption = questionsData.find(q => q.id === 'appType').options.find(o => o.value === promptDetails.appType);
            prompt += `- **Jenis Aplikasi:** ${currentAppTypeOption?.label || promptDetails.appType}${promptDetails.appType === 'other' && promptDetails.appTypeOther ? ` (${promptDetails.appTypeOther})` : ''}\n`;
        }
        if (promptDetails.appName) {
            prompt += `- **Nama Aplikasi:** ${promptDetails.appName}\n`;
        }
        if (promptDetails.appDescription) {
            prompt += `- **Deskripsi Singkat:** ${promptDetails.appDescription}\n`;
        }

        prompt += `\n### Konteks Aplikasi:\n`;
        if (promptDetails.targetAudience) {
            const audienceOption = questionsData.find(q => q.id === 'targetAudience').options.find(o => o.value === promptDetails.targetAudience);
            prompt += `- **Audiens Target:** ${audienceOption?.label || promptDetails.targetAudience}\n`;
        }
        if (promptDetails.uniqueFeature) {
            prompt += `- **Fitur Unik & Utama:** ${promptDetails.uniqueFeature}\n`;
        }
        if (promptDetails.businessModel) {
            const modelOption = questionsData.find(q => q.id === 'businessModel').options.find(o => o.value === promptDetails.businessModel);
            prompt += `- **Model Bisnis/Tujuan:** ${modelOption?.label || promptDetails.businessModel}\n`;
        }

        prompt += `\n### Spesifikasi Desain & Frontend:\n`;
        if (promptDetails.designAesthetics) {
            const aestheticOption = questionsData.find(q => q.id === 'designAesthetics').options.find(o => o.value === promptDetails.designAesthetics);
            prompt += `- **Estetika Desain:** ${aestheticOption?.label || promptDetails.designAesthetics}\n`;
        }
        if (promptDetails.colorPalette) {
            const paletteOption = questionsData.find(q => q.id === 'colorPalette').options.find(o => o.value === promptDetails.colorPalette);
            prompt += `- **Palet Warna:** ${paletteOption?.label || promptDetails.colorPalette}\n`;
        }
        if (promptDetails.typographyChoice) {
            const typoOption = questionsData.find(q => q.id === 'typographyChoice').options.find(o => o.value === promptDetails.typographyChoice);
            prompt += `- **Tipografi:** ${typoOption?.label || typoOption.exampleText}\n`;
        }
        if (promptDetails.mainUIComponents && promptDetails.mainUIComponents.length > 0) {
            const componentLabels = promptDetails.mainUIComponents.map(val => questionsData.find(q => q.id === 'mainUIComponents').options.find(o => o.value === val).label);
            prompt += `- **Komponen UI Utama:** ${componentLabels.join(', ')}\n`;
        }
        if (promptDetails.responsiveness) {
            const responsiveOption = questionsData.find(q => q.id === 'responsiveness').options.find(o => o.value === promptDetails.responsiveness);
            prompt += `- **Responsivitas:** ${responsiveOption?.label || promptDetails.responsiveness}\n`;
        }
        if (promptDetails.animationsTransitions) {
            const animTransOption = questionsData.find(q => q.id === 'animationsTransitions').options.find(o => o.value === promptDetails.animationsTransitions);
            prompt += `- **Animasi & Transisi:** ${animTransOption?.label || promptDetails.animationsTransitions}\n`;
        }
        prompt += `\n### Spesifikasi Backend & Database:\n`;
        if (promptDetails.backendTechnology) {
            const backendTechOption = questionsData.find(q => q.id === 'backendTechnology').options.find(o => o.value === promptDetails.backendTechnology);
            if (promptDetails.backendTechnology === 'gemini-choice') {
                prompt += `- **Teknologi Backend:** Rekomendasi Gemini (pilih yang paling sesuai berdasarkan spesifikasi di atas)\n`;
            } else {
                prompt += `- **Teknologi Backend:** ${backendTechOption?.label || promptDetails.backendTechnology}\n`;
            }
        }

        if (promptDetails.backendFunctions && promptDetails.backendFunctions.length > 0) {
            const functionLabels = promptDetails.backendFunctions.map(val => questionsData.find(q => q.id === 'backendFunctions').options.find(o => o.value === val).label);
            prompt += `- **Fungsi Backend Utama:** ${functionLabels.join(', ')}\n`;
        }

        if (promptDetails.authenticationType && promptDetails.authenticationType !== 'none') {
            const authOption = questionsData.find(q => q.id === 'authenticationType').options.find(o => o.value === promptDetails.authenticationType);
            prompt += `- **Jenis Autentikasi (jika diperlukan)::** ${authOption?.label || promptDetails.authenticationType}\n`;
        }

        if (promptDetails.databaseType) {
            const dbOption = questionsData.find(q => q.id === 'databaseType').options.find(o => o.value === promptDetails.databaseType);
            prompt += `- **Jenis Database:** ${dbOption?.label || promptDetails.databaseType}\n`;
        }
        if (promptDetails.keyDataModels) {
            prompt += `- **Model Data Utama:** ${promptDetails.keyDataModels}\n`;
        }
        if (promptDetails.scalabilityNeeds) {
            const scaleOption = questionsData.find(q => q.id === 'scalabilityNeeds').options.find(o => o.value === promptDetails.scalabilityNeeds);
            prompt += `- **Kebutuhan Skalabilitas:** ${scaleOption?.label || promptDetails.scalabilityNeeds}\n`;
        }
        if (promptDetails.appWorkflow) {
            prompt += `- **Alur Aplikasi & Logika Bisnis:** ${promptDetails.appWorkflow}\n`;
        }
        prompt += "\n";

        prompt += "Mohon berikan struktur dasar aplikasi, termasuk file dan folder utama, serta contoh kode yang merepresentasikan pilihan di atas. Pastikan kode yang diberikan lengkap dan dapat dijalankan. Jika React direkomendasikan, gunakan React untuk frontend. Untuk backend dan database, berikan contoh kode yang sesuai dengan Firebase Functions, Google Apps Script, Firestore, atau Firebase Realtime Database, sesuai pilihan.\n";
        prompt += "Prioritaskan penggunaan Tailwind CSS untuk styling frontend. Pastikan desain responsif untuk mobile dan desktop."

        return prompt;
    }

    function generateConceptualHtml() {
        const appTypeName = promptDetails.appName || "Aplikasi Anda";
        const mainColor = questionsData.find(q => q.id === 'colorPalette').options.find(o => o.value === promptDetails.colorPalette)?.colors[0] || '#6366F1'; // Default indigo-500
        const textColor = (promptDetails.colorPalette === 'monochromatic' || promptDetails.colorPalette === 'earthy-natural') ? '#1F2937' : '#FFFFFF';
        const typographyFontFamily = questionsData.find(q => q.id === 'typographyChoice').options.find(o => o.value === promptDetails.typographyChoice)?.fontFamily || 'Inter, sans-serif';
        const uiComponents = promptDetails.mainUIComponents || [];

        let bodyContent = `<h1 class="text-3xl font-bold text-center mb-6" style="color: ${textColor};">${appTypeName}</h1>`;

        if (uiComponents.includes('navbar-header')) {
            bodyContent += `
                <header class="bg-indigo-600 text-white p-4 shadow-md rounded-md">
                    <nav class="container mx-auto flex justify-between items-center">
                        <a href="#" class="text-xl font-bold">Logo ${appTypeName.replace(/\s\(Web App\)|\s\(Website\)/g, '')}</a>
                        <ul class="flex space-x-4">
                            <li><a href="#" class="hover:text-indigo-200">Beranda</a></li>
                            <li><a href="#" class="hover:text-indigo-200">Fitur</a></li>
                            <li><a href="#" class="hover:text-indigo-200">Kontak</a></li>
                        </ul>
                    </nav>
                </header>
            `;
        }

        if (uiComponents.includes('sidebar-drawer')) {
            bodyContent += `
                <aside class="w-64 bg-gray-800 text-white p-4 rounded-md shadow-md mt-4">
                    <h3 class="text-xl font-semibold mb-4">Menu Samping</h3>
                    <ul>
                        <li class="mb-2"><a href="#" class="hover:text-gray-300">Dashboard</a></li>
                        <li class="mb-2"><a href="#" class="hover:text-gray-300">Profil</a></li>
                        <li class="mb-2"><a href="#" class="hover:text-gray-300">Pengaturan</a></li>
                    \u003c/ul>
                \u003c/aside>
            `;
        }

        if (uiComponents.includes('content-cards')) {
            bodyContent += `
                <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 class="text-xl font-semibold mb-2">Kartu Konten 1</h3>
                        <p class="text-gray-700">Ini adalah contoh kartu konten. Bisa menampilkan informasi singkat.</p>
                        <button class="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Pelajari Lebih</button>
                    \u003c/div>
                    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 class="text-xl font-semibold mb-2">Kartu Konten 2</h3>
                        <p class="text-gray-700">Kartu ini bisa digunakan untuk berita, produk, atau layanan.</p>
                        <button class="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Lihat Detail</button>
                    \u003c/div>
                \u003c/section>
            `;
        }

        if (uiComponents.includes('interactive-forms')) {
            bodyContent += `
                <section class="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 class="text-xl font-semibold mb-4">Formulir Kontak</h3>
                    <form>
                        <div class="mb-4">
                            <label for="nama" class="block text-gray-700 text-sm font-bold mb-2">Nama:\u003c/label>
                            <input type="text" id="nama" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        \u003c/div>
                        <div class="mb-4">
                            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:\u003c/label>
                            <input type="email" id="email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        \u003c/div>
                        <div class="mb-4">
                            <label for="pesan" class="block text-gray-700 text-sm font-bold mb-2">Pesan:\u003c/label>
                            <textarea id="pesan" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">\u003c/textarea>
                        \u003c/div>
                        <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Kirim Pesan\u003c/button>
                    \u003c/form>
                \u003c/section>
            `;
        }

        if (uiComponents.includes('call-to-action-buttons')) {
            bodyContent += `
                <section class="mt-8 text-center">
                    <button class="px-8 py-4 bg-green-500 text-white text-lg font-bold rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out">Mulai Sekarang!\u003c/button>
                \u003c/section>
            `;
        }

        if (uiComponents.includes('image-gallery-slider')) {
            bodyContent += `
                <section class="mt-8">
                    <h3 class="text-xl font-semibold mb-4 text-center">Galeri Gambar\u003c/h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <img src="https://placehold.co/300x200/${mainColor.substring(1)}/FFFFFF?text=Gambar+1" alt="Gambar 1" class="w-full h-auto rounded-lg shadow-md">
                        <img src="https://placehold.co/300x200/${mainColor.substring(1)}/FFFFFF?text=Gambar+2" alt="Gambar 2" class="w-full h-auto rounded-lg shadow-md">
                        <img src="https://placehold.co/300x200/${mainColor.substring(1)}/FFFFFF?text=Gambar+3" alt="Gambar 3" class="w-full h-auto rounded-lg shadow-md">
                        <img src="https://placehold.co/300x200/${mainColor.substring(1)}/FFFFFF?text=Gambar+4" alt="Gambar 4" class="w-full h-auto rounded-lg shadow-md">
                    \u003c/div>
                \u003c/section>
            `;
        }

        if (uiComponents.includes('user-authentication')) {
            bodyContent += `
                <section class="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
                    <h3 class="text-xl font-semibold mb-4 text-center">Login / Daftar\u003c/h3>
                    <form>
                        <div class="mb-4">
                            <label for="auth-email" class="block text-gray-700 text-sm font-bold mb-2">Email:\u003c/label>
                            <input type="email" id="auth-email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        \u003c/div>
                        <div class="mb-4">
                            <label for="auth-password" class="block text-gray-700 text-sm font-bold mb-2">Password:\u003c/label>
                            <input type="password" id="auth-password" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        \u003c/div>
                        <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Masuk\u003c/button>
                        <p class="text-center text-sm text-gray-600 mt-4">Belum punya akun? <a href="#" class="text-indigo-600 hover:underline">Daftar di sini\u003c/a>\u003c/p>
                    \u003c/form>
                \u003c/section>
            `;
        }

        let animationsStyle = '';
        if (promptDetails.animationsTransitions === 'engaging') {
            animationsStyle = `
                .element-fade-in {
                    animation: fadeInDown 0.8s ease-out forwards;
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .btn-animated:hover {
                    transform: scale(1.05) translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }
            `;
            bodyContent = bodyContent.replace(/<h1/, '<h1 class="element-fade-in"');
            bodyContent = bodyContent.replace(/<section/, '<section class="element-fade-in"');
            bodyContent = bodyContent.replace(/<button/, '<button class="btn-animated"');
        } else if (promptDetails.animationsTransitions === 'subtle') {
            animationsStyle = `
                .element-hover-subtle {
                    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                }
                .element-hover-subtle:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
            `;
            bodyContent = bodyContent.replace(/<h1/, '<h1 class="element-hover-subtle"');
            bodyContent = bodyContent.replace(/<section/, '<section class="element-hover-subtle"');
            bodyContent = bodyContent.replace(/<button/, '<button class="element-hover-subtle"');
        }

        return `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${appTypeName} - Pratinjau</title>
                <script src="https://cdn.tailwindcss.com">\u003c/script>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=${typographyFontFamily.split(',')[0].replace(/\s/g, '+')}&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: '${typographyFontFamily.split(',')[0]}', ${typographyFontFamily.split(',')[1] || 'sans-serif'};
                        color: ${textColor};
                        background-color: ${mainColor};
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        padding: 1rem;
                    }
                    main {
                        background-color: white;
                        border-radius: 0.75rem;
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                        padding: 2rem;
                        max-width: 48rem;
                        width: 100%;
                        margin-top: 2rem;
                    }
                    @media (min-width: 768px) {
                        main {
                            padding: 3rem;
                        }
                    }
                    ${animationsStyle}
                \u003c/style>
            \u003c/head>
            <body>
                <main>
                    ${bodyContent}
                \u003c/main>
            \u003c/body>
            \u003c/html>
        `;
    }

    // --- Event Listeners ---
    startGuidedButton.addEventListener('click', () => {
        currentMode = 'guided';
        showWelcome = false;
        currentStep = 0;
        promptDetails = {};
        geminiResponseText.textContent = '';
        htmlCodeText.textContent = '';
        updateUI();
    });

    startBasicButton.addEventListener('click', () => {
        currentMode = 'basic';
        showWelcome = false;
        currentStep = 0;
        promptDetails = {};
        geminiResponseText.textContent = '';
        htmlCodeText.textContent = '';
        updateUI();
    });

    loadProgressButton.addEventListener('click', loadProgress);
    saveProgressButton.addEventListener('click', saveProgress);
    randomizeDesignButton.addEventListener('click', randomizeDesign);

    previousButton.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentStep < filteredQuestions.length - 1) {
            currentStep++;
            updateUI();
        } else {
            generateAndShowPrompt();
        }
    });

    newPromptButton.addEventListener('click', () => {
        showWelcome = true;
        currentStep = 0;
        promptDetails = {};
        geminiResponseText.textContent = '';
        htmlCodeText.textContent = '';
        updateUI();
    });

    copyPromptButton.addEventListener('click', () => {
        const promptToCopy = geminiResponseText.textContent;
        const textarea = document.createElement('textarea');
        textarea.value = promptToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            showFeedback('Prompt berhasil disalin ke clipboard!', true, copyFeedbackMessage);
        } catch (err) {
            showFeedback('Gagal menyalin prompt: ' + err.message, false, copyFeedbackMessage);
        } finally {
            document.body.removeChild(textarea);
        }
    });

    copyHtmlButton.addEventListener('click', () => {
        const htmlToCopy = htmlCodeText.textContent;
        const textarea = document.createElement('textarea');
        textarea.value = htmlToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            showFeedback('Kode HTML berhasil disalin ke clipboard!', true, copyHtmlFeedbackMessage);
        } catch (err) {
            showFeedback('Gagal menyalin kode HTML: ' + err.message, false, copyHtmlFeedbackMessage);
        } finally {
            document.body.removeChild(textarea);
        }
    });

    // Initial UI setup
    updateUI();
});