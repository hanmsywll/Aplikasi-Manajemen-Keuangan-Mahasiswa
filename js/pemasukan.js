// Fungsi untuk menambahkan pemasukan
function tambahPemasukan(amount, category, description, date) {
    keuangan.income.push({ amount, category, description, date });
    tampilkanListPemasukan();
    updateTotalIncome(); // Memanggil fungsi untuk update total pemasukan
    updateCharts(); // Memanggil fungsi untuk update grafik
}

        // Fungsi untuk menambahkan pemasukan
        function tambahPemasukan(jumlah, kategori, deskripsi, tanggal) {
            keuangan.pemasukan.push({ jumlah, kategori, deskripsi, tanggal });
            tampilkanListPemasukan();
            updateTotalPemasukan(); // Memanggil fungsi untuk update total pemasukan
            updateCharts(); // Memanggil fungsi untuk update grafik
        }

        // Fungsi untuk menampilkan tabel pemasukan
        function tampilkanListPemasukan() {
            const tabelBodyPemasukan = document.getElementById("tabelBodyPemasukan");
            tabelBodyPemasukan.innerHTML = ""; // Mengosongkan isi tabel

            if (keuangan.pemasukan.length === 0) {
                document.getElementById("pesanPemasukanKosong").style.display = "block";
            } else {
                document.getElementById("pesanPemasukanKosong").style.display = "none";
                keuangan.pemasukan.forEach((item, index) => {
                    const row = `<tr>
                                    <td>${index + 1}</td>
                                    <td>${item.tanggal}</td>
                                    <td>${item.kategori}</td>
                                    <td>Rp. ${item.jumlah}</td>
                                    <td>${item.deskripsi}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm" onclick="editPemasukan(${index})">Edit</button>
                                        <button class="btn btn-danger btn-sm" onclick="hapusPemasukan(${index})">Hapus</button>
                                    </td>
                                </tr>`;
                    tabelBodyPemasukan.innerHTML += row;
                });
            }
        }


        // Fungsi untuk mengedit pemasukan
        function editPemasukan(index) {
            const jumlahBaru = parseFloat(prompt("Masukkan jumlah Pemasukan baru:"));

            // Memastikan input jumlah adalah angka positif
            if (!isNaN(jumlahBaru) && jumlahBaru > 0) {
                keuangan.pemasukan[index].jumlah = jumlahBaru;
                tampilkanListPemasukan();
                updateTotalPemasukan(); // Memanggil fungsi untuk update total pemasukan
                updateCharts(); // Memanggil fungsi untuk update grafik
            } else {
                alert("Masukkan jumlah Pemasukan yang valid (angka positif).");
            }
        }

        // Fungsi untuk menghapus pemasukan
        function hapusPemasukan(index) {
            if (confirm("Apakah Anda yakin ingin menghapus Pemasukan ini?")) {
                keuangan.pemasukan.splice(index, 1);
                tampilkanListPemasukan();
                updateTotalPemasukan(); // Memanggil fungsi untuk update total pemasukan
                updateCharts(); // Memanggil fungsi untuk update grafik
            }
        }

        // Fungsi untuk mengupdate total pemasukan
        function updateTotalPemasukan() {
            const totalPemasukan = keuangan.pemasukan.reduce((total, item) => total + item.jumlah, 0);
            document.getElementById("totalPemasukan").innerText = `Total Pemasukan: Rp. ${totalPemasukan}`;
        }

        // Memanggil fungsi tampilkanListPemasukan dan tampilkanListPengeluaran saat halaman dimuat
        tampilkanListPemasukan();
        updateTotalPemasukan(); // Memanggil fungsi untuk update total pemasukan
