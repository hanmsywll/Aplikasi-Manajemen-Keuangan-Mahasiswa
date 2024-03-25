        // Fungsi untuk memperbarui grafik
        function updateCharts() {
            // Menghitung total pemasukan dan pengeluaran
            let totalIncome = finances.income.reduce((total, item) => total + item.amount, 0);
            let totalExpense = finances.expenses.reduce((total, item) => total + item.amount, 0);

            // Render grafik Perbandingan Pemasukan dan Pengeluaran
            const overallChart = new CanvasJS.Chart("overallChart", {
                animationEnabled: true,
                title: {
                    text: "Perbandingan Pemasukan dan Pengeluaran"
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "Rp #,##0",
                    indexLabel: "{label} Rp {y}",
                    dataPoints: [
                        { y: totalIncome, label: "Pemasukan" },
                        { y: totalExpense, label: "Pengeluaran" }
                    ]
                }]
            });
            overallChart.render();

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
                y: amount,
                label: category
            }));

            const categoryChart = new CanvasJS.Chart("categoryChart", {
                animationEnabled: true,
                title: {
                    text: "Rincian Pengeluaran berdasarkan Kategori"
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "Rp #,##0",
                    indexLabel: "{label} Rp {y}",
                    dataPoints: categoryDataPoints
                }]
            });
            categoryChart.render();
        }

       
        updateCharts(); // Memanggil fungsi untuk menggambar grafik

