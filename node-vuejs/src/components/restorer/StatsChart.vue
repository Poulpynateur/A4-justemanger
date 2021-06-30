<script>
import { Line } from "vue-chartjs";

export default {
  name: "stats-chart",
  extends: Line,
  props: ["chartData"],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: [60, 40, 20, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            }
          ]
      },
      this.options
    );
  },
};
</script>

<style>
</style>
