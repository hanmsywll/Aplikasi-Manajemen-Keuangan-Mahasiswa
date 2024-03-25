        // Fungsi untuk memperbarui grafik
        function updateCharts() {
            // Menghitung total pemasukan dan pengeluaran
            let totalPemasukan = finances.income.reduce((total, item) => total + item.amount, 0);
            let totalPengeluaran = finances.expenses.reduce((total, item) => total + item.amount, 0);

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
                    startAngle: 240,
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
            let categories = {};
            finances.expenses.forEach(item => {
                if (categories[item.category]) {
                    categories[item.category] += item.amount;
                } else {
                    categories[item.category] = item.amount;
                }
            });

            const categoryDataPoints = Object.entries(categories).map(([category, amount]) => ({
                y: (amount / totalPengeluaran * 100).toFixed(2),
                label: `${category} (Rp. ${amount.toLocaleString()})`
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
                    startAngle: 240,
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

