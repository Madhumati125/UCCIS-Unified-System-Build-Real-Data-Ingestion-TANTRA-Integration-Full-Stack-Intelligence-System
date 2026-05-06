let riskChart;
let predictionChart;
let decisionChart;

// ================= LOAD DATA =================
function loadData() {
  fetch("http://localhost:5000/api/zones")
    .then(res => res.json())
    .then(data => {
      console.log("DATA:", data); // debug
      renderCards(data);
      renderCharts(data);
    })
    .catch(err => console.error(err));
}


// ================= CARDS =================
function renderCards(data) {
  const container = document.getElementById("zones");
  container.innerHTML = "";

  data.forEach(zone => {

    let riskClass = "low";
    if (zone.risk_score >= 80) riskClass = "high";
    else if (zone.risk_score >= 50) riskClass = "medium";

    const div = document.createElement("div");
    div.className = "card " + riskClass;

    div.innerHTML = `
      <h3>${zone.zone_name}</h3>
      <p><b>Risk:</b> ${zone.risk_score}</p>
      <p><b>Prediction:</b> ${zone.prediction}</p>
      <p><b>Decision:</b> ${zone.execution_request.action} (${zone.execution_request.priority})</p>
      <p><b>Reason:</b> ${zone.reason}</p>
      <p><b>Trace:</b> ${zone.trace_id}</p>
    `;

    container.appendChild(div);
  });
}


// ================= CHARTS =================
function renderCharts(data) {

  const labels = data.map(z => z.zone_name);
  const risks = data.map(z => z.risk_score);

  const predictionCounts = { HIGH: 0, MEDIUM: 0, LOW: 0 };
  const decisionCounts = { ALERT: 0, MONITOR: 0, NONE: 0 };

  data.forEach(z => {
    predictionCounts[z.prediction]++;
    decisionCounts[z.execution_request.action]++;
  });


  // ===== RISK CHART =====
  if (!riskChart) {
    riskChart = new Chart(document.getElementById("riskChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Risk Score",
          data: risks
        }]
      },
      options: { animation: false }
    });
  }


  // ===== PREDICTION CHART =====
  if (!predictionChart) {
    predictionChart = new Chart(document.getElementById("predictionChart"), {
      type: "pie",
      data: {
        labels: ["HIGH", "MEDIUM", "LOW"],
        datasets: [{
          data: [
            predictionCounts.HIGH,
            predictionCounts.MEDIUM,
            predictionCounts.LOW
          ]
        }]
      },
      options: { animation: false }
    });
  }


  // ===== DECISION CHART =====
  if (!decisionChart) {
    decisionChart = new Chart(document.getElementById("decisionChart"), {
      type: "doughnut",
      data: {
        labels: ["ALERT", "MONITOR", "NONE"],
        datasets: [{
          data: [
            decisionCounts.ALERT,
            decisionCounts.MONITOR,
            decisionCounts.NONE
          ]
        }]
      },
      options: { animation: false }
    });
  }
}


// ================= LOAD ONCE =================
loadData();