<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="4"> <b-link href="#/">หน้าแรก</b-link> </b-col>
      </b-row>
      <b-row class="justify-content-center m-4">
        <b-img fluid :src="require('../../static/logo.png')" :width="200">
        </b-img>
      </b-row>
      <b-row class="justify-content-center m-4">
        <b-col cols="12">
          <h2 class="text-center">
            ข้อมูลนักศึกษาปัจจุบัน
          </h2>
        </b-col>
      </b-row>
      <b-row class="justify-content-center m-4">
        <b-col cols="12">
          <b-card title="ค้นหา">
            <b-form @submit="getStu">
              <b-row class="justify-content-center m-4">
                <b-col cols="5">
                  <b-form-group label="ชื่อ-นามสกุล:">
                    <b-form-input
                      v-model="form.name"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="5">
                  <b-form-group label="ชั้นปี:">
                    <b-form-input
                      id="input-1"
                      v-model="form.position"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-form-group label="ค้นหา">
                    <b-button type="submit" variant="primary" block>
                      <b-icon icon="search"></b-icon>
                    </b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="justify-content-center m-4">
        <b-col cols>
          <b-card bg-variant="success" text-variant="white">
            <b-card-body class="p-0">
              <h6 class="text-center">ภายในวิทยาลัย (Check In)</h6>
              <h2 class="text-center mb-0">
                {{ iclockDetails.stuIn }}
              </h2></b-card-body
            >
          </b-card>
        </b-col>
        <b-col cols>
          <b-card bg-variant="danger" text-variant="white">
            <b-card-body class="p-0">
              <h6 class="text-center">นอกวิทยาลัย (Check Out)</h6>
              <h2 class="text-center mb-0">
                {{ iclockDetails.stuOut }}
              </h2></b-card-body
            >
          </b-card>
        </b-col>
        <b-col cols>
          <b-card bg-variant="info" text-variant="white">
            <b-card-body class="p-0">
              <h6 class="text-center">นักศึกษาทั้งหมด</h6>
              <h2 class="text-center mb-0">
                {{ iclockDetails.totalStu }}
              </h2></b-card-body
            >
          </b-card>
        </b-col>
      </b-row>
      <b-row class="justify-content-center m-4">
        <b-col cols>
          <b-card>
            <b-table
              striped
              hover
              :items="items"
              :fields="fields"
              :busy="isBusy"
            >
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  props: {},
  data() {
    return {
      isBusy: true,
      API_URL: process.env.API_URL,
      LOCAL_API: process.env.LOCAL_API,
      items: [],
      fields: [
        {
          key: "emp_code",
          label: "รหัสนักศึกษา"
        },
        {
          key: "first_name",
          label: "ชื่อ"
        },
        {
          key: "last_name",
          label: "นามสกุล"
        },
        {
          key: "position_name",
          label: "ชั้นปี"
        }
      ],
      iclockDetails: {
        stuIn: 0,
        stuOut: 0,
        totalStu: 0
      },
      form: {
        name: "",
        position: ""
      }
    };
  },
  async created() {
    await this.getStu();
    setInterval(async () => {
      await this.iclock_transaction();
    }, 2000);
  },
  methods: {
    async iclock_transaction() {
      try {
        const res = await axios.get(`${this.LOCAL_API}/iclock_transaction`);
        this.iclockDetails = res.data;
      } catch (err) {
        console.log("iclock_transaction", err);
      }
    },
    async getStu(e = null) {
      if (e) {
        e.preventDefault();
      }
      const params = {
        first_name: "",
        last_name: "",
        position_name: this.form.position
      };

      // ใช้ regex ในการตรวจสอบว่ามี space หรือไม่
      if (/\s/.test(this.form.name)) {
        // หากมี space ให้แยกเป็นชื่อและนามสกุล
        const [firstPart, ...rest] = this.form.name.split(" ");
        params.first_name = firstPart;
        params.last_name = rest.join(" ");
      } else {
        // หากไม่มี space ให้กำหนดทั้งหมดเป็น first_name
        params.first_name = this.form.name;
      }
      this.isBusy = true;
      try {
        const res = await axios.get(`${this.LOCAL_API}/students`, { params });
        this.items = res.data;
      } catch (err) {
        console.log("getStu", err);
      } finally {
        this.isBusy = false;
      }
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
