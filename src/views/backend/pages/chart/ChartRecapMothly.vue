<script>
import { Bar } from "vue-chartjs";
import { mapActions, mapState } from "vuex";

export default {
  name: "bar-chart-recap-mothly",
  extends: Bar,

  data: () => ({
    color: "#3F51B5",
    colors: [],
  }),
  props: {
    title: String,
    labels: [],
    datas: [],
    year: null,
  },

  computed: {
    ...mapState(["http", "theme"]),
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () {
      this.datas.forEach((element) => {
        this.color = this.getDynamiColor();
        this.colors.push(this.color);
      });

      this.renderChart(
        {
          labels: [
            "JANUARI",
            "PEBRUARI",
            "MARET",
            "APRIL",
            "MEI",
            "JUNI",
            "JULI",
            "AGUSTUS",
            "SEPTEMBER",
            "OKTOBER",
            "NOPEMBER",
            "DESEMBER",
          ],
          datasets: [
            {
              label: "Data Statistik Pada Tahun " + this.year,
              backgroundColor: this.colors,
              data: this.datas,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
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
