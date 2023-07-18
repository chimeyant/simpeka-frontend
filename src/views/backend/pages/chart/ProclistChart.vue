<script>
import { HorizontalBar } from "vue-chartjs";
import { mapActions, mapState } from "vuex";

export default {
  name: "chart-proclist",
  extends: HorizontalBar,

  data: () => ({
    color: "#3F51B5",
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
    //this.color = this.theme.color;
  },
  methods: {
    fetchData: async function () {
      //let { data } = await this.http.get(
      //"api/supervisor/dashboard-pengajuan-per-bulan";
      //);
      this.renderChart(
        {
          labels: ["99.25", "86.3", "74,1", "99.25", "99.04", "36.07", "44.56"], //this.labels,
          datasets: [
            {
              type: "horizontalBar",
              label: this.title,
              backgroundColor: "#608580",
              data: [10, 20, 30, 25, 5],
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
  },
};
</script>
