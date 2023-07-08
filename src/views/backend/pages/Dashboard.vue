<template>
  <v-container
    fluid
    class="pt-10 grid-list-xl"
  >

    <v-row>
      <div class="ml-5 mb-10 font-weight-bold black--text">
        Selamat Datang, {{ user.name.toUpperCase() }}
        <div class="font-weight-regular grey--text">
          Inilah dashboard aplikasi anda
        </div>
      </div>
    </v-row>
    <v-row class="pa-6">
      <v-col cols=8>
        <v-card>
          <v-card-title
            style="background-color:#608580"
            class="white--text"
          >Data Statistik Per Bulan</v-card-title>
          <v-card-text class="mt-5">
            <data-chart
              :title="databarchart.title"
              :labels="databarchart.labels"
              :datas="databarchart.datas"
              :key="barkey"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols=4>
        <v-card>
          <v-card-title
            style="background-color:#608580"
            class="white--text"
          >Data Berdasarkan Kategori </v-card-title>
          <v-card-text class="mt-5">
            <pie-chart
              :title="datapiechart.title"
              :labels="datapiechart.labels"
              :datas="datapiechart.datas"
              :key="piekey"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pa-1">

      <v-col class="stats-widget-v3">
        <v-row :class="device.mobile ? `pa-1 ` : `pa-7`">
          <v-col :cols="device.mobile ? `12` : `4`">
            <v-card
              :color="this.theme.color"
              dark
              class="card-ant-style"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h6 box-statistik-title orange--text">JML. PENDING KLAIM</v-card-title>
                  <v-card-text style="height:90px">
                    <v-row class="justify-content-end">
                      <v-col cols="12">
                        <v-row class="mt-5 justify-end text-lg-h4 ml-7 mb-5 black--text">{{ dataklaimpertahun }}</v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <div class="caption white--text mt-4">
                      Update At : last minute ago
                    </div>
                  </v-card-actions>
                </div>
                <div class="mr-8 mt-8">
                  <v-avatar
                    size="80"
                    class="elevation-2"
                    :color="theme.color + ` darken-1`"
                  >
                    <v-img src="/images/claim.png"></v-img>

                  </v-avatar>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col :cols="device.mobile ? `12` : `4`">
            <v-card
              :color="this.theme.color"
              dark
              class="card-ant-style"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h6 box-statistik-title orange--text">TOTAL TARIF PENDING RS</v-card-title>
                  <v-card-text style="height:90px">
                    <v-row class="justify-content-end">
                      <v-col cols="12">
                        <v-row class="mt-5 justify-end text-lg-h4  ml-7 mb-5 black--text">{{ tarifrspertahun }}</v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <div class="caption white--text mt-4">
                      Update At : last minute ago
                    </div>
                  </v-card-actions>
                </div>
                <div class="mr-8 mt-8 ">
                  <v-avatar
                    size="80"
                    class="elevation-2"
                    :color="theme.color + ` darken-1`"
                  >
                    <v-img src="/images/pending-money.png"></v-img>

                  </v-avatar>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col :cols="device.mobile ? `12` : `4`">
            <v-card
              :color="this.theme.color"
              dark
              class="card-ant-style"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h6 box-statistik-title orange--text">TOTAL TARFI PENDING INA-CBGs</v-card-title>
                  <v-card-text style="height: 90px">
                    <v-row class="justify-content-end">
                      <v-col cols="12">
                        <v-row class="mt-5 justify-end text-lg-h4 ml-7 mb-5 black--text">{{ groupdata.jmldatakeuangan }}</v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <div class="caption white--text mt-4">
                      Update At : last minute ago
                    </div>
                  </v-card-actions>
                </div>
                <div class="mr-8 mt-8">
                  <v-avatar
                    size="80"
                    class="elevation-2"
                    :color="theme.color + ` darken-1`"
                  >
                    <v-img src="/images/finance.png"></v-img>

                  </v-avatar>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DataChart from "../pages/chart/ChartRecapMothly.vue";
import PieChart from "../pages/chart/PieChart";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LTooltip,
} from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import "leaflet/dist/leaflet.css";

export default {
  name: "dashboard",

  components: {
    DataChart,
    PieChart,
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
    LIcon,
    LPopup,
    LTooltip,
  },

  data: () => ({
    num: 1,

    //variable dashboard
    groupdata: {
      jmldatastatistik: 0,
      jmldatageospasial: 0,
      jmldatakeuangan: 0,
    },

    //property map
    //url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright"><span class="green--text">Dinas Komunikasi Informatika Statistik dan Persandian</span>',
    zoom: 11,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },

    marker: {
      id: "m1",
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "<h4>Lampu Merah</h4><p>Rambu Lampu Merah </p>",
      draggable: false,
      visible: true,
    },
    marker2: {
      id: "m2",
      position: { lat: -6.2546, lng: 106.6405384 },
      tooltip:
        "<h4>Lampu Merah 2</h4><p>Rambu Lampu Merah Stopan Pemda Tigaraksa </p><p>Kondisi Baik</p>",
      draggable: false,
      visible: true,
    },

    markers: [],

    dataklaimpertahun: 0,
    tarifrspertahun: 0,

    databarchart: {
      title: "Data Statitistik",
      labels: [
        "Dataset",
        "Visualisasi",
        "Infografis",
        "Video Grafis",
        "Dokumen",
      ],
      datas: [30, 40, 50, 12, 30],
    },
    datapiechart: {
      title: "Data Berdasarkan Pengobatan",
      labels: [],
      datas: [],
    },

    piekey: 0,
    barkey: 0,
  }),
  computed: {
    ...mapState(["theme", "http", "device", "loading", "event", "user"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/v2/dashboard",
      pagination: false,
      title: "Dashboard",
      subtitle: "Berikut Gambaran Semua Data Aplikasi Anda",
      showtable: false,
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          href: "",
        },
        {
          text: "Dashboard",
          disabled: false,
          href: "",
        },
      ],
    });

    this.fetcDataPertahun();
    this.fetcTarifRsPertahun();
    this.fetchDataPengobatan();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
    ]),

    fetchDashboard: async function () {
      let {
        data: {
          data: { jmldatastatistik, jmldatageospasial, jmldatakeuangan },
        },
      } = await this.http.get("api/v2/dashboard");

      this.groupdata.jmldatastatistik = jmldatastatistik;
      this.groupdata.jmldatageospasial = jmldatageospasial;
      this.groupdata.jmldatakeuangan = jmldatakeuangan;
    },

    fetcDataPertahun: async function () {
      try {
        let { data } = await this.http.get("api/v2/dashboard/recap-per-tahun");
        this.dataklaimpertahun = data;
      } catch (error) {}
    },

    fetcTarifRsPertahun: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/dashboard/tarif-rs-per-tahun"
        );
        this.tarifrspertahun = data;
      } catch (error) {}
    },

    fetchDataPengobatan: async function () {
      try {
        let { data } = await this.http
          .get("api/v2/dashboard/per-jenis-pengobatan")
          .then((res) => {
            this.datapiechart.labels = ["Rawat Inap", "Rawat Jalan"];
            this.datapiechart.datas = res.data;

            this.piekey += 1;
          });
      } catch (error) {}
    },

    fetchDataChartByJenis: async function () {
      try {
        let {
          data: { code, success, message, labels, datas },
        } = await this.http.get("api/v2/data-chart-by-jenis").then((res) => {
          this.databarchart.labels = res.data.labels;
          this.databarchart.datas = res.data.datas;

          this.barkey += 1;
        });
      } catch (error) {}
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
.card-ant-style {
  background-image: url("/images/bg-card.jpeg");
  background-size: cover;
}
.box-statistik-title {
  height: 100px;
  align-items: start;
}
.animasi {
  position: relative;
  animation: ripple 5s infinite;
  border-radius: 10%;
  border: none;
  background-color: #eff2f5;
  box-shadow: inset 10px 10px 20px #cf1313, inset -10px -10px 20px #ffffff;
  transition: 0.33s ease-in all;
  opacity: 0;
}

@keyframes ripple {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>
