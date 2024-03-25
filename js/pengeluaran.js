// Fungsi untuk menambahkan pengeluaran
function tambahPengeluaran(jumlah, kategori, deksripsi, tanggal) {
    keuangan.pengeluaran.push({ jumlah, kategori, deksripsi, tanggal });
    tampilkanListPengeluaran();
    updateTotalPengeluaran(); // Memanggil fungsi untuk uptanggal total pengeluaran
    updateCharts(); // Memanggil fungsi untuk uptanggal grafik
}

// Fungsi untuk menampilkan tabel pengeluaran
function tampilkanListPengeluaran() {
    const tablebodyPengeluaran = document.getElementById("tablebodyPengeluaran");
    tablebodyPengeluaran.innerHTML = ""; // Mengosongkan isi tabel

    if (keuangan.pengeluaran.length === 0) {
        document.getElementById("pesanPengeluarankosong").style.display = "block"; //
    } else {
        document.getElementById("pesanPengeluarankosong").style.display = "none"; //
        keuangan.pengeluaran.forEach((item, index) => {
            const row = `<tr>
                                    <td>${index + 1}</td>
                                    <td>${item.tanggal}</td>
                                    <td>${item.kategori}</td>
                                    <td>Rp. ${item.jumlah}</td>
                                    <td>${item.deksripsi}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm" onclick="editPengeluaran(${index})">Edit</button>
                                        <button class="btn btn-danger btn-sm" onclick="hapusPengeluaran(${index})">Hapus</button>
                                    </td>
                                </tr>`;
            tablebodyPengeluaran.innerHTML += row;
        });
    }
}

// Fungsi untuk mengedit pengeluaran
function editPengeluaran(index) {
    const pemasukanBaru = parseFloat(prompt("Masukkan jumlah Pengeluaran baru:")); //

    // Memastikan input jumlah adalah angka positif
    if (!isNaN(pemasukanBaru) && pemasukanBaru > 0) {
        keuangan.pengeluaran[index].jumlah = pemasukanBaru; //
        tampilkanListPengeluaran();
        updateTotalPengeluaran(); // Memanggil fungsi untuk uptanggal total pengeluaran
        updateChar(); // Memanggil fungsi untuk uptanggal grafik
    } else {
        alert("Masukkan jumlah Pengeluaran yang valid (angka positif).");
    }
}

// Fungsi untuk menghapus pengeluaran
function hapusPengeluaran(index) {
    if (confirm("Apakah Anda yakin ingin menghapus Pengeluaran ini?")) {
        keuangan.pengeluaran.splice(index, 1); //
        tampilkanListPengeluaran();
        updateTotalPengeluaran(); // Memanggil fungsi untuk uptanggal total pengeluaran
        updateChar(); // Memanggil fungsi untuk uptanggal grafik
    }
}


// Fungsi untuk menguptanggal total pengeluaran
function updateTotalPengeluaran() {
    let totalPengeluaran = 0;
    keuangan.pengeluaran.forEach(item => {
        totalPengeluaran += item.jumlah;
    });
    
    document.getElementById("totalPengeluaran").innerText = `Total Pengeluaran: Rp. ${totalPengeluaran}`;
}


tampilkanListPengeluaran();
updateTotalPengeluaran(); // Memanggil fungsi untuk update total pengeluaran