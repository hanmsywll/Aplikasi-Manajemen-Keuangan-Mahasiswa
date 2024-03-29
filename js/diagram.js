        // Fungsi untuk memperbarui grafik
        function updateCharts() {
            // Menghitung total pemasukan dan pengeluaran
            let totalPemasukan = 0;
            keuangan.pemasukan.forEach(item => {
                totalPemasukan += item.jumlah;
            });
            let totalPengeluaran = 0;
            keuangan.pengeluaran.forEach(item => {
                totalPengeluaran += item.jumlah;
            });
            // Render grafik Perbandingan Pemasukan dan Pengeluaran
            const chartPerbandingan = new CanvasJS.Chart("chartPerbandingan", {
                animationEnabled: true,
                title: {
                    text: "Perbandingan Pemasukan dan Pengeluaran",
                    fontFamily: "Helvetica, sans-serif",
                    fontWeight: "550"
                },
                data: [{
                    type: "pie",
                    yValueFormatString: "#,##0",
                    indexLabel: "{label} Rp. {y}",
                    dataPoints: [
                        { y: totalPemasukan, label: "Pemasukan" },
                        { y: totalPengeluaran, label: "Pengeluaran" }
                    ]
                }]
            });
            chartPerbandingan.render();

            // Render grafik Rincian Pengeluaran berdasarkan Kategori
            let kategori = {};
            keuangan.pengeluaran.forEach(item => {
                if (kategori[item.kategori]) {
                    kategori[item.kategori] += item.jumlah;
                } else {
                    kategori[item.kategori] = item.jumlah;
                }
            });

            const categoryDataPoints = Object.entries(kategori).map(([kategori, jumlah]) => ({
                y: (jumlah / totalPengeluaran * 100),
                label: `${kategori} (Rp. ${jumlah.toLocaleString()})`
            }));

            const chartRincianPengeluaran = new CanvasJS.Chart("chartRincianPengeluaran", {
                animationEnabled: true,
                title: {
                    text: "Rincian Pengeluaran",
                    fontFamily: "Helvetica, sans-serif",
                    fontWeight: "550"
                },
                data: [{
                    type: "pie",
                    yValueFormatString: "##0\"%\"",
                    indexLabel: "{label} {y}",
                    dataPoints: categoryDataPoints
                }]
            });
            chartRincianPengeluaran.render();

            const saldo = totalPemasukan - totalPengeluaran;
            document.getElementById("saldo").innerText = `Saldo: Rp. ${saldo.toLocaleString()}`;
        }
        updateCharts(); // Memanggil fungsi untuk menggambar grafik

