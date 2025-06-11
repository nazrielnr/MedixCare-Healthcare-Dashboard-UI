document.addEventListener('DOMContentLoaded', () => {
    // Universal setup
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    handleModals();

    // Page-specific initializations (Router)
    const bodyId = document.body.id;
    if (bodyId === 'doctor-dashboard') {
        initDoctorDashboard();
    } else if (bodyId === 'nurse-dashboard') {
        initNurseDashboard();
    } else if (bodyId === 'admin-dashboard') {
        initAdminDashboard();
    } else if (bodyId === 'pharmacist-dashboard') {
        initPharmacistDashboard();
    } else if (bodyId === 'patient-dashboard') {
        initPatientDashboard();
    }
});

// --- EXPANDED DUMMY DATA FOR ALL DASHBOARDS ---
const medixCareData = {
    "doctor_dashboard": {
        "doctor_name": "Dr. Ardianto",
        "settings": { "name": "Dr. Ardianto", "specialty": "Dokter Umum", "notifications": { "new_appointment": true, "lab_result": false } },
        "summary_stats": { "today_patients": 12, "pending_lab_results": 3, "unread_messages": 2 },
        "today_schedule": [
            { "id": "p001", "time": "10:30", "patient_name": "Budi Santoso", "reason": "Konsultasi Rutin", "status": "Menunggu" },
            { "id": "p002", "time": "11:00", "patient_name": "Citra Lestari", "reason": "Pemeriksaan Pasca Operasi", "status": "Menunggu" },
            { "id": "p003", "time": "11:30", "patient_name": "Eka Wijaya", "reason": "Keluhan Demam", "status": "Selesai" }
        ],
        "full_schedule": [
            { "date": "2024-07-15", "time": "09:00", "patient_name": "Fajar Nugraha", "reason": "Kontrol" },
            { "date": new Date().toISOString().split('T')[0], "time": "10:30", "patient_name": "Budi Santoso", "reason": "Konsultasi Rutin" },
            { "date": new Date().toISOString().split('T')[0], "time": "11:00", "patient_name": "Citra Lestari", "reason": "Pemeriksaan Pasca Operasi" }
        ],
        "all_patients": [
            { "id": "p001", "name": "Budi Santoso", "dob": "1980-03-25", "contact": "081234567890", "last_visit": "2024-07-15" },
            { "id": "p002", "name": "Citra Lestari", "dob": "1992-08-12", "contact": "081234567891", "last_visit": "2024-07-10" },
        ],
        "messages": [
            { "id": "msg001", "sender": "Suster Rina", "subject": "Update Pasien Kamar 301A", "timestamp": "Hari ini, 09:15", "read": false, "content": "Selamat pagi, Dok. Pasien Fajar Nugraha di kamar 301A melaporkan kondisinya membaik, suhu tubuh sudah normal di 36.8°C. Mohon advis selanjutnya." },
            { "id": "msg002", "sender": "Lab MedixCare", "subject": "Hasil Lab [URGENT] - Citra Lestari", "timestamp": "Kemarin, 17:30", "read": false, "content": "Hasil tes darah untuk pasien a.n. Citra Lestari telah tersedia di sistem. Terdapat indikasi peningkatan leukosit." },
        ],
        "patient_records": { "p002": { "name": "Citra Lestari", "dob": "15-05-1988", "blood_type": "O+", "allergies": ["Penisilin"], "visit_history": [ { "date": "NOV 20, 2023", "visit_type": "Kunjungan Dokter", "details": "Konsultasi awal" }], "lab_results": { "chart_type": "line", "labels": ["Minggu-70", "Minggu-60", "Minggu-50", "Minggu-90", "Minggu-59"], "datasets": [ { "label": "Kolesterol", "data": [180, 190, 210, 200, 220], "borderColor": "#3b82f6", "tension": 0.3 } ] }, "prescriptions": [ { "name": "Paracetamol 500mg", "dosage": "3x sehari", "status": "Aktif" } ] } }
    },
    "nurse_dashboard": {
        "nurse_name": "Suster Rina",
        "assigned_patients": [ { "id": "p004", "name": "Fajar Nugraha", "room": "301A", "doctor": "Dr. Ardianto", "status": "Stabil", "vitals": { "bp": "120/80 mmHg", "hr": "75 bpm", "temp": "36.8°C" }, "notes": "Pasien tenang, tidak ada keluhan." }, { "id": "p005", "name": "Gita Permata", "room": "302B", "doctor": "Dr. Ardianto", "status": "Butuh Perhatian", "vitals": { "bp": "140/90 mmHg", "hr": "95 bpm", "temp": "38.5°C" }, "notes": "Mengeluh pusing, suhu tubuh meningkat." } ],
        "task_list": [ { "patient_id": "p005", "time": "10:00", "task": "Berikan obat demam (Paracetamol)", "completed": false }, { "patient_id": "p004", "time": "11:00", "task": "Cek tekanan darah", "completed": false }, { "patient_id": "p005", "time": "12:00", "task": "Ganti infus", "completed": true } ]
    },
    "admin_dashboard": {
        "admin_name": "Bapak Haryono",
        "kpi_stats": { "total_patients_today": 45, "occupied_beds": 82, "available_beds": 18, "total_revenue_today": "Rp 57.500.000" },
        "patient_visit_chart": { "chart_type": "bar", "labels": ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"], "datasets": [{ "label": "Jumlah Kunjungan", "data": [65, 59, 80, 81, 56, 55, 40], "backgroundColor": "#3b82f6" }] },
        "billing_status_chart": { "chart_type": "pie", "labels": ["Lunas", "Belum Dibayar", "Klaim Asuransi"], "datasets": [{ "data": [300, 120, 80], "backgroundColor": ["#10b981", "#ef4444", "#f59e0b"] }] },
        "all_patients": [
            {"id": "P001", "name": "Budi Santoso", "reg_date": "2023-01-15", "insurance": "BPJS"}, {"id": "P002", "name": "Citra Lestari", "reg_date": "2023-02-20", "insurance": "Prudential"},
            {"id": "P003", "name": "Eka Wijaya", "reg_date": "2023-03-05", "insurance": "Umum"}, {"id": "P004", "name": "Fajar Nugraha", "reg_date": "2023-04-11", "insurance": "BPJS"},
        ],
        "billing_records": [
            {"id": "INV-001", "patient_name": "Budi Santoso", "date": "2024-07-10", "amount": 350000, "status": "Lunas"}, {"id": "INV-002", "patient_name": "Citra Lestari", "date": "2024-07-11", "amount": 1250000, "status": "Belum Dibayar"},
            {"id": "INV-003", "patient_name": "Eka Wijaya", "date": "2024-07-12", "amount": 750000, "status": "Klaim Asuransi"}, {"id": "INV-004", "patient_name": "Fajar Nugraha", "date": "2024-07-13", "amount": 420000, "status": "Belum Dibayar"},
        ],
        "report_data": {
            "monthly_revenue": { "labels": ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"], "data": [120, 190, 300, 500, 250, 400] },
            "service_popularity": { "labels": ["Konsultasi Umum", "Tes Lab", "Fisioterapi", "Rawat Inap", "Farmasi"], "data": [45, 30, 15, 5, 25] }
        }
    },
    "pharmacist_dashboard": {
        "pharmacist_name": "Andi",
        "prescription_queue": [ { "id": "rx001", "patient_name": "Citra Lestari", "doctor_name": "Dr. Ardianto", "timestamp": "11:05 AM", "status": "Baru" }, { "id": "rx002", "patient_name": "John Doe", "doctor_name": "Dr. Elara Vance", "timestamp": "10:45 AM", "status": "Baru" } ],
        "prescription_details": { "rx001": { "medications": [ { "name": "Ibuprofen 400mg", "dosage": "3x1", "frequency": "Setelah Makan", "notes": "Jika perlu" }, { "name": "Vitamin C 500mg", "dosage": "1x1", "frequency": "Pagi Hari", "notes": "" } ] } },
        "inventory": [
            { "name": "Paracetamol 500mg", "category": "Analgesik", "stock": 250, "reorder_level": 50 },
            { "name": "Amoxicillin 500mg", "category": "Antibiotik", "stock": 15, "reorder_level": 20 },
            { "name": "Masker Medis", "category": "Alat Kesehatan", "stock": 45, "reorder_level": 50 },
            { "name": "Vitamin C 500mg", "category": "Suplemen", "stock": 150, "reorder_level": 30 },
            { "name": "Ibuprofen 400mg", "category": "Analgesik", "stock": 0, "reorder_level": 40 }
        ]
    },
    "patient_portal_dashboard": {
        "patient_name": "Budi Santoso",
        "profile": { "name": "Budi Santoso", "dob": "1980-03-25", "contact": "081234567890" },
        "upcoming_appointment": { "doctor_name": "Dr. Suryo", "specialty": "Spesialis Jantung", "date": "25 Desember 2024", "time": "09:00", "location": "Gedung A, Lantai 2" },
        "all_appointments": [
            { "date": "2024-12-25", "time": "09:00", "doctor": "Dr. Suryo", "specialty": "Spesialis Jantung", "status": "Terkonfirmasi" },
            { "date": "2023-10-10", "time": "10:30", "doctor": "Dr. Ardianto", "specialty": "Dokter Umum", "status": "Selesai" }
        ],
        "medical_record": { "visit_history": [ { "date": "OKT 10, 2023", "visit_type": "Konsultasi", "details": "Cek rutin tahunan" }, { "date": "JAN 22, 2023", "visit_type": "Vaksinasi", "details": "Vaksin Influenza" } ], "lab_results": { "chart_type": "line", "labels": ["Jan", "Apr", "Jul", "Okt"], "datasets": [{ "label": "Tekanan Darah Sistolik", "data": [120, 122, 118, 121], "borderColor": "#3b82f6", "tension": 0.3 }] } },
        "billing": [ { "id": "inv001", "date": "10-10-2023", "description": "Biaya Konsultasi & Administrasi", "amount": "Rp 350.000", "status": "Lunas" }, { "id": "inv002", "date": "22-01-2023", "description": "Biaya Vaksinasi", "amount": "Rp 250.000", "status": "Lunas" } ]
    }
};

// --- MODAL HANDLING ---
function handleModals() {
    // ... (Tidak berubah)
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => { button.onclick = function() { button.closest('.modal').classList.remove('show'); } });
    window.onclick = function(event) { modals.forEach(modal => { if (event.target == modal) { modal.classList.remove('show'); } }); }
}

// --- DOCTOR DASHBOARD ---
function initDoctorDashboard() {
    // ... (Tidak berubah)
    const data = medixCareData.doctor_dashboard;
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-view]');
    const viewContainers = document.querySelectorAll('.main-content .view-container');
    const patientDetailView = document.getElementById('patient-detail-view');
    const mainHeaderTitle = document.getElementById('main-header-title');
    function initDashboardView() {
        document.getElementById('doctor-name').textContent = data.doctor_name;
        document.getElementById('summary-stats-container').innerHTML = `<div class="stat-card"><div class="icon icon-primary"><i data-feather="users"></i></div><div class="info"><h4>${data.summary_stats.today_patients}</h4><p>Pasien Hari Ini</p></div></div><div class="stat-card"><div class="icon icon-yellow"><i data-feather="file-text"></i></div><div class="info"><h4>${data.summary_stats.pending_lab_results}</h4><p>Hasil Lab Tertunda</p></div></div><div class="stat-card"><div class="icon icon-green"><i data-feather="mail"></i></div><div class="info"><h4>${data.summary_stats.unread_messages}</h4><p>Pesan Belum Dibaca</p></div></div>`;
        const appointmentList = document.getElementById('appointment-list');
        const renderAppointments = (filter = '') => { const filtered = data.today_schedule.filter(p => p.patient_name.toLowerCase().includes(filter.toLowerCase())); if (filtered.length === 0) { appointmentList.innerHTML = `<li style="padding: 1rem; text-align: center; color: #6b7280;">Tidak ada pasien ditemukan.</li>`; return; } appointmentList.innerHTML = filtered.map(appt => { const statusClass = appt.status === 'Selesai' ? 'status-done' : 'status-waiting'; return `<li class="appointment-item" data-patient-id="${appt.id}"><div class="time">${appt.time}</div><div class="patient-name">${appt.patient_name}</div><div class="reason">${appt.reason}</div><div class="status"><span class="status-badge ${statusClass}">${appt.status}</span></div></li>`; }).join(''); };
        renderAppointments();
        document.getElementById('patient-search-input').addEventListener('keyup', (e) => renderAppointments(e.target.value));
        appointmentList.addEventListener('click', (e) => { const item = e.target.closest('.appointment-item'); if (item) { const patientData = data.today_schedule.find(p => p.id === item.dataset.patientId); const modal = document.getElementById('appointment-modal'); document.getElementById('modal-patient-name').textContent = patientData.patient_name; document.getElementById('modal-visit-reason').textContent = patientData.reason; document.getElementById('view-full-record-btn').dataset.patientId = item.dataset.patientId; modal.classList.add('show'); } });
    }
    function initScheduleView() {
        const calendarBody = document.getElementById('calendar-body');
        const monthYearDisplay = document.getElementById('calendar-month-year');
        const dailyScheduleList = document.getElementById('daily-schedule-list');
        const selectedDateDisplay = document.getElementById('selected-date-display');
        let currentDate = new Date();
        function renderCalendar(date) { calendarBody.innerHTML = ''; const year = date.getFullYear(); const month = date.getMonth(); const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); monthYearDisplay.textContent = `${date.toLocaleString('id-ID', { month: 'long' })} ${year}`; for (let i = 0; i < firstDay; i++) { calendarBody.innerHTML += `<div class="calendar-day other-month"></div>`; } for (let day = 1; day <= daysInMonth; day++) { const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; const hasEvent = data.full_schedule.some(e => e.date === fullDate); const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear(); calendarBody.innerHTML += `<div class="calendar-day ${isToday ? 'today' : ''}" data-date="${fullDate}">${day}${hasEvent ? '<span class="event-dot"></span>' : ''}</div>`; } }
        function showDailySchedule(dateStr) { const dateObj = new Date(dateStr.replace(/-/g, '/')); selectedDateDisplay.textContent = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }); const appointments = data.full_schedule.filter(e => e.date === dateStr); if (appointments.length > 0) { dailyScheduleList.innerHTML = appointments.map(a => `<div class="daily-appointment-item"><strong>${a.time} - ${a.patient_name}</strong><p>${a.reason}</p></div>`).join(''); } else { dailyScheduleList.innerHTML = `<p style="padding: 1rem; color: #6b7280;">Tidak ada jadwal untuk tanggal ini.</p>`; } }
        calendarBody.addEventListener('click', e => { if (e.target.matches('.calendar-day:not(.other-month)')) { document.querySelectorAll('.calendar-day.active').forEach(d => d.classList.remove('active')); e.target.classList.add('active'); showDailySchedule(e.target.dataset.date); } });
        document.getElementById('prev-month-btn').onclick = () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(currentDate); }; document.getElementById('next-month-btn').onclick = () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(currentDate); }; renderCalendar(currentDate); showDailySchedule(new Date().toISOString().split('T')[0]); const todayEl = calendarBody.querySelector('.today'); if (todayEl) todayEl.classList.add('active');
    }
    function initPatientsView() { const patientListBody = document.getElementById('all-patients-list'); const searchInput = document.getElementById('all-patients-search'); const sortSelect = document.getElementById('sort-patients-select'); function renderPatientList(patientData) { patientListBody.innerHTML = patientData.map(p => `<tr><td>${p.name}</td><td>${new Date(p.dob).toLocaleDateString('id-ID')}</td><td>${p.contact}</td><td>${new Date(p.last_visit).toLocaleDateString('id-ID')}</td></tr>`).join(''); } function sortAndFilter() { let filtered = data.all_patients.filter(p => p.name.toLowerCase().includes(searchInput.value.toLowerCase())); const sortValue = sortSelect.value; if (sortValue === 'name_asc') filtered.sort((a, b) => a.name.localeCompare(b.name)); else if (sortValue === 'name_desc') filtered.sort((a, b) => b.name.localeCompare(a.name)); else if (sortValue === 'last_visit_desc') filtered.sort((a, b) => new Date(b.last_visit) - new Date(a.last_visit)); renderPatientList(filtered); } searchInput.addEventListener('keyup', sortAndFilter); sortSelect.addEventListener('change', sortAndFilter); sortAndFilter(); }
    function initMessagesView() { const listContainer = document.getElementById('message-list-container'); const detailContainer = document.getElementById('message-detail-container'); const replyContainer = document.getElementById('message-reply-container'); const placeholder = `<div class="placeholder-message"><i data-feather="message-square"></i><p>Pilih pesan untuk dibaca</p></div>`; function renderMessageList() { listContainer.innerHTML = data.messages.map(msg => `<div class="message-item ${msg.read ? '' : 'unread'}" data-id="${msg.id}"><span class="message-sender">${msg.sender}</span><span class="message-subject">${msg.subject}</span></div>`).join(''); } function showMessage(msgId) { const msg = data.messages.find(m => m.id === msgId); if (!msg) return; msg.read = true; renderMessageList(); document.querySelector(`.message-item[data-id="${msgId}"]`).classList.add('active'); detailContainer.innerHTML = `<div class="message-detail-header"><h4>${msg.subject}</h4><p>Dari: <strong>${msg.sender}</strong> | ${msg.timestamp}</p></div><div class="message-detail-body"><p>${msg.content.replace(/\n/g, '<br>')}</p></div>`; replyContainer.classList.remove('hidden'); } listContainer.addEventListener('click', e => { const item = e.target.closest('.message-item'); if (item) { document.querySelectorAll('.message-item.active').forEach(i => i.classList.remove('active')); showMessage(item.dataset.id); } }); document.getElementById('send-reply-btn').onclick = () => { const text = document.getElementById('reply-textarea').value; if (text.trim()) { alert(`Balasan terkirim:\n"${text}"`); document.getElementById('reply-textarea').value = ''; detailContainer.innerHTML = placeholder; replyContainer.classList.add('hidden'); document.querySelectorAll('.message-item.active').forEach(i => i.classList.remove('active')); feather.replace(); } }; renderMessageList(); detailContainer.innerHTML = placeholder; }
    function initSettingsView() { const form = document.getElementById('settings-form'); document.getElementById('setting-name').value = data.settings.name; document.getElementById('setting-specialty').value = data.settings.specialty; document.getElementById('setting-notif-new-appt').checked = data.settings.notifications.new_appointment; document.getElementById('setting-notif-lab-result').checked = data.settings.notifications.lab_result; form.addEventListener('submit', e => { e.preventDefault(); data.settings.name = document.getElementById('setting-name').value; data.settings.specialty = document.getElementById('setting-specialty').value; data.settings.notifications.new_appointment = document.getElementById('setting-notif-new-appt').checked; data.settings.notifications.lab_result = document.getElementById('setting-notif-lab-result').checked; alert('Pengaturan berhasil disimpan!'); document.getElementById('doctor-name').textContent = data.settings.name; }); }
    navLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); const viewName = link.dataset.view; navLinks.forEach(nav => nav.classList.remove('active')); link.classList.add('active'); viewContainers.forEach(container => container.classList.add('hidden')); patientDetailView.classList.add('hidden'); document.getElementById(`${viewName}-view`).classList.remove('hidden'); mainHeaderTitle.textContent = link.querySelector('span').textContent; feather.replace(); }); });
    document.getElementById('view-full-record-btn').addEventListener('click', (e) => { const patientRecord = data.patient_records[e.target.dataset.patientId]; if (!patientRecord) { alert('Data rekam medis tidak tersedia.'); return; } document.getElementById('appointment-modal').classList.remove('show'); viewContainers.forEach(v => v.classList.add('hidden')); patientDetailView.classList.remove('hidden'); mainHeaderTitle.textContent = "Rekam Medis Pasien"; document.getElementById('detail-patient-name').textContent = patientRecord.name; document.getElementById('detail-patient-dob').textContent = `Lahir: ${patientRecord.dob}`; document.getElementById('detail-patient-blood').textContent = patientRecord.blood_type; document.getElementById('detail-patient-allergies').textContent = patientRecord.allergies.join(', '); document.getElementById('visit-history-list').innerHTML = patientRecord.visit_history.map(v => `<li class="visit-history-item"><div class="visit-date">${v.date}</div><div class="visit-details"><h4>${v.visit_type}</h4><p>${v.details}</p></div></li>`).join(''); document.getElementById('prescriptions-table').querySelector('tbody').innerHTML = patientRecord.prescriptions.map(p => `<tr><td>${p.name}</td><td>${p.dosage}</td><td>${p.status}</td></tr>`).join(''); const ctx = document.getElementById('lab-results-chart').getContext('2d'); if (window.labChart) window.labChart.destroy(); window.labChart = new Chart(ctx, { type: patientRecord.lab_results.chart_type, data: patientRecord.lab_results, options: { responsive: true, maintainAspectRatio: false } }); });
    document.getElementById('back-to-dashboard-btn').addEventListener('click', () => { patientDetailView.classList.add('hidden'); document.getElementById('dashboard-view').classList.remove('hidden'); document.querySelector('.nav-link[data-view="dashboard"]').classList.add('active'); mainHeaderTitle.textContent = "Dasbor"; });
    initDashboardView(); initScheduleView(); initPatientsView(); initMessagesView(); initSettingsView(); feather.replace();
}

// --- NURSE DASHBOARD ---
function initNurseDashboard() {
    // ... (Tidak berubah)
    const data = medixCareData.nurse_dashboard;
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-view]');
    const viewContainers = document.querySelectorAll('.main-content .view-container');
    const mainHeaderTitle = document.getElementById('main-header-title');
    function initOverviewView() { const pendingTasks = data.task_list.filter(t => !t.completed).length; const criticalPatients = data.assigned_patients.filter(p => p.status === 'Butuh Perhatian').length; document.getElementById('nurse-stats-container').innerHTML = `<div class="stat-card"><div class="icon icon-primary"><i data-feather="users"></i></div><div class="info"><h4>${data.assigned_patients.length}</h4><p>Pasien Ditugaskan</p></div></div><div class="stat-card"><div class="icon icon-yellow"><i data-feather="alert-circle"></i></div><div class="info"><h4>${pendingTasks}</h4><p>Tugas Tertunda</p></div></div><div class="stat-card"><div class="icon icon-red"><i data-feather="alert-triangle"></i></div><div class="info"><h4>${criticalPatients}</h4><p>Pasien Kritis</p></div></div>`; document.getElementById('nurse-notifications-list').innerHTML = `<li class="notification-item alert"><div class="icon"><i data-feather="thermometer"></i></div><div class="notification-content"><p>Suhu tubuh pasien <strong>Gita Permata</strong> (302B) meningkat menjadi 38.5°C.</p><span class="meta">5 menit yang lalu</span></div></li><li class="notification-item info"><div class="icon"><i data-feather="log-in"></i></div><div class="notification-content"><p>Pasien baru, <strong>Haryanto</strong>, telah ditugaskan ke Anda di kamar 305A.</p><span class="meta">30 menit yang lalu</span></div></li>`; }
    function initPatientsView() { const patientGrid = document.getElementById('patient-grid'); const searchInput = document.getElementById('nurse-patient-search'); const renderPatients = (filter = '') => { const filtered = data.assigned_patients.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())); if (filtered.length === 0) { patientGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">Pasien tidak ditemukan.</p>'; return; } patientGrid.innerHTML = filtered.map(p => `<div class="patient-card" data-patient-id="${p.id}"><div class="patient-card-summary"><div class="patient-info"><h4>${p.name}</h4><p>Kamar ${p.room} | Dr. ${p.doctor}</p></div><span class="status-badge ${p.status === 'Stabil' ? 'status-stable' : 'status-attention'}">${p.status}</span></div><div class="patient-card-details"><div class="vitals-grid"><div class="vital-item"><p>${p.vitals.bp}</p><p>Tek. Darah</p></div><div class="vital-item"><p>${p.vitals.hr}</p><p>Detak Jantung</p></div><div class="vital-item"><p>${p.vitals.temp}</p><p>Suhu</p></div></div><div class="nurse-notes"><strong>Catatan:</strong> <p>${p.notes}</p></div></div></div>`).join(''); }; patientGrid.addEventListener('click', e => e.target.closest('.patient-card')?.classList.toggle('expanded')); searchInput.addEventListener('keyup', e => renderPatients(e.target.value)); renderPatients(); }
    function initTasksView() { const taskList = document.getElementById('task-list'); const filterSelect = document.getElementById('task-filter-select'); const renderTasks = (filter = 'all') => { let tasks = data.task_list; if (filter === 'pending') tasks = tasks.filter(t => !t.completed); else if (filter === 'completed') tasks = tasks.filter(t => t.completed); taskList.innerHTML = tasks.map((task, index) => `<li class="task-item ${task.completed ? 'completed' : ''}"><input type="checkbox" id="task-list-${index}" data-task-id="${task.patient_id}-${task.time}" ${task.completed ? 'checked' : ''}><label for="task-list-${index}">${task.time} - ${task.task} (Pasien: ${data.assigned_patients.find(p => p.id === task.patient_id).name})</label></li>`).join(''); }; taskList.addEventListener('change', e => { if (e.target.type === 'checkbox') { e.target.closest('.task-item').classList.toggle('completed', e.target.checked); const task = data.task_list.find(t => `${t.patient_id}-${t.time}` === e.target.dataset.taskId); if (task) task.completed = e.target.checked; } }); filterSelect.addEventListener('change', e => renderTasks(e.target.value)); renderTasks(); }
    function initSettingsView() { const form = document.getElementById('nurse-settings-form'); document.getElementById('nurse-setting-name').value = data.nurse_name; form.addEventListener('submit', e => { e.preventDefault(); data.nurse_name = document.getElementById('nurse-setting-name').value; document.getElementById('nurse-name').textContent = data.nurse_name; alert('Pengaturan berhasil disimpan!'); }); }
    document.getElementById('nurse-name').textContent = data.nurse_name;
    navLinks.forEach(link => { link.addEventListener('click', e => { e.preventDefault(); const viewName = link.dataset.view; navLinks.forEach(nav => nav.classList.remove('active')); link.classList.add('active'); viewContainers.forEach(container => container.classList.add('hidden')); document.getElementById(`${viewName}-view`).classList.remove('hidden'); mainHeaderTitle.textContent = link.querySelector('span').textContent; feather.replace(); }); });
    initOverviewView(); initPatientsView(); initTasksView(); initSettingsView(); document.querySelector('.nav-link.active').click();
}

// --- ADMIN DASHBOARD ---
function initAdminDashboard() {
    // ... (Tidak berubah)
    const data = medixCareData.admin_dashboard;
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-view]');
    const viewContainers = document.querySelectorAll('.main-content .view-container');
    const mainHeaderTitle = document.getElementById('main-header-title');
    function initDashboardView() { document.getElementById('admin-name').textContent = data.admin_name; document.getElementById('kpi-stats-container').innerHTML = `<div class="stat-card"><div class="icon icon-primary"><i data-feather="users"></i></div><div class="info"><h4>${data.kpi_stats.total_patients_today}</h4><p>Total Pasien Hari Ini</p></div></div><div class="stat-card"><div class="icon icon-green"><i data-feather="trending-up"></i></div><div class="info"><h4>${data.kpi_stats.occupied_beds}</h4><p>Tempat Tidur Terisi</p></div></div><div class="stat-card"><div class="icon icon-yellow"><i data-feather="trending-down"></i></div><div class="info"><h4>${data.kpi_stats.available_beds}</h4><p>Tempat Tidur Kosong</p></div></div><div class="stat-card"><div class="icon icon-red"><i data-feather="dollar-sign"></i></div><div class="info"><h4>${data.kpi_stats.total_revenue_today}</h4><p>Pendapatan Hari Ini</p></div></div>`; new Chart(document.getElementById('patient-visit-chart'), { type: 'bar', data: data.patient_visit_chart, options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } } }); new Chart(document.getElementById('billing-status-chart'), { type: 'pie', data: data.billing_status_chart, options: { responsive: true, maintainAspectRatio: false } }); document.getElementById('btn-register-patient').addEventListener('click', () => document.getElementById('registration-modal').classList.add('show')); }
    function initPatientsView() { const patientListBody = document.getElementById('admin-patient-list'); const searchInput = document.getElementById('admin-patient-search'); const renderPatients = (filter = '') => { const filtered = data.all_patients.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.id.toLowerCase().includes(filter.toLowerCase())); patientListBody.innerHTML = filtered.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.reg_date}</td><td>${p.insurance}</td><td><button class="btn btn-secondary" onclick="alert('Membuka detail pasien ${p.name}')">Detail</button></td></tr>`).join(''); }; searchInput.addEventListener('keyup', (e) => renderPatients(e.target.value)); renderPatients(); }
    function initBillingView() { const billingListBody = document.getElementById('admin-billing-list'); const searchInput = document.getElementById('admin-billing-search'); const filterSelect = document.getElementById('billing-filter-select'); const renderBilling = (filter = 'all', search = '') => { let filtered = data.billing_records; if (filter !== 'all') filtered = filtered.filter(b => b.status === filter); if (search) filtered = filtered.filter(b => b.patient_name.toLowerCase().includes(search) || b.id.toLowerCase().includes(search)); const statusClasses = { "Lunas": "status-paid", "Belum Dibayar": "status-unpaid", "Klaim Asuransi": "status-claim" }; billingListBody.innerHTML = filtered.map(b => `<tr><td>${b.id}</td><td>${b.patient_name}</td><td>${b.date}</td><td>Rp ${b.amount.toLocaleString('id-ID')}</td><td><span class="status-badge ${statusClasses[b.status]}">${b.status}</span></td><td><button class="btn btn-primary" onclick="alert('Mengirim pengingat untuk tagihan ${b.id}')" ${b.status !== 'Belum Dibayar' ? 'disabled' : ''}>Kirim Pengingat</button></td></tr>`).join(''); }; searchInput.addEventListener('keyup', () => renderBilling(filterSelect.value, searchInput.value)); filterSelect.addEventListener('change', () => renderBilling(filterSelect.value, searchInput.value)); renderBilling(); }
    function initReportsView() { new Chart(document.getElementById('monthly-revenue-chart'), { type: 'line', data: { labels: data.report_data.monthly_revenue.labels, datasets: [{ label: 'Pendapatan (Juta Rp)', data: data.report_data.monthly_revenue.data, borderColor: '#3b82f6', tension: 0.3, fill: false }] }, options: { responsive: true, scales: { y: { beginAtZero: true } } } }); new Chart(document.getElementById('service-popularity-chart'), { type: 'doughnut', data: { labels: data.report_data.service_popularity.labels, datasets: [{ data: data.report_data.service_popularity.data, backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'] }] }, options: { responsive: true, maintainAspectRatio: false } }); }
    function initSettingsView() { document.getElementById('admin-settings-form').addEventListener('submit', (e) => { e.preventDefault(); const hospitalName = document.getElementById('hospital-name').value; const maintenance = document.getElementById('maintenance-mode').checked; alert(`Pengaturan disimpan!\nNama RS: ${hospitalName}\nMode Perawatan: ${maintenance ? 'Aktif' : 'Nonaktif'}`); }); }
    navLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); const viewName = link.dataset.view; navLinks.forEach(nav => nav.classList.remove('active')); link.classList.add('active'); viewContainers.forEach(container => container.classList.add('hidden')); document.getElementById(`${viewName}-view`).classList.remove('hidden'); mainHeaderTitle.textContent = link.querySelector('span').textContent; feather.replace(); }); });
    initDashboardView(); initPatientsView(); initBillingView(); initReportsView(); initSettingsView(); document.querySelector('.nav-link.active').click();
}

// --- PHARMACIST DASHBOARD ---
function initPharmacistDashboard() {
    // ... (Tidak berubah)
    const data = medixCareData.pharmacist_dashboard;
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-view]');
    const viewContainers = document.querySelectorAll('.main-content .view-container');
    const mainHeaderTitle = document.getElementById('main-header-title');
    function initDashboardView() {
        const queueList = document.getElementById('prescription-queue');
        queueList.innerHTML = data.prescription_queue.map(p => `<li class="prescription-item" data-id="${p.id}"><div><strong>${p.patient_name}</strong><p>Dr. ${p.doctor_name} | ${p.timestamp}</p></div><span class="status-badge status-new">${p.status}</span></li>`).join('');
        const lowStockList = document.getElementById('low-stock-list');
        const lowStockItems = data.inventory.filter(item => item.stock <= item.reorder_level);
        lowStockList.innerHTML = lowStockItems.map(item => `<li class="low-stock-item"><span>${item.name}</span><span>Stok: ${item.stock} (Min: ${item.reorder_level})</span></li>`).join('');
        const modal = document.getElementById('prescription-modal');
        queueList.addEventListener('click', e => { const item = e.target.closest('.prescription-item'); if (item) { const details = data.prescription_details[item.dataset.id]; if(details){ document.getElementById('modal-rx-details').innerHTML = details.medications.map(med => `<div class="rx-med-item"><strong>${med.name}</strong><p>Dosis: ${med.dosage} | Aturan: ${med.frequency}</p>${med.notes ? `<p class="notes">Catatan: ${med.notes}</p>` : ''}</div>`).join(''); modal.querySelector('.btn-process').dataset.id = item.dataset.id; modal.classList.add('show'); } else { alert('Detail resep tidak ditemukan untuk prototipe ini.'); } } });
        modal.querySelector('.btn-process').addEventListener('click', e => { const itemInUI = queueList.querySelector(`.prescription-item[data-id="${e.target.dataset.id}"]`); if(itemInUI){ itemInUI.querySelector('.status-badge').textContent = 'Diproses'; itemInUI.querySelector('.status-badge').className = 'status-badge status-processed'; setTimeout(() => { itemInUI.style.opacity = '0'; setTimeout(() => itemInUI.remove(), 300); }, 500); } modal.classList.remove('show'); });
    }
    function initInventoryView() {
        const inventoryListBody = document.getElementById('inventory-list');
        const searchInput = document.getElementById('inventory-search');
        const renderInventory = (filter = '') => {
            const filtered = data.inventory.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
            inventoryListBody.innerHTML = filtered.map(item => {
                let statusClass, statusText;
                if (item.stock === 0) { statusClass = 'out'; statusText = 'Habis'; }
                else if (item.stock <= item.reorder_level) { statusClass = 'low'; statusText = 'Rendah'; }
                else { statusClass = 'ok'; statusText = 'Cukup'; }
                return `<tr><td>${item.name}</td><td>${item.category}</td><td>${item.stock}</td><td>${item.reorder_level}</td><td><span class="inventory-status ${statusClass}">${statusText}</span></td></tr>`;
            }).join('');
        };
        searchInput.addEventListener('keyup', e => renderInventory(e.target.value));
        document.getElementById('add-stock-btn').onclick = () => alert('Fungsi tambah stok belum diimplementasikan.');
        renderInventory();
    }
    function initSettingsView() { const form = document.getElementById('pharma-settings-form'); form.addEventListener('submit', e => { e.preventDefault(); alert('Pengaturan apotek berhasil disimpan.'); }); }
    document.getElementById('pharmacist-name').textContent = data.pharmacist_name;
    navLinks.forEach(link => { link.addEventListener('click', e => { e.preventDefault(); const viewName = link.dataset.view; navLinks.forEach(nav => nav.classList.remove('active')); link.classList.add('active'); viewContainers.forEach(container => container.classList.add('hidden')); document.getElementById(`${viewName}-view`).classList.remove('hidden'); mainHeaderTitle.textContent = link.querySelector('span').textContent; feather.replace(); }); });
    initDashboardView(); initInventoryView(); initSettingsView(); document.querySelector('.nav-link.active').click();
}

// --- PATIENT PORTAL ---
function initPatientDashboard() {
    const data = medixCareData.patient_portal_dashboard;
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-view]');
    const viewContainers = document.querySelectorAll('.main-content .view-container');
    const mainHeaderTitle = document.getElementById('main-header-title');

    function initHomeView() {
        document.getElementById('patient-name').textContent = data.patient_name;
        const appt = data.upcoming_appointment;
        document.getElementById('upcoming-appointment-details').innerHTML = `<p><strong>${appt.doctor_name}</strong> (${appt.specialty})</p><p>${appt.date} pukul ${appt.time}</p><p>Lokasi: ${appt.location}</p>`;
        document.getElementById('visit-history-list').innerHTML = data.medical_record.visit_history.map(v => `<div class="visit-history-item"><div class="visit-date">${v.date}</div><div class="visit-details"><h4>${v.visit_type}</h4><p>${v.details}</p></div></div>`).join('');
        new Chart(document.getElementById('patient-lab-chart'), { type: 'line', data: data.medical_record.lab_results, options: { responsive: true, maintainAspectRatio: false } });
        document.getElementById('billing-table-body').innerHTML = data.billing.map(b => `<tr><td>${b.date}</td><td>${b.description}</td><td>${b.amount}</td><td><span class="status-badge ${b.status === 'Lunas' ? 'status-paid' : 'status-unpaid'}">${b.status}</span></td></tr>`).join('');
        
        const tabs = document.querySelectorAll('.tab-link');
        const contents = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(item => item.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });
        document.getElementById('download-bill-btn').addEventListener('click', () => alert('Tagihan sedang diunduh...'));
    }

    function initAppointmentsView() {
        const listBody = document.getElementById('all-appointments-list');
        listBody.innerHTML = data.all_appointments.map(a => {
            const statusClass = a.status === 'Terkonfirmasi' ? 'status-confirmed' : 'status-completed';
            return `<tr><td>${new Date(a.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}, ${a.time}</td><td>${a.doctor}</td><td>${a.specialty}</td><td><span class="status-badge ${statusClass}">${a.status}</span></td></tr>`;
        }).join('');
    }

    function initProfileView() {
        const form = document.getElementById('patient-profile-form');
        document.getElementById('profile-name').value = data.profile.name;
        document.getElementById('profile-dob').value = data.profile.dob;
        document.getElementById('profile-contact').value = data.profile.contact;
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Profil berhasil diperbarui!');
        });
    }

    // SPA Navigation Logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = link.dataset.view;
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            viewContainers.forEach(container => container.classList.add('hidden'));
            document.getElementById(`${viewName}-view`).classList.remove('hidden');
            mainHeaderTitle.innerHTML = (viewName === 'home') 
                ? `Selamat Datang, <span id="patient-name">${data.patient_name}</span>`
                : link.querySelector('span').textContent;
            feather.replace();
        });
    });

    // Initializations
    initHomeView();
    initAppointmentsView();
    initProfileView();
    document.querySelector('.nav-link.active').click();
}