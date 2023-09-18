import Vue from "vue";
import VueRouter from "vue-router";
import BaseFrontend from "../views/frontend/Base.vue";
import Auth from "../providers/AuthProviders";
import SignIn from "../views/frontend/SignIn.vue";
//import Register from "../views/auth/Register.vue";
import Home from "../views/frontend/Home.vue";

//BASE APLIKASI
import Base from "../views/backend/Base.vue";

//Dashboard Page
import Dashboard from "../views/backend/pages/Dashboard.vue";

//Master Data App
import MasterAppInfo from "../views/backend/pages/masterdata/appinfo/Index.vue";
import MasterDataCategory from "../views/backend/pages/masterdata/category/Index.vue";
import MasterDataDokter from "../views/backend/pages/masterdata/doctor/Index.vue";
import MasterDataKelasBpjs from "../views/backend/pages/masterdata/kelas/Index.vue";
import MasterDataProblem from "../views/backend/pages/masterdata/problem/Index.vue";
import MasterDataDiagnosis from "../views/backend/pages/masterdata/diaglist/Index.vue";
import MasterDataProclist from "../views/backend/pages/masterdata/proclist/Index.vue";

//Manajemen Page
import ManajemenKlaim from "../views/backend/pages/management/klaim/Index.vue";

//Utiity Group Page
import User from "../views/backend/pages/utility/user/Index.vue";
import Changepwd from "../views/backend/pages/utility/user/Changepwd.vue";
import ProfilAkun from "../views/backend/pages/utility/user/Profil.vue";
import UtilityManajemenFitur from "../views/backend/pages/utility/manajemenfitur/Index.vue";
import UtilitymanajemenFiturAdministrator from "../views/backend/pages/utility/manajemenfitur/administrator/Index.vue";
import UtilityUpdateHistory from "../views/backend/pages/utility/updatehistory/Index.vue";
import UtilityUpdateHistoryItem from "../views/backend/pages/utility/updatehistory/items/Index.vue";

//Backend Halaman Depan
import HalamanDepanSlider from "../views/backend/pages/halamandepan/sliders/Index.vue";
import HalamanDepanPengumuman from "../views/backend/pages/halamandepan/pengumuman/Index.vue";
import HalamanDepanVideo from "../views/backend/pages/halamandepan/videos/Index.vue";

//page exception
import Page404 from "../views/frontend/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "signin",
    component: SignIn,
    meta: {
      reload: true,
    },
  },
  {
    path: "*",
    name: "page-not-found",
    component: Page404,
  },

  /**
   * Route Backend
   */

  {
    path: "/backend",
    name: "",
    meta: {
      auth: true,
    },
    component: Base,
    children: [
      { path: "", redirect: { name: "dashboard" } },
      { path: "dashboard", name: "dashboard", component: Dashboard },
      { path: "user", name: "user", component: User },
      {
        path: "chngpwd",
        name: "chngpwd",
        component: Changepwd,
      },
      {
        path: "profil-akun",
        name: "profil-akun",
        component: ProfilAkun,
      },

      //route master data
      {
        path: "master-app-info",
        name: "master-app-info",
        component: MasterAppInfo,
      },
      {
        path: "master-category",
        name: "master-category",
        component: MasterDataCategory,
      },
      {
        path: "master-dokter",
        name: "master-dokter",
        component: MasterDataDokter,
      },
      {
        path: "master-kelas-bpjs",
        name: "master-kelas-bpjs",
        component: MasterDataKelasBpjs,
      },
      {
        path: "master-problem",
        name: "master-problem",
        component: MasterDataProblem,
      },
      {
        path: "master-diagnosis",
        name: "master-diagnosis",
        component: MasterDataDiagnosis,
      },
      {
        path: "master-proclist",
        name: "master-proclist",
        component: MasterDataProclist,
      },

      //Route Manajement
      {
        path: "manajemen-klaim",
        name: "manajemen-klaim",
        component: ManajemenKlaim,
      },

      //Route slider
      {
        path: "halaman-depan-slider",
        name: "halaman_depan_slider",
        component: HalamanDepanSlider,
      },
      //Route Pengumuman
      {
        path: "halaman-depan-pengumuman",
        name: "halaman-depan-pengumuman",
        component: HalamanDepanPengumuman,
      },
      {
        path: "halaman-depan-video",
        name: "halaman-depan-video",
        component: HalamanDepanVideo,
      },

      /**
       * Route Utility
       */
      {
        path: "utility-manajemen-fitur-administrator",
        name: "utility-manajemen-fitur-administrator",
        component: UtilitymanajemenFiturAdministrator,
      },
      {
        path: "utility-manajemen-fitur",
        name: "utility-manajemen-fitur",
        component: UtilityManajemenFitur,
      },
      {
        path: "utility-update-history",
        name: "utility-update-history",
        component: UtilityUpdateHistory,
      },
      {
        path: "utility-update-history-items/:update_history_id",
        name: "utility-update-history-items",
        component: UtilityUpdateHistoryItem,
      },
    ],
  },

  /**
   * Route signin
   */
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history",
});

/**
 * router match
 */

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth);

  if (requiresAuth) {
    if (!Auth.check) {
      next({ name: "signin" });
    } else {
      next();
    }
  } else {
    if (to.name === "signin" && Auth.check) {
      if (Auth.user.authent == "superadmin") {
        next({ name: "dashboard" });
      } else if (Auth.user.authent === "kepala-rumah-sakit") {
        next({ name: "dashboard" });
      } else {
        next({ name: "dashboard" });
      }
    } else {
      next();
    }
  }
});

export default router;
