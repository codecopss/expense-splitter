let moneyData = [];
let chart;
const colors = ["#ffcc00", "#ff5733", "#33ff57", "#3377ff", "#ff33aa"];

/* Initialize Chart */
function updateChart() {
    let ctx = document.getElementById("moneyChart").getContext("2d");
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: moneyData.map(item => item.category),
            datasets: [{
                data: moneyData.map(item => item.amount),
                backgroundColor: colors.slice(0, moneyData.length),
            }]
        },
        options: {
            responsive: true,
        }
    });

    updateTotalAmount();
}

/* Add Money */
function addMoney() {
    let category = document.getElementById("category").value;
    let customCategory = document.getElementById("customCategory").value.trim();
    let amount = parseFloat(document.getElementById("amount").value);

    if (!isNaN(amount) && amount > 0) {
        if (customCategory) category = customCategory;

        moneyData.push({ category, amount });
        updateList();
        updateChart();
    }
}

/* Remove Last Entry */
function removeLastEntry() {
    if (moneyData.length > 0) {
        moneyData.pop();
        updateList();
        updateChart();
    }
}

/* Update List */
function updateList() {
    let list = document.getElementById("money-list");
    list.innerHTML = "";
    moneyData.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${item.category}: ₹${item.amount}`;
        list.appendChild(listItem);
    });
}

/* Update Total Amount */
function updateTotalAmount() {
    let totalAmount = moneyData.reduce((sum, item) => sum + item.amount, 0);
    document.getElementById("totalAmount").innerText = `₹${totalAmount}`;
}

/* Dark/Light Mode Toggle */
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.toggle("light-mode", savedTheme === "light");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
    });
});
