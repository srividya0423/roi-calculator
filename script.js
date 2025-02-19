function calculateROI() {
    const dailyWastedHours = parseFloat(document.getElementById("dailyWastedHours").value);
    const employees = parseInt(document.getElementById("employees").value);
    const workingHours = parseFloat(document.getElementById("workingHours").value);
    const workingDays = parseInt(document.getElementById("workingDays").value);
    const annualSalary = parseFloat(document.getElementById("annualSalary").value);
    const quitEmployees = parseInt(document.getElementById("quitEmployees").value);
    const efficiencyImprovement = parseFloat(document.getElementById("efficiencyImprovement").value) / 100;
    const investmentCost = parseFloat(document.getElementById("investmentCost").value);
    const turnoverPercentage = parseFloat(document.getElementById("turnoverPercentage").value) / 100;
    const projectCost = parseFloat(document.getElementById("projectCost").value);
    const revenueIncreasePercentage = parseFloat(document.getElementById("revenueIncreasePercentage").value) / 100;

    const hourlyWage = annualSalary / (workingDays * workingHours);
    const totalWastedManHours = dailyWastedHours * employees * workingDays;
    const totalFinancialLoss = totalWastedManHours * hourlyWage;
    const productivityGain = totalWastedManHours * efficiencyImprovement;
    const costSavings = productivityGain * hourlyWage;
    const turnoverCost = quitEmployees * annualSalary * turnoverPercentage;
    const revenueIncrease = (revenueIncreasePercentage * (annualSalary * employees));
    const totalSavings = costSavings + turnoverCost + revenueIncrease;
    const roi = ((totalSavings - (investmentCost + projectCost)) / (investmentCost + projectCost)) * 100;

    document.getElementById("resultBody").innerHTML = `
        <tr><td>Hourly Wage per Employee</td><td>$${hourlyWage.toFixed(2)}</td></tr>
        <tr><td>Total Wasted Man-Hours per Year</td><td>${totalWastedManHours.toFixed(2)}</td></tr>
        <tr><td>Total Financial Loss</td><td>$${totalFinancialLoss.toFixed(2)}</td></tr>
        <tr><td>ROI</td><td>${roi.toFixed(2)}%</td></tr>
    `;

    renderChart([totalFinancialLoss, costSavings, turnoverCost, revenueIncrease], ['Loss', 'Savings', 'Turnover', 'Revenue']);
}

function renderChart(data, labels) {
    new Chart(document.getElementById('roiChart'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['red', 'green', 'blue', 'yellow']
            }]
        }
    });
}

function exportToCSV() {
    const data = document.getElementById("resultTable").innerText;
    const blob = new Blob([data], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "roi_results.csv";
    link.click();
}

function exportToPDF() {
    window.print();
}
