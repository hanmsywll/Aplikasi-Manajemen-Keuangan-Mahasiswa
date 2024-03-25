
        // Data untuk kategori pemasukan dan pengeluaran
        const incomeCategories = ["Mandiri", "Eksternal"];
        const expenseCategories = ["Makanan", "Kesehatan", "Transportasi", "Komunikasi", "Kebutuhan Wajib", "Kebutuhan Akademik", "Hiburan"];

        // Fungsi untuk mengisi dropdown kategori sesuai dengan jenis transaksi yang dipilih
        function fillCategoryDropdown() {
            const transactionType = document.getElementById("transactionType").value;
            const categoryDropdown = document.getElementById("category");
            categoryDropdown.innerHTML = "<option value='' selected disabled>Pilih Kategori</option>";

            let categories = [];
            if (transactionType === "income") {
                categories = incomeCategories;
            } else {
                categories = expenseCategories;
            }

            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category;
                option.textContent = category;
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
        let finances = {
            income: [],
            expenses: []
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
            const amount = parseFloat(document.getElementById("amount").value);
            const category  = document.getElementById("category").value;
            const description = document.getElementById("description").value;
            const date = document.getElementById("date").value;

            // Memanggil fungsi untuk menambahkan transaksi ke dalam array
            if (document.getElementById("transactionType").value === "income") {
                tambahPemasukan(amount, category, description, date);
            } else {
                tambahPengeluaran(amount, category, description, date);
            }

            // Mereset form setelah transaksi ditambahkan
            this.reset();

            // Menampilkan pesan notifikasi berhasil ditambahkan
            showNotification("Berhasil ditambahkan!");
        });
