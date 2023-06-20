import Vue from "vue";
import VueRouter from "vue-router";
import BaseFrontend from "../views/frontend/Base.vue";
import Auth from "../providers/AuthProviders";
import SignIn from "../views/frontend/SignIn.vue";
//import Register from "../views/auth/Register.vue";
import Home from "../views/frontend/Home.vue";
import Topik from "../views/frontend/Topik.vue";
import TopikDetails from "../views/frontend/components/Topik/details/Index.vue";
import Dataset from "../views/frontend/Dataset.vue";
import DatasetDetail from "../views/frontend/components/Dataset/details/Index.vue";
import Organisasi from "../views/frontend/Organisasi.vue";
import OrganisasiDetail from "../views/frontend/components/organisasi/details/Index.vue";
import Visualisasi from "../views/frontend/Visualisasi.vue";
import VisualisasiDetail from "../views/frontend/components/visualisasi/details/Index.vue";
import Infografis from "../views/frontend/Infografis.vue";
import InfografisDetail from "../views/frontend/components/infografis/details/Index.vue";
import VideoGrafis from "../views/frontend/Videografis.vue";
import Dokumen from "../views/frontend/Dokumen.vue";
import Integrasi from "../views/frontend/Integrasi.vue";

//BASE APLIKASI
import Base from "../views/backend/Base.vue";

//Dashboard Page
import Dashboard from "../views/backend/pages/Dashboard.vue";

//Master Data App
import MasterAppInfo from "../views/backend/pages/masterdata/appinfo/Index.vue";
import MasterDataCategory from "../views/backend/pages/masterdata/category/Index.vue";
import MasterDataOrganization from "../views/backend/pages/masterdata/organization/Index.vue";
import MasterDataGroupData from "../views/backend/pages/masterdata/groupdata/Index.vue";
import MasterDataTopic from "../views/backend/pages/masterdata/topic/Index.vue";
import MasterDataRegency from "../views/backend/pages/masterdata/regency/Index.vue";

/**
 * Group Pages Manajemen
 */
import ManajemenDataset from "../views/backend/pages/manajemen/dataset/Index.vue";
import ManajemenDatasetDetail from "../views/backend/pages/manajemen/dataset/datasetdetails/Index.vue";
import ManajemenDatasetRow from "../views/backend/pages/manajemen/dataset/datasetdetails/datasetrow/Index.vue";
import ManajemenDatasetTableSetting from "../views/backend/pages/manajemen/dataset/datasetdetails/tableseting/Index.vue";
import ManajemenVisualization from "../views/backend/pages/manajemen/visualization/Index.vue";
import ManajemenInfographic from "../views/backend/pages/manajemen/infographic/Index.vue";
import ManajemenDocument from "../views/backend/pages/manajemen/document/Index.vue";
import ManajemenVideographic from "../views/backend/pages/manajemen/videographic/Index.vue";
import ManajemenPermohonan from "../views/backend/pages/manajemen/permohonan/Index.vue";

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

//ROUTE MANAJEMEN
import ManajemenCategory from "../views/backend/pages/manajemen/category/Index.vue";
import ManajemenDomain from "../views/backend/pages/manajemen/spam/Index.vue";

//Pages BTS
import BtsPetaSebaran from "../views/backend/pages/bts/sebaran/Index.vue";
import BtsDaftarPerusahan from "../views/backend/pages/bts/perusahaan/Index.vue";
import BtsSurvey from "../views/backend/pages/bts/survey/Index.vue";

//page exception
import Page404 from "../views/frontend/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signin",
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
  {
    path: "",
    name: "",
    component: BaseFrontend,
    children: [
      { path: "", redirect: { name: "home" } },
      { path: "home", name: "home", component: Home },
    ],
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

      //Route Manajemen
      {
        path: "manajemen-dataset",
        name: "manajemen-dataset",
        component: ManajemenDataset,
      },
      {
        path: "manajemen-dataset-detail/:dataset_uuid/:method",
        name: "manajemen-dataset-detail",
        component: ManajemenDatasetDetail,
      },
      {
        path: "manajemen-dataset-detail-row/:dataset_uuid/:dataset_detail_uuid",
        name: "manajemen-dataset-detail-row",
        component: ManajemenDatasetRow,
      },
      {
        path: "manajemen-dataset-detail-table-seting/:dataset_uuid/:method",
        name: "manajemen-dataset-detail-table-seting",
        component: ManajemenDatasetTableSetting,
      },
      {
        path: "manajemen-visualization",
        name: "manajemen-visualization",
        component: ManajemenVisualization,
      },
      {
        path: "manajemen-infographic",
        name: "manajemen-infographic",
        component: ManajemenInfographic,
      },
      {
        path: "manajemen-document",
        name: "manajemen-document",
        component: ManajemenDocument,
      },
      {
        path: "manajemen-videographic",
        name: "manajemen-videographic",
        component: ManajemenVideographic,
      },
      {
        path: "manajemen-permohonan",
        name: "manajemen-permohonan",
        component: ManajemenPermohonan,
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
       * Route Modul BTS
       */
      {
        path: "bts-peta-sebaran",
        name: "bts-peta-sebaran",
        component: BtsPetaSebaran,
      },
      {
        path: "bts-daftar-perusahaan",
        name: "bts-daftar-perusahaan",
        component: BtsDaftarPerusahan,
      },
      {
        path: "bts-survey",
        name: "bts-survey",
        component: BtsSurvey,
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

      /**
       * Route Manajemen Domain Spam
       */
      {
        path: "manajemen-category",
        name: "manajemen-category",
        component: ManajemenCategory,
      },
      {
        path: "manajemen-domain-spam",
        name: "manajemen-domain-spam",
        component: ManajemenDomain,
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
      } else if (Auth.user.auth === "operator") {
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
