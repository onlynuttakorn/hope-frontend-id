<template>
  <div>
    <b-container fluid>
      <b-row class="justify-content-center m-4">
        <b-img fluid :src="require('../../static/logo.png')" :width="200">
        </b-img>
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="4">
          <b-row class="justify-content-center m-4">
            <b-col cols="12" align-self="center">
              <b-card class="text-center">
                <b-card-body class="p-0">
                  <h1>{{ this.thaiTime }}</h1>
                  <b-card-text>{{ this.thaiDate }}</b-card-text>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-card bg-variant="success" text-variant="white">
                <b-card-body class="p-0">
                  <h6 class="text-center">ภายในวิทยาลัย (Check In)</h6>
                  <h2 class="text-center mb-0">250</h2></b-card-body
                >
              </b-card>
            </b-col>
            <b-col cols="6" class="mb-3">
              <b-card bg-variant="danger" text-variant="white">
                <b-card-body class="p-0">
                  <h6 class="text-center">นอกวิทยาลัย (Check Out)</h6>
                  <h2 class="text-center mb-0">250</h2></b-card-body
                >
              </b-card>
            </b-col>
            <b-col cols="12">
              <b-card bg-variant="info" text-variant="white">
                <b-card-body class="p-0">
                  <h6 class="text-center">นักศึกษาทั้งหมด</h6>
                  <h2 class="text-center mb-0">250</h2></b-card-body
                >
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6">
          <b-row class="justify-content-center m-4">
            <b-col cols="12">
              <h2 class="text-center">
                การบันทึกข้อมูลการเข้า-ออก ของนักศึกษาล่าสุด
              </h2>
            </b-col>
          </b-row>
          <b-row class="justify-content-center m-4">
            <div class="mx-4">
              <b-img
                thumbnail
                fluid
                :src="
                  student && student.length > 7
                    ? `http://192.168.1.46:8085${student[8]}`
                    : 'https://picsum.photos/250/250/?image=54'
                "
                alt="Image 1"
                :width="200"
                class="h-100"
              >
              </b-img>
            </div>
            <div class="student-details">
              <b-card>
                <b-card-body>
                  <b-card-title
                    >สถานะ:
                    {{
                      this.student && this.student.length > 3
                        ? this.student[4]
                        : ""
                    }}</b-card-title
                  >
                  <b-card-text
                    >วันเวลา:
                    {{
                      this.student && this.student.length > 2
                        ? this.student[3]
                        : ""
                    }}</b-card-text
                  >
                  <hr />
                  <b-card-text
                    >ชื่อ:
                    {{
                      this.student && this.student.length > 1
                        ? this.student[2]
                        : ""
                    }}</b-card-text
                  >
                  <b-card-text
                    >รหัสนักศึกษา:
                    {{
                      this.student && this.student.length > 0
                        ? this.student[1]
                        : ""
                    }}</b-card-text
                  >
                  <b-card-text
                    >ชั้นปี:
                    {{
                      this.student && this.student.length > 0
                        ? this.student[1]
                        : ""
                    }}</b-card-text
                  >
                  <b-card-text
                    >รุ่นที่:
                    {{
                      this.student && this.student.length > 0
                        ? this.student[1]
                        : ""
                    }}</b-card-text
                  >
                </b-card-body>
              </b-card>
            </div>
          </b-row>
        </b-col>
      </b-row>

      <hr />
      <b-row class="justify-content-center m-4">
        <h2>ข้อมูลนักศึกษาก่อนหน้า</h2>
      </b-row>
      <b-row class="justify-content-center m-4">
        <b-card-group deck>
          <b-card
            v-for="(stu, i) in studentList"
            :key="i"
            :img-src="
              stu[8]
                ? `http://192.168.1.46:8085${student[8]}`
                : 'https://picsum.photos/250/250/?image=54'
            "
            img-top
            class="custom-image"
          >
            <b-card-text>รหัสนศ: {{ stu[1] }}</b-card-text>
            <b-card-text>ชื่อ นามสกุล: {{ stu[2] }}</b-card-text>
            <template #footer>
              <small class="text-muted">{{ stu[3] }}</small>
            </template>
          </b-card>
        </b-card-group>
      </b-row>
    </b-container>
    <footer>
      <div>
        <h6 class="text-center">
          Copyright © 2023 Cosma Solution CO. LTD
        </h6>
      </div>
    </footer>
  </div>
</template>
<script>
import moment from "moment-timezone";
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      API_URL: "//192.168.1.44:8085",
      LOCAL_API: "//localhost:3000",
      JWT_TOKEN: null,
      connection: null,
      datetimeNow: null,
      timezone: "Asia/Bangkok",
      thaiTime: "",
      thaiDate: "",
      student: null,
      studentList: []
    };
  },
  async created() {
    this.connectToWebSocket();
    await this.getListUser();
  },
  mounted() {
    this.datetimeNow = moment().tz(this.timezone);
    setInterval(this.updateThaiTime, 1000);
    this.thaiDate = this.datetimeNow.format("DD/MM/YYYY");
  },
  methods: {
    async getListUser() {
      try {
        const res = await axios.get(
          `${this.LOCAL_API}/personnel/api/employees/`
        );
        console.log("res", res);
      } catch (err) {
        console.log("getListUser", err);
      }
    },
    updateThaiTime() {
      const now = moment().tz(this.timezone);
      this.thaiTime = now.format("HH:mm:ss");
    },
    connectToWebSocket() {
      console.log("Starting connection to WebSocket Server");
      const _SELF = this;
      const wsUrl = "ws://localhost:3001";
      this.connection = new WebSocket(wsUrl);

      this.connection.onmessage = function(event) {
        let data = JSON.parse(event.data);
        console.log("event", data);
        if (data.length > 0) {
          _SELF.student = data[0];
          data.shift();
          console.log("student", _SELF.student);
        }
        _SELF.studentList = data;
      };
      setInterval(() => {
        if (this.connection.readyState !== WebSocket.OPEN) {
          console.log("WebSocket connection is not open. Reconnecting...");
          this.connectToWebSocket();
        } else {
          this.connection.send("ping");
        }
      }, 10000);
      this.connection.onopen = function(event) {
        console.log("Successfully connected to the echo websocket server...");
      };
      this.connection.onerror = function(event) {
        console.error("WebSocket error:", event);
        setTimeout(() => {
          _SELF.connectToWebSocket();
        }, 10000);
      };
    }
  }
};
</script>
<style>
.box-time {
  width: 30%;
}
.card.custom-image img {
  width: 100%;
  height: 100px;
}
.student-details {
  width: 500px;
}
hr {
  border: 1px solid #000000;
}
</style>
