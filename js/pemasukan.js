// Fungsi untuk menambahkan pemasukan
function tambahPemasukan(amount, category, description, date) {
    finances.income.push({ amount, category, description, date });
    tampilkanListPemasukan();
    updateTotalIncome(); // Memanggil fungsi untuk update total pemasukan
    updateCharts(); // Memanggil fungsi untuk update grafik
}

// Fungsi untuk menampilkan tabel pemasukan
function tampilkanListPemasukan() {
    const incomeTableBody = document.getElementById("incomeTableBody");
    incomeTableBody.innerHTML = ""; // Mengosongkan isi tabel

    if (finances.income.length === 0) {
        document.getElementById("noIncomeMessage").style.display = "block";
    } else {
        document.getElementById("noIncomeMessage").style.display = "none";
        finances.income.forEach((item, index) => {
            const row = `<tr>
                                    <td>${index + 1}</td>
                                    <td>${item.date}</td>
                                    <td>${item.category}</td>
                                    <td>Rp. ${item.amount}</td>
                                    <td>${item.description}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm" onclick="editPemasukan(${index})">Edit</button>
                                        <button class="btn btn-danger btn-sm" onclick="hapusPemasukan(${index})">Hapus</button>
                                    </td>
                                </tr>`;
            incomeTableBody.innerHTML += row;
        });
    }
}


// Fungsi untuk mengedit pemasukan
function editPemasukan(index) {
    const newAmount = parseFloat(prompt("Masukkan jumlah Pemasukan baru:"));

    // Memastikan input jumlah adalah angka positif
    if (!isNaN(newAmount) && newAmount > 0) {
        finances.income[index].amount = newAmount;
        tampilkanListPemasukan();
        updateTotalIncome(); // Memanggil fungsi untuk update total pemasukan
        updateCharts(); // Memanggil fungsi untuk update grafik
    } else {
        alert("Masukkan jumlah Pemasukan yang valid (angka positif).");
    }
}

// Fungsi untuk menghapus pemasukan
function hapusPemasukan(index) {
    if (confirm("Apakah Anda yakin ingin menghapus Pemasukan ini?")) {
        finances.income.splice(index, 1);
        tampilkanListPemasukan();
        updateTotalIncome(); // Memanggil fungsi untuk update total pemasukan
        updateCharts(); // Memanggil fungsi untuk update grafik
    }
}

// Fungsi untuk mengupdate total pemasukan
function updateTotalIncome() {
    const totalIncome = finances.income.reduce((total, item) => total + item.amount, 0);
    document.getElementById("totalIncome").innerText = `Total Pemasukan: Rp. ${totalIncome}`;
}

// Memanggil fungsi tampilkanListPemasukan dan tampilkanListPengeluaran saat halaman dimuat
tampilkanListPemasukan();
updateTotalIncome(); // Memanggil fungsi untuk update total pemasukan