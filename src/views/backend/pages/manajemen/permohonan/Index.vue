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
            <template v-slot:item.status="{ value }">
              <v-chip
                :color="value.color"
                small
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
                  <v-list-item @click="postOnProgress(value)">
                    <v-list-item-title>
                      <v-icon
                        class=""
                        color="orange"
                      >mdi-typewriter</v-icon>Set Dalam Proses
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="postFinish(value)">
                    <v-list-item-title>
                      <v-icon color="green">mdi-book-check</v-icon>Set Selesai
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
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
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
                        <v-list-item @click="editRecord(item.id)">
                          <v-list-item-title>
                            <v-icon color="orange">mdi-typewriter</v-icon>
                            Set Dalam Proses
                          </v-list-item-title>
                        </v-list-item>

                        <v-divider v-if="page.delete || page.edit"></v-divider>

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
            >mdi-circle</v-icon> Formulir Manajemen Infografik
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                hide-details
                label="Judul"
                placeholder="Kemiskinan"
                v-model="record.name"
                :filled="record.name"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Keterangan"
                outlined
                dense
                hide-details
                v-model="record.description"
                :color="theme.color"
                :filled="record.description"
                rows="3"
              >{{ record.descriptions }}</v-textarea>
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

            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                hide-details
                label="Tag | Kata kunci pencarian"
                placeholder="Kemiskinan"
                v-model="record.tag"
                :filled="record.tag"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Dokumen  (Max: 2 MB)"
                append-outer-icon="attachment"
                v-model="filename"
                :filled="filename"
                :color="theme.color"
                outlined
                placeholder=".docx, .xlsx, .pdf"
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
            
<script lang="">
import { mapActions, mapState } from "vuex";
import "animate.css";

export default {
  name: "permohonan",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "NAME",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "PERMOHONAN",
        align: "left",
        sortable: false,
        value: "permohonan",
      },
      {
        text: "TANGGAL",
        align: "center",
        sortable: false,
        value: "tanggal",
        width: 200,
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
        value: "id",
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
      dataUrl: "api/v2/manajement/permohonans",
      pagination: false,
      key: "id",
      title: "MANAJEMEN PERMOHONAN DATASET",
      subtitle: "Berikut Daftar Seluruh Permohonan Dataset Yang Tersedia",
      breadcrumbs: [
        {
          text: "Manajemen",
          disabled: true,
          href: "",
        },
        {
          text: "Permohonan Dataset",
          disabled: true,
          href: "",
        },
      ],
      showtable: true,
      actions: {
        refresh: true,
        add: false,
        edit: false,
        delete: true,
        bulkdelete: false,
        print: false,
        export: false,
        help: false,
      },
    });
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
        fileType: [
          ".png",
          ".jpg",
          ".jpeg",
          ".pdf",
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
        ],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.filename = response.name;
            this.record.filename = response.name;
          }, 500);
        },
      });
    },
    postOnProgress: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses Update Status" });
        let {
          data: { code, success, message, errors },
        } = await this.http.post("api/v2/manajement/permohonans-set-status", {
          id: val,
          status: 2,
        });
        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan";
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
    postFinish: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses Update Status" });
        let {
          data: { code, success, message, errors },
        } = await this.http.post("api/v2/manajement/permohonans-set-status", {
          id: val,
          status: 3,
        });
        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan";
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
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
  },
};
</script>