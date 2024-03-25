
        // Fungsi untuk menambahkan pengeluaran
        function tambahPengeluaran(amount, category, description, date) {
            finances.expenses.push({ amount, category, description, date });
            tampilkanListPengeluaran();
            updateTotalExpense(); // Memanggil fungsi untuk update total pengeluaran
            updateCharts(); // Memanggil fungsi untuk update grafik
        }

        // Fungsi untuk menampilkan tabel pengeluaran
        function tampilkanListPengeluaran() {
            const expenseTableBody = document.getElementById("expenseTableBody");
            expenseTableBody.innerHTML = ""; // Mengosongkan isi tabel
            // mengecek apakah data pemasukan sudah terisi
            if (finances.expenses.length === 0) {
                document.getElementById("noExpenseMessage").style.display = "block";
            } else {
                document.getElementById("noExpenseMessage").style.display = "none";
                finances.expenses.forEach((item, index) => {
                    const row = `<tr>
                                    <td>${index + 1}</td>
                                    <td>${item.date}</td>
                                    <td>${item.category}</td>
                                    <td>Rp. ${item.amount}</td>
                                    <td>${item.description}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm" onclick="editPengeluaran(${index})">Edit</button>
                                        <button class="btn btn-danger btn-sm" onclick="hapusPengeluaran(${index})">Hapus</button>
                                    </td>
                                </tr>`;
                    expenseTableBody.innerHTML += row;
                });
            }
        }

        // Fungsi untuk mengedit pengeluaran
        function editPengeluaran(index) {
            const newAmount = parseFloat(prompt("Masukkan jumlah Pengeluaran baru:"));

            // Memastikan input jumlah adalah angka positif
            if (!isNaN(newAmount) && newAmount > 0) {
                finances.expenses[index].amount = newAmount;
                tampilkanListPengeluaran();
                updateTotalExpense(); // Memanggil fungsi untuk update total pengeluaran
                updateCharts(); // Memanggil fungsi untuk update grafik
            } else {
                alert("Masukkan jumlah Pengeluaran yang valid (angka positif).");
            }
        }

        // Fungsi untuk menghapus pengeluaran
        function hapusPengeluaran(index) {
            if (confirm("Apakah Anda yakin ingin menghapus Pengeluaran ini?")) {
                finances.expenses.splice(index, 1);
                tampilkanListPengeluaran();
                updateTotalExpense(); // Memanggil fungsi untuk update total pengeluaran
                updateCharts(); // Memanggil fungsi untuk update grafik
            }
        }


        // Fungsi untuk mengupdate total pengeluaran
        function updateTotalExpense() {
            const totalExpense = finances.expenses.reduce((total, item) => total + item.amount, 0);
            document.getElementById("totalExpense").innerText = `Total Pengeluaran: Rp. ${totalExpense}`;
        }

        tampilkanListPengeluaran();
        updateTotalExpense(); // Memanggil fungsi untuk update total pengeluaran