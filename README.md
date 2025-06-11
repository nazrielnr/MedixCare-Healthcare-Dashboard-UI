# MedixCare - Healthcare Management Dashboard UI

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Antarmuka pengguna (UI) serbaguna untuk sistem manajemen fasilitas kesehatan, menampilkan dasbor yang berbeda untuk berbagai peran. Proyek ini sangat cocok sebagai prototipe untuk **Rumah Sakit, Klinik, Puskesmas,** dan praktik tenaga kesehatan lainnya.

**Proyek ini adalah prototipe frontend dan menggunakan data dummy yang di-hardcode di dalam file `script.js` untuk simulasi fungsionalitas. Saya harap, anda bisa terus mengembangkan proyek ini sebagai website stabil untuk tenaga kesehatan anda**

---

### 🚀 Fitur Utama

Proyek ini mensimulasikan lingkungan multi-pengguna dengan dasbor yang disesuaikan untuk setiap peran:

#### 🏛️ Dasbor Admin
- **KPI Statistik**: Visualisasi data kunci seperti jumlah pasien, ketersediaan tempat tidur/ruangan, dan pendapatan harian.
- **Manajemen Pasien**: Melihat, mencari, dan mengelola daftar semua pasien terdaftar.
- **Manajemen Penagihan**: Melacak status tagihan (Lunas, Belum Dibayar, Klaim Asuransi).
- **Laporan Visual**: Grafik pendapatan bulanan dan popularitas layanan.
- **Pengaturan Sistem**: Mengonfigurasi informasi dasar fasilitas kesehatan.

#### 🩺 Dasbor Dokter
- **Ringkasan Harian**: Melihat jumlah janji temu hari ini dan hasil lab yang tertunda.
- **Jadwal Interaktif**: Kalender bulanan dan daftar janji temu harian.
- **Manajemen Pasien**: Mengakses daftar pasien dan melihat detail rekam medis.
- **Rekam Medis Pasien**: Melihat riwayat kunjungan, hasil lab (grafik), dan resep obat.
- **Pesan Internal**: Sistem pesan sederhana untuk komunikasi dengan staf lain.

#### 👩‍⚕️ Dasbor Perawat
- **Tinjauan Tugas**: Melihat jumlah pasien yang ditugaskan dan tugas yang tertunda.
- **Manajemen Pasien Ditugaskan**: Kartu pasien interaktif yang menampilkan tanda-tanda vital dan catatan perawat.
- **Daftar Tugas**: Mengelola daftar tugas harian (misalnya, pemberian obat, pengecekan vital).
- **Pemberitahuan & Peringatan**: Peringatan penting terkait kondisi pasien.

#### 💊 Dasbor Apoteker
- **Antrian Resep**: Mengelola antrian resep baru yang masuk dari dokter.
- **Manajemen Inventaris**: Melacak stok obat dan alat kesehatan.
- **Peringatan Stok Rendah**: Daftar item yang stoknya hampir habis.
- **Detail Resep**: Modal pop-up untuk melihat dan memproses resep.

#### ❤️ Portal Pasien
- **Beranda**: Melihat janji temu berikutnya dan ringkasan medis.
- **Navigasi Tab**: Akses mudah ke riwayat medis, hasil lab, dan tagihan.
- **Manajemen Janji Temu**: Melihat semua riwayat janji temu dan membuat yang baru.
- **Profil Pengguna**: Mengelola informasi pribadi dan kontak.

---

### 🎯 **Target Pengguna & Fleksibilitas**

Meskipun awalnya dirancang dengan alur kerja yang komprehensif, desain modular MedixCare membuatnya sangat fleksibel untuk berbagai skala fasilitas kesehatan:

-   **Rumah Sakit**: Dapat memanfaatkan semua peran yang tersedia untuk manajemen skala besar.
-   **Klinik Pratama atau Spesialis**: Mungkin hanya memerlukan peran **Admin**, **Dokter**, dan **Pasien** untuk operasi sehari-hari.
-   **Puskesmas**: Peran **Admin**, **Dokter**, **Perawat**, dan **Apoteker** sangat sesuai dengan alur kerja di pusat kesehatan masyarakat.
-   **Praktik Mandiri**: Seorang dokter atau tenaga kesehatan dapat menggunakan kombinasi dasbor **Dokter** dan **Admin** untuk mengelola jadwal dan data pasien secara efisien.

Desainnya memungkinkan Anda untuk menggunakan hanya halaman (`.html`) yang relevan dengan kebutuhan operasional Anda.

---

### 💻 Teknologi yang Digunakan

- **HTML5**: Struktur dan markup semantik.
- **CSS3**: Styling modern dengan Variabel CSS untuk kemudahan theming.
- **JavaScript (ES6+)**: Logika aplikasi, manipulasi DOM, dan simulasi SPA (Single Page Application).
- **Chart.js**: Untuk membuat grafik yang interaktif dan informatif.
- **Feather Icons**: Ikon yang bersih dan ringan.

---

### 🛠️ Cara Menjalankan Secara Lokal

Proyek ini tidak memerlukan *build process* atau *dependency installation* yang rumit.

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/nazrielnr/MedixCare-Healthcare-Dashboard-UI.git
    ```

2.  **Buka direktori proyek:**
    ```bash
    cd MedixCare-Healthcare-Dashboard-UI
    ```

3.  **Buka file `index.html` di browser Anda.**
    - Cukup klik dua kali file `index.html`.
    - **(Direkomendasikan)** Gunakan ekstensi "Live Server" di VS Code untuk mendapatkan fitur *hot-reload*.

---

### 🖼️ Pratinjau Dasbor

Berikut adalah beberapa pratinjau dari berbagai dasbor yang tersedia di MedixCare.

#### Dasbor Login
![Screenshot 2025-06-06 194518](https://github.com/user-attachments/assets/c32af43a-1ccc-4425-ba18-4d6f9f30329f)

#### Dasbor Admin
![Screenshot 2025-06-06 190836](https://github.com/user-attachments/assets/d46ecec3-76ae-4a3a-86f8-879ff3ea4f2a)

#### Dasbor Dokter
![Screenshot 2025-06-06 190803](https://github.com/user-attachments/assets/82c80e57-a2d6-4f94-948e-8ca4e6ea88f7)

#### Portal Pasien
![image](https://github.com/user-attachments/assets/10df139f-299d-4b55-bc18-5683e145f631)

---

