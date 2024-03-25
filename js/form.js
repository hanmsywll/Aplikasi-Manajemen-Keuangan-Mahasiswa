
        // Data untuk kategori pemasukan dan pengeluaran
        const kategoriPengeluaran = ["Makanan", "Kesehatan", "Transportasi", "Komunikasi", "Kebutuhan Wajib", "Kebutuhan Akademik", "Hiburan"];
        const kategoriPemasukan = ["Mandiri", "Eksternal"];

        // Fungsi untuk mengisi dropdown kategori sesuai dengan jenis transaksi yang dipilih
        function fillCategoryDropdown() {
            const transactionType = document.getElementById("transactionType").value;
            const categoryDropdown = document.getElementById("kategori");
            categoryDropdown.innerHTML = "<option value='' selected disabled>Pilih Kategori</option>";

            let kategori = [];
            if (transactionType === "pemasukan") {
                kategori = kategoriPemasukan;
            } else {
                kategori = kategoriPengeluaran;
            }

            kategori.forEach(kategori => {
                const option = document.createElement("option");
                option.value = kategori;
                option.textContent = kategori;
                categoryDropdown.appendChild(option);
            });
        }

        // Memanggil fungsi fillCategoryDropdown saat halaman dimuat
        fillCategoryDropdown();

        // Menangani perubahan jenis transaksi
        document.getElementById("transactionType").addEventListener("change", function() {
            fillCategoryDropdown();
        });

        // Deklarasi variabel untuk menyimpan data transaksi
        let keuangan = {
            pemasukan: [],
            pengeluaran: []
        };

        // Fungsi untuk menampilkan pesan notifikasi
        function showNotification(message) {
            const notificationDiv = document.createElement("div");
            notificationDiv.className = "alert alert-success mt-3";
            notificationDiv.setAttribute("role", "alert");
            notificationDiv.textContent = message;

            const container = document.querySelector(".container");
            container.insertBefore(notificationDiv, container.firstChild);

            // Menghapus pesan notifikasi setelah 3 detik
            setTimeout(function() {
                notificationDiv.remove();
            }, 3000);
        }

        // Menangani submit form
        document.getElementById("transactionForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Mencegah form dari melakukan submit default

            // Mendapatkan nilai dari input
            const jumlah = parseFloat(document.getElementById("jumlah").value);
            const kategori  = document.getElementById("kategori").value;
            const deskripsi = document.getElementById("deskripsi").value;
            const tanggal = document.getElementById("tanggal").value;

            // Memanggil fungsi untuk menambahkan transaksi ke dalam array
            if (document.getElementById("transactionType").value === "pemasukan") {
                tambahPemasukan(jumlah, kategori, deskripsi, tanggal);
            } else {
                tambahPengeluaran(jumlah, kategori, deskripsi, tanggal);
            }

            // Mereset form setelah transaksi ditambahkan
            this.reset();
            
            // Menampilkan pesan notifikasi berhasil ditambahkan
            showNotification("Berhasil ditambahkan!");
        });
