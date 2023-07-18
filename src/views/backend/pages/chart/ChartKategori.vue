<script>
import { HorizontalBar } from "vue-chartjs";
import { mapActions, mapState } from "vuex";

export default {
  name: "chart-kategori",
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
          labels: [
            "Administrasi Klaim",
            "Pengisian Resume Medis",
            "Ketepatan Kode",
            "Kelengkapan Berkas Penunjang",
          ], //this.labels,
          datasets: [
            {
              type: "horizontalBar",
              label: this.title,
              backgroundColor: ["#345eeb", "#eda437", "#9b29f2", "#0943b0"],
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
