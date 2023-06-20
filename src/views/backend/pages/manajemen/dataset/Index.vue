<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__fadeInUp rounded-0">
          <v-card-title :class="`flex flex-row-reverse ` + theme.color + ` lighten-1`">
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  v-show="page.actions.add"
                  class="animate__animated animate__shakeY animate__delay-1s"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="openForm"
                  >add_circle</v-icon>
                </v-btn>
              </template>
              <span>Tambah Data</span>
            </v-tooltip>
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="fetchRecords"
                  >refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh Data</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              solo
              dense
              :color="theme.color"
              style="max-width: 350px"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-show="device.desktop"
            :headers="headers"
            :items="records"
            :items-per-page="table.options.itemsPerPage"
            :page.sync="table.options.page"
            class="elevation-2 mb-1"
            :color="theme.color"
            :loading="loading.table"
            loading-text="Loading... Please wait"
            :search="search"
            hide-default-footer
            @page-count="table.options.pageCount = $event"
            show-select
          >
            <v-progress-linear
              slot="progress"
              :color="theme.color"
              height="1"
              indeterminate
            ></v-progress-linear>
            <template v-slot:item.progress="{ value }">
              <v-progress-linear
                :color="theme.color"
                v-model="value"
                height="25"
              >
                <strong>{{ value }}%</strong>
              </v-progress-linear>
            </template>
            <template v-slot:item.name="{ value }">
              <v-badge
                color="orange"
                :content="value.counter"
              ><span>{{ value.text }}</span> </v-badge>
            </template>

            <template v-slot:item.status="{ value }">
              <v-chip
                :color="value.color"
                small
                class="white--text"
              >{{ value.text }}</v-chip>
            </template>
            <template v-slot:item.aksi="{ value }">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    :color="theme.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-dots-vertical-circle-outline
                  </v-icon>
                </template>

                <v-list>
                  <v-list-item
                    @click="openDatasetDetail(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="grey">mdi-database</v-icon>Atur Dataset
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    @click="editRecord(value.id)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>Ubah
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value.id)"
                    v-show="page.actions.delete"
                  >
                    <v-list-item-title>
                      <v-icon color="red">mdi-delete-circle</v-icon>Hapus
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
          <v-list
            subheader
            v-show="device.mobile"
          >

            <v-list-item-group
              multiple
              active-class=""
            >
              <v-list-item
                v-for="item in filterItems"
                :key="item.id"
                style="border: ;1px solid"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.description }} </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu
                      bottom
                      origin="center center"
                      transition="scale-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :color="theme.color"
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-dots-vertical-circle-outline
                        </v-icon>
                      </template>

                      <v-list>
                        <v-list-item @click="openDatasetDetail(item.id)">
                          <v-list-item-title>
                            <v-icon color="grey">mdi-database</v-icon>Atur Dataset
                          </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-divider v-if="page.delete || page.edit"></v-divider>
                        <v-list-item
                          @click="editRecord(item.id)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            Ubah Data
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="postDeleteRecord(item.uuid)"
                          v-show="page.actions.delete"
                        >
                          <v-list-item-title>
                            <v-icon color="red">mdi-delete-circle</v-icon>
                            Hapus Data
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
        :fullscreen="device.mobile"
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon
              small
              color="orange"
              class="mr-1 animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon> Formulir Manajemen Dataset
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col cols="12">
              <v-tabs
                background-color="grey lighten-2"
                v-model="tab"
              >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">Data</v-tab>
                <v-tab href="#tab-2">Metadata</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item value="tab-1">
                  <v-col
                    cols="12"
                    class="mt-5"
                  >
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Kodefikasi Lumbung Data"
                      placeholder="11.Xx"
                      v-model="record.kodefikasi"
                      :filled="record.kodefikasi"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Kodefikasi E-Wali Data"
                      placeholder="11.Xx"
                      v-model="record.kodefikasi2"
                      :filled="record.kodefikasi2"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Kodefikasi Statistik"
                      placeholder="11.Xx"
                      v-model="record.kodefikasi3"
                      :filled="record.kodefikasi3"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Title/Judul/Nama"
                      placeholder=""
                      v-model="record.title"
                      :filled="record.title"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <template>
                      <tinymce
                        id="d1"
                        v-model="record.description"
                      ></tinymce>
                    </template>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="Group Data"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.group_data_uuid"
                      :items="groupdatas"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="Topik"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.topic_uuid"
                      :items="topics"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="OPD/Instansi"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.organization_uuid"
                      :items="opds"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="Metode Pengambilan Data"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.method"
                      :items="methods"
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    v-show="record.method=='api'"
                  >
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="API URL"
                      placeholder=""
                      v-model="record.api_path"
                      :filled="record.api_path"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    v-show="record.method=='api'"
                  >
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="API Param"
                      placeholder=""
                      v-model="record.api_param"
                      :filled="record.api_param"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col col="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Tag | Kata kunci pencarian"
                      placeholder="Kata kunci pencarian gunakan , untuk perkata kunci"
                      v-model="record.tag"
                      :filled="record.tag"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols=12>
                    <h5>MAP PROPERTY</h5>
                  </v-col>
                  <v-col cols=12>
                    <v-select
                      label="Tipe Map/Peta"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.map_type"
                      :items="mapTypes"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Map Url"
                      placeholder=""
                      v-model="record.map_url"
                      :filled="record.map_url"
                      dense
                      rows="3"
                      v-show="record.map_type=='3'"
                    ></v-textarea>
                  </v-col>
                </v-tab-item>
                <v-tab-item value="tab-2">
                  <v-col
                    cols=12
                    class="mt-5"
                  >
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Pengukuran Dataset"
                      placeholder=""
                      v-model="record.pengukuran"
                      :filled="record.pengukuran"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Tingkat Penyajian Dataset"
                      placeholder=""
                      v-model="record.tingkat"
                      :filled="record.tingkat"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Cakupan Dataset"
                      placeholder=""
                      v-model="record.cakupan"
                      :filled="record.cakupan"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Produsen Data"
                      placeholder=""
                      v-model="record.produsen"
                      :filled="record.produsen"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Bidang"
                      placeholder=""
                      v-model="record.bidang"
                      :filled="record.bidang"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Penanggujawab"
                      placeholder=""
                      v-model="record.penanggungjawab"
                      :filled="record.penanggungjawab"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Kontak Produsen (Telp/Wa)"
                      placeholder=""
                      v-model="record.kontakprodusen"
                      :filled="record.kontakprodusen"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Kode Indikator"
                      placeholder=""
                      v-model="record.kodeindikator"
                      :filled="record.kodeindikator"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Bidang Urusan"
                      placeholder=""
                      v-model="record.bidangurusan"
                      :filled="record.bidangurusan"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Satuan Dataset"
                      placeholder=""
                      v-model="record.satuandataset"
                      :filled="record.satuandataset"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Frekuensi Dataset"
                      placeholder=""
                      v-model="record.frequensi"
                      :filled="record.frequensi"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Catatan"
                      placeholder=""
                      v-model="record.catatan"
                      :filled="record.catatan"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      :color="theme.color"
                      hide-details
                      label="Dimensi Dataset"
                      placeholder=""
                      v-model="record.dimensi"
                      :filled="record.dimensi"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-tab-item>
              </v-tabs-items>
            </v-col>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show="!form.edit"
              @click="postAddNewRecord"
            >Tambah</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="form.edit"
              @click="postUpdateRecord"
            >Ubah</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeForm"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
            
<script>
import { mapActions, mapState } from "vuex";
import "animate.css";

export default {
  name: "datasetdtail",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "KODE",
        align: "start",
        sortable: false,
        value: "kodefikasi",
        width: 100,
      },
      {
        text: "TITLE",
        align: "start",
        sortable: false,
        value: "title",
      },
      {
        text: "STATUS",
        align: "center",
        sortable: false,
        value: "status",
        width: 100,
      },
      {
        text: "AKSI",
        value: "aksi",
        width: 100,
        sortable: false,
        align: "center",
      },
    ],
    search: null,
    filename: null,
    groupdatas: [],
    topics: [],
    opds: [],
    methods: [
      { text: "API Service", value: "api" },
      { text: "Manual", value: "manual" },
    ],
    mapTypes: [
      { text: "Leafleft (Provinsi)", value: "1" },
      { text: "Leafleft (Kab/Kota)", value: "2" },
      { text: "Custome (Banten Satu Peta/ArchGIS)", value: "3" },
    ],
    tab: null,
  }),
  computed: {
    ...mapState([
      "page",
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "snackbar",
      "table",
      "form",
    ]),
    filterItems() {
      if (this.search != null) {
        return this.records.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      } else {
        return this.records;
      }
    },
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/v2/manajement/dataset",
      pagination: false,
      key: "id",
      title: "MANAJEMEN DATASET",
      subtitle: "Berikut Daftar Seluruh Dataset Yang Tersedia",
      breadcrumbs: [
        {
          text: "Manajemen",
          disabled: true,
          href: "",
        },
        {
          text: "Dataset",
          disabled: true,
          href: "",
        },
      ],
      showtable: true,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        bulkdelete: false,
        print: false,
        export: false,
        help: false,
      },
    });
    this.fetchGroupDatas();
    this.fetchTopics();
    this.fetchOpds();
    this.fetchRecords();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
      "assignFileBrowse",
      "setLoading",
      "setRecord",
      "setForm",
    ]),
    openForm: function () {
      this.setForm({
        add: true,
        edit: false,
      });
      this.setRecord({});
      this.record.api_path =
        "https://apimanager.dev.bantenprov.go.id/api/dataset/";
      this.filename = null;
    },
    closeForm: function () {
      this.setForm({
        add: false,
        edit: false,
      });
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.closeForm();
        this.fetchRecords();
      });
    },
    editRecord: function (val) {
      this.postEdit(val).then(() => {
        this.filename = this.record.filename;
      });
      this.setForm({
        add: true,
        edit: true,
      });
    },
    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.closeForm();
      });
    },
    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },
    postDownload(val) {
      window.open(val, "__blank");
    },
    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".xls", ".xlsx"],
        query: {
          doctype: "datasets",
        },
        callback: (response) => {
          setTimeout(() => {
            this.filename = response.name;
            this.record.filename = response.name;
          }, 500);
        },
      });
    },
    fetchGroupDatas: async function () {
      try {
        let { data } = await this.http.post("api/v2/combo/groupdata");
        this.groupdatas = data;
      } catch (error) {}
    },
    fetchTopics: async function () {
      try {
        let { data } = await this.http.post("api/v2/combo/topic");
        this.topics = data;
      } catch (error) {}
    },
    fetchOpds: async function () {
      try {
        let { data } = await this.http.post("api/v2/combo/organization");
        this.opds = data;
      } catch (error) {}
    },
    openDatasetDetail: function (val) {
      this.$router.push({
        name: "manajemen-dataset-detail",
        params: {
          dataset_uuid: val.id,
          method: val.method,
        },
      });
    },
  },
};
</script>