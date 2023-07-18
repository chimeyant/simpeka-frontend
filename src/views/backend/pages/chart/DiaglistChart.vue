<script>
import { HorizontalBar } from "vue-chartjs";
import { mapActions, mapState } from "vuex";

export default {
  name: "chart-diaglist",
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
          labels: ["J18.9", "Z51.1", "I63.9", "I50.9", "N18.5", "A16.2"], //this.labels,
          datasets: [
            {
              type: "horizontalBar",
              label: this.title,
              backgroundColor: "#608580",
              data: [10, 20, 30, 25, 5, 2],
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
