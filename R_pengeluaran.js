// Deklarasi variabel untuk menyimpan data transaksi
const dataPengeluaran = [];

// Menangani submit form
document.getElementById("transaksiForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari melakukan submit default

    // Mendapatkan nilai dari input
    const nominal = parseFloat(document.getElementById("nominal").value);
    const kategori = document.getElementById("kategori").value;
    const tanggal = document.getElementById("tanggal").value;

    // Memanggil fungsi untuk menambahkan transaksi ke dalam array
    tambahPengeluaran(nominal, kategori, tanggal);
});

// Fungsi untuk menambahkan transaksi ke dalam array
function tambahPengeluaran(nominal, kategori, tanggal) {
    // Menambahkan objek transaksi baru ke dalam array
    dataPengeluaran.push({
        nominal,
        kategori,
        tanggal,
    });

    // Memperbarui tampilan data
    tampilData();
}

// Fungsi untuk menampilkan data transaksi dalam tabel
function tampilData() {
    const tableBody = document.querySelector("#dataPengeluaran");
    tableBody.innerHTML = ""; // Mengosongkan isi tabel sebelum menambahkan data baru

    // Loop melalui setiap transaksi dan menambahkannya ke dalam tabel
    dataPengeluaran.forEach((transaksi, index) => {
        const row = tableBody.insertRow(); // Menambahkan baris baru ke tabel

        // Menambahkan data transaksi ke dalam sel-sel tabel
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>Rp${transaksi.nominal.toLocaleString()}</td>
            <td>${transaksi.kategori}</td>
            <td>${transaksi.tanggal}</td>
            <td>
                <button class="btn btn-primary mr-2" onclick="editNominal(${index})">Edit</button>
                <button class="btn btn-danger" onclick="hapusPengeluaran(${index})">Delete</button>
            </td>
        `;
    });
}

// Fungsi untuk mengubah nominal transaksi
function editNominal(index) {
    const newNominal = prompt("Masukkan nominal baru:");
    if (newNominal !== null) {
        const parsedNominal = parseFloat(newNominal);
        if (!isNaN(parsedNominal)) {
            dataPengeluaran[index].nominal = parsedNominal;
            tampilData();
        } else {
            alert("Nominal yang dimasukkan tidak valid. Silakan masukkan angka yang valid.");
        }
    }
}

// Fungsi untuk menghapus transaksi
function hapusPengeluaran(index) {
    if (confirm("Apakah Anda yakin ingin menghapus pengeluaran ini?")) {
        dataPengeluaran.splice(index, 1);
        tampilData();
    }
}