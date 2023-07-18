<script>
import { HorizontalBar } from "vue-chartjs";
import { mapActions, mapState } from "vuex";

export default {
  name: "chart-kategori",
  extends: HorizontalBar,

  data: () => ({
    color: null,
  }),
  props: {
    title: String,
    labels: [],
    datas: [],
  },

  computed: {
    ...mapState(["http", "theme"]),
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              type: "horizontalBar",
              label: this.title,
              backgroundColor: ["#345eeb", "#eda437", "#9b29f2", "#0943b0"],
              data: this.datas,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }
      );
    },
    getDynamiColor: function () {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + "," + 0.5 + ")";
    },
  },
};
</script>
