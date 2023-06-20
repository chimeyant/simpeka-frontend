<template>
  <v-container
    fluid
    class="pt-10 grid-list-xl"
  >
    <v-row>
      <v-col cols="12">
        <div class="ml-5 mb-10 font-weight-bold black--text mb-5">
          PETA SEBARAN BTS PROVINSI BANTEN
          <div class="font-weight-regular grey--text mt-10">
            <l-map
              style="height: 500px ; z-index:0 ;"
              :zoom="zoom"
              :center="center"
            >
              <l-tile-layer
                :url="url"
                :attribution="attribution"
              ></l-tile-layer>
              <l-marker
                v-for="(item,index) in markers"
                :key="index"
                :visible="item.visible"
                :draggable="item.draggable"
                :lat-lng.sync="item.position"
              >

                <l-icon
                  :iconSize="item.size"
                  :icon-url="item.icon"
                  className=""
                />
                <l-popup :content="item.tooltip" />
                <l-tooltip :content="item.tooltip" />
              </l-marker>
            </l-map>
          </div>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import { mapActions, mapState } from "vuex";
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

    //property map
    //url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">Dinas Komunikasi Informatika Statistik dan Persandian</a>',
    zoom: 10,
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
  }),
  computed: {
    ...mapState(["theme", "http", "device", "loading", "event", "user"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/v2/dashboard",
      pagination: false,
      title: "PETA SEBARAN",
      subtitle: "Berikut Gambaran Semua BTS Aplikasi Anda",
      showtable: false,
      breadcrumbs: [
        {
          text: "BTS",
          disabled: false,
          href: "",
        },
        {
          text: "Peta Sebaran",
          disabled: false,
          href: "",
        },
      ],
    });
  },
  mounted() {
    this.fetchSebaran();
  },
  methods: {
    ...mapActions([
      "setPage",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
    ]),

    fetchSebaran: async function () {
      let { data } = await this.http.get("api/v2/bts/sebaran");

      this.markers = data;
    },
  },
};
</script>
  
  <style>
.small {
  max-width: 600px;
  margin: 150px auto;
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
  