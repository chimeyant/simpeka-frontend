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
                  class=""
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="$router.push({name:'manajemen-dataset-detail' })"
                  >mdi-close-circle</v-icon>
                </v-btn>
              </template>
              <span>Kembali</span>
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
            <template v-slot:item.id="{ value }">
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
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="grey">mdi-file-table</v-icon>Atur Tabel
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="grey">mdi-map</v-icon>Atur Map
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="grey">mdi-file-table</v-icon>Lihat Baris Data
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>Ubah
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
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
                    <v-list-item-title>{{ item.regency_code}}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.regency_name }} </v-list-item-subtitle>
                    <v-list-item-subtitle>{{ item.tahun }} </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-chip
                        small
                        :color="item.status.color"
                      >{{ item.status.text }}</v-chip>
                    </v-list-item-subtitle>
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
                        <v-list-item @click="editRecord(item.id)">
                          <v-list-item-title>
                            <v-icon color="grey">mdi-file-table</v-icon>Atur Tabel
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
            >mdi-circle</v-icon> Formulir Manajemen Detail Dataset
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col cols="12">
              <v-select
                label="Kabupaten/Kota"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.regency_uuid"
                :items="kabs"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Tahun"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.tahun"
                :items="tahuns"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-select
                label="Jenis Data"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.type"
                :items="jeniss"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <span class="subtitle-1 font-weight-bold">Sumber Lumbung Data</span>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="API KEY ID"
                placeholder="Silahkan masukan apikey lumbung data"
                outlined
                dense
                hide-details
                v-model="record.api_key"
              ></v-text-field>
            </v-col>
            <v-col cols=12>
              <span class="subtitle-1 font-weight-bold">Sumber Lain</span>
            </v-col>
            <v-col cols="12">

              <v-text-field
                label="Data Excel"
                append-outer-icon="attachment"
                v-model="filename"
                :filled="filename"
                :color="theme.color"
                outlined
                placeholder=".xlsx"
                dense
                @click:append-outer="uploadFile"
                hide-details
              ></v-text-field>
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
  name: "dokumen",
  data: () => ({
    num: 1,
    headers: [],
    search: null,
    filename: null,
    groupdatas: [],
    topics: [],
    opds: [],
    kabs: [],
    tahuns: [
      { text: 2023, value: 2023 },
      { text: 2022, value: 2022 },
      { text: 2021, value: 2021 },
    ],
    jeniss: [
      { text: "Dataset", value: "dataset" },
      { text: "Map", value: "map" },
    ],
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
      dataUrl:
        "api/v2/manajement/dataset-details-row/" +
        this.$route.params.dataset_detail_uuid,
      pagination: false,
      key: "id",
      title: "MANAJEMEN DATASET ROW DATA",
      subtitle: "Berikut Daftar Seluruh Row DAta Yang Tersedia",
      breadcrumbs: [
        {
          text: "Manajemen",
          disabled: true,
          href: "",
        },
        {
          text: "Dataset Row Data",
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

    this.initHeaders().then(() => {
      this.fetchRecords();
    });
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
    initHeaders: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/manajement/dataset-details-row-header/" +
            this.$route.params.dataset_detail_uuid
        );
        this.headers = data;
      } catch (error) {}
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
    fetchKabs: async function () {
      try {
        let { data } = await this.http.post("api/v2/combo/regency");
        this.kabs = data;
      } catch (error) {}
    },
  },
};
</script>