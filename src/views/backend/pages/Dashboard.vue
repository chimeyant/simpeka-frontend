<template>
  <v-container
    fluid
    class="pt-10 grid-list-xl"
  >

    <v-row>
      <div class="ml-5 mb-5 font-weight-bold black--text">
        Selamat Datang, {{ user.name.toUpperCase() }}
        <div class="font-weight-regular grey--text">
          Inilah dashboard aplikasi anda
        </div>
      </div>
    </v-row>
    <v-row class="pl-2">
      <v-col cols="2">
        <v-select
          label="Tahun"
          outlined
          dense
          hide-detail
          :color="theme.color"
          v-model="tahun"
          :items="tahuns"
          @change="refreshTahun"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="pt-0 pl-2 pr-2">
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
              :year="tahun"
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

    <v-row class="ml-2 mr-2 mt-10">
      <v-col cols="3">
        <v-select
          label="Bulan"
          outlined
          dense
          hide-detail
          :color="theme.color"
          v-model="bulan"
          :items="bulans"
          @change="refreshBulan"
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-select
          label=""
          outlined
          dense
          hide-detail
          :color="theme.color"
          v-model="layanan"
          :items="layanans"
          @change="refreshBulan"
        ></v-select>
      </v-col>
    </v-row>

    <v-row
      class="ml-2 mr-2"
      v-if="user.authent == 'administrator'"
    >
      <v-row :class="device.mobile ? `pa-1 ` :  'pl-2 pr-2'">
        <v-col :cols="device.mobile ? `12` : `6`">
          <v-card
            :color="this.theme.color"
            dark
            class="card-ant-style"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h6 box-statistik-title orange--text">Jml. Pending Klaim</v-card-title>
                <v-card-text style="height:90px">
                  <v-row class="">
                    <v-col cols="12">
                      <v-row class="mt-0 justify-end text-lg-h4 ml-1 mb-5 black--text">{{ datamonthly.pendingklaim }}</v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <div class="caption white--text mt-4">
                    Update At : last minute ago
                  </div>
                </v-card-actions>
              </div>

            </div>
          </v-card>
        </v-col>

        <!-- <v-col :cols="device.mobile ? `12` : `4`">
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
                      <v-row class="mt-0 justify-end text-lg-h4  ml-7 mb-5 black--text">{{ datamonthly.tarifrs }}</v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <div class="caption white--text mt-4">
                    Update At : last minute ago
                  </div>
                </v-card-actions>
              </div>

            </div>
          </v-card>
        </v-col> -->

        <v-col
          :cols="device.mobile ? `12` : `6`"
          v-show="user.authent=='administrator'"
        >
          <v-card
            :color="this.theme.color"
            dark
            class="card-ant-style"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h6 box-statistik-title orange--text">Total Tarif Pending Klaim</v-card-title>
                <v-card-text style="height: 90px">
                  <v-row class="justify-content-end">
                    <v-col cols="12">
                      <v-row class="mt-0 justify-end text-lg-h4 ml-7 mb-5 black--text">{{ datamonthly.tariftotal }}</v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <div class="caption white--text mt-4">
                    Update At : last minute ago
                  </div>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <v-row class="mt-5 mr-2 ml-2">
      <v-col cols="12">
        <v-card>
          <v-card-title
            style="background-color:#608580"
            class="white--text"
          >Pending Klaim Berdasarkan Penyebab Pending Klaim</v-card-title>
          <v-card-text class="mt-5">
            <chart-kategori
              title="Pending Klaim Berdasarkan Penyebab Pending Klaim"
              :labels="kategori.labels"
              :datas="kategori.data"
              :key="kategori.key"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="mt-5 mr-2 ml-2"
      v-show="user.authent=='administrator'"
    >
      <v-col cols="6">
        <v-card>
          <v-card-title
            style="background-color:#608580"
            class="white--text"
          >ICD - 10</v-card-title>
          <v-card-text class="mt-5">
            <diaglist-chart
              title="Diagnosis"
              :labels="diagnostic.labels"
              :datas="diagnostic.data"
              :key="diagnostic.key"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title
            style="background-color:#608580"
            class="white--text"
          >ICD -9-CM</v-card-title>
          <v-card-text class="mt-5">
            <proclist-chart
              title="Tindakan"
              :labels="tindakan.labels"
              :datas="tindakan.data"
              :key="tindakan.key"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="mt-5 mr-2 ml-2"
      v-show="user.authent=='administrator'"
    >
      <v-col cols="12">
        <div>Rekapitulasi Pending Klaim Per Dokter</div>
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-show="device.desktop"
          :headers="doctor.headers"
          :items="doctor.records"
          :items-per-page="10"
          class="elevation-2 mb-1"
          :color="theme.color"
          :loading="loading.table"
          loading-text="Loading... Please wait"
          :search="search"
        ></v-data-table>

      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DataChart from "../pages/chart/ChartRecapMothly.vue";
import PieChart from "../pages/chart/PieChart";
import ChartKategori from "../pages/chart/ChartKategori.vue";
import DiaglistChart from "../pages/chart/DiaglistChart.vue";
import ProclistChart from "../pages/chart/ProclistChart.vue";

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
    ChartKategori,
    DiaglistChart,
    ProclistChart,
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
      datas: [],
    },
    datapiechart: {
      title: "Data Berdasarkan Pengobatan",
      labels: [],
      datas: [],
    },

    tahuns: [
      { text: "2022", value: 2022 },
      { text: "2023", value: 2023 },
    ],
    tahun: null,
    bulans: [
      { text: "JANUARI", value: "01" },
      { text: "PEBRUARI", value: "02" },
      { text: "MARET", value: "03" },
      { text: "APRIL", value: "04" },
      { text: "MEI", value: "05" },
      { text: "JUNI", value: "06" },
      { text: "JULI", value: "07" },
      { text: "AGUSTUS", value: "08" },
      { text: "SEPTEMBER", value: "09" },
      { text: "OKTOBER", value: "10" },
      { text: "NOPEMBER", value: "11" },
      { text: "DESEMBER", value: "12" },
    ],
    bulan: null,

    piekey: 0,
    barkey: 0,

    datamonthly: {
      pendingklaim: 0,
      tarifrs: 0,
      tariftotal: 0,
    },

    doctor: {
      records: [],
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "nomor",
          width: 50,
        },
        {
          text: "KODE",
          align: "start",
          sortable: false,
          value: "code",
          width: 50,
        },
        {
          text: "DOKTER PENANGGUNG JAWAB",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "JUMLAH KASUS", value: "jml", sortable: true, align: "right" },
      ],
    },

    diagnostic: {
      labels: [],
      data: [],
      key: 0,
    },
    tindakan: {
      labels: [],
      data: [],
      key: 0,
    },
    kategori: {
      labels: [],
      data: [],
      key: 0,
    },

    layanans: [
      { text: "Semua", value: "semua" },
      { text: "Rawat Jalan", value: "rawat-jalan" },
      { text: "Rawat Inap", value: "rawat-inap" },
    ],

    layanan: "semua",
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
  },
  mounted() {
    let date = new Date();
    this.tahun = date.getFullYear();
    this.bulan = date.getMonth() + 1;

    if (this.bulan < 10) {
      this.bulan = "0" + this.bulan;
    }
    this.fetchDataBarchartMonthly();
    this.fetchDataPengobatan();

    this.fetchPendingClaimMonthly();
    this.fetcTarifRsPertahun();
  },
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
          .get("api/v2/dashboard/per-jenis-pengobatan/" + this.tahun)
          .then((res) => {
            this.datapiechart.labels = ["Rawat Inap", "Rawat Jalan"];
            this.datapiechart.datas = res.data;

            this.piekey += 1;
          });
      } catch (error) {}
    },

    fetchDataBarchartMonthly: async function () {
      try {
        let { data } = await this.http
          .get("api/v2/dashboard/recap-monthly/" + this.tahun)
          .then((res) => {
            console.log(res);
            this.databarchart.datas = res.data;
            this.databarchart.year = this.tahun;
            this.barkey += 1;
          });
      } catch (error) {}
    },

    refreshTahun: function () {
      this.fetchDataBarchartMonthly();
      this.fetchDataPengobatan();
      this.refreshBulan();
    },

    fetchPendingClaimMonthly: async function () {
      try {
        const bulantahun = this.tahun + "-" + this.bulan;

        let { data } = await this.http.get(
          "api/v2/dashboard/rekap-pending-klaim-per-bulan/" +
            bulantahun +
            "/" +
            this.layanan
        );

        this.datamonthly.pendingklaim = data;
      } catch (error) {}
    },

    refreshBulan: function () {
      this.fetchPendingClaimMonthly();
      this.fethTarifRsMonthly();
      this.fethTarifTotalMonthly();
      this.fetchClaimsMonthlyByDoctor();
      this.fetchClaimByDiagnostic();
      this.fetchClaimByTindakan();
      this.fetchClaimByKategori();
    },

    fethTarifRsMonthly: async function () {
      try {
        const bulantahun = this.tahun + "-" + this.bulan;

        let { data } = await this.http.get(
          "api/v2/dashboard/tarif-rs-monthly/" + bulantahun + "/" + this.layanan
        );

        this.datamonthly.tarifrs = data;
      } catch (error) {}
    },

    fethTarifTotalMonthly: async function () {
      try {
        const bulantahun = this.tahun + "-" + this.bulan;

        let { data } = await this.http.get(
          "api/v2/dashboard/tarif-total-monthly/" +
            bulantahun +
            "/" +
            this.layanan
        );

        this.datamonthly.tariftotal = data;
      } catch (error) {}
    },

    fetchClaimsMonthlyByDoctor: async function () {
      try {
        const bulantahun = this.tahun + "-" + this.bulan;

        let { data } = await this.http.get(
          "api/v2/dashboard/recap-claims-monthly-by-doctor/" +
            bulantahun +
            "/" +
            this.layanan
        );

        this.doctor.records = data;
      } catch (error) {}
    },

    fetchClaimByDiagnostic: async function () {
      try {
        const bulantahun = this.tahun + "-" + this.bulan;
        let {
          data: { labels, data },
        } = await this.http.get(
          "api/v2/dashboard/data-chart-by-diagnostic/" + bulantahun
        );

        this.diagnostic.labels = labels;
        this.diagnostic.data = data;
        this.diagnostic.key += 1;
      } catch (error) {}
    },
    fetchClaimByTindakan: async function () {
      try {
        const bulantahun = this.tahun + "-" + this.bulan;
        let {
          data: { labels, data },
        } = await this.http.get(
          "api/v2/dashboard/data-chart-by-tindakan/" + bulantahun
        );

        this.tindakan.labels = labels;
        this.tindakan.data = data;
        this.tindakan.key += 1;
      } catch (error) {}
    },
    fetchClaimByKategori: async function () {
      try {
        const bulantahun = this.tahun + "-" + this.bulan;
        let {
          data: { labels, data },
        } = await this.http.get(
          "api/v2/dashboard/data-chart-by-kategori/" +
            bulantahun +
            "/" +
            this.layanan
        );

        this.kategori.labels = labels;
        this.kategori.data = data;
        this.kategori.key += 1;
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
