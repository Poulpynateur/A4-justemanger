<template>
  <div>
    <canvas id="stats-chart-canva"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "stats-chart",
  props: ["chartData"],
  mounted() {
    const ctx = document.getElementById('stats-chart-canva');
    new Chart(ctx, {
        type: "line",
        data: {
          labels: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
          datasets: [
            {
              label: "Commandes par heures",
              data: this.chartData,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
      });
  }
};
</script>

<style>
</style>
