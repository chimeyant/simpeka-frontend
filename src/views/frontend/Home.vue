<template>
  <div>
    <video-banner />
    <high-light />
    <statistik />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VideoBanner from "./components/VideoBanner/VideoBanner.vue";
import HighLight from "./components/HighLight/Index.vue";
import Statistik from "./components/Statistik/Index.vue";
export default {
  name: "home",
  components: {
    VideoBanner,
    HighLight,
    Statistik,
  },
  data: () => ({}),
  mounted() {
    this.setPage({
      name: "home",
      crud: false,
    });
  },
  computed: {
    ...mapState(["device", "theme", "info", "snackbar", "loading", "page"]),
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", "snackbarClose"]),
  },
};
</script>




