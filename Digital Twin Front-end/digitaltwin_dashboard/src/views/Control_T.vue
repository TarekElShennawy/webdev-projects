<template>
<div>
<ModelNavbar/>
<h2>Regression</h2>
<hr>
<h6>Torque</h6>
<b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            size="md"
            class="my-0"
            aria-controls="my-table"
          ></b-pagination>
        <br>
        <b-table
          id="my-table"
          :items="tqNm"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          medium
        ></b-table>
        </b-col>

        <b-col>
        <div>
        <h2>Torque Chart</h2>
        <line-chart
        v-if="loaded"
        xtitle="ID"
        ytitle="Measured Torque"
        :download="true"  
        :data="arrTqNm"
        ></line-chart>
        </div></b-col>
      </b-row>
      
      <b-row>
      <b-col>
        <div class="container center_div">
          <form @submit="postData" method="post">
            <input type="text" name="imirmsA" class="form-control" v-model="TqInput.imirmsA" placeholder="RMS Current"> <br>
            <input type="text" name="imvrmsV" class="form-control" v-model="TqInput.imvrmsV" placeholder="RMS Voltage"> <br>
            <input type="text" name="spdMesRpm" class="form-control" v-model="TqInput.spdMesRpm" placeholder="Measured Speed"> <br>
            <input type="text" name="spdRefHz" class="form-control" v-model="TqInput.spdRefHz" placeholder="Reference Speed"> <br>
            <b-button type="submit" class="btn-space">Submit</b-button>
            <b-button @click="stop()" >Stop Refreshing</b-button>
          </form>
        <br>
        </div>
      </b-col>
      </b-row>
    </b-container>
</div>
</template>

<script>
import Vue from 'vue';
import ModelNavbar from '@/components/ModelNavbar';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'charts',
  components: {
    ModelNavbar
  },
  data() {
    return {
      currentPage: 1,
      loaded: false,
      resData: {},
      arrTqNm: {},
      TqInput: {
        imirmsA:null,
        imvrmsV:null,
        spdMesRpm:null,
        spdRefHz:null
      },
      tqNm: [],
      perPage: 5,
      fields: [  {key: 'id', label: 'ID'},
       {key: 'tsenseTqNm', label: 'Torque (Nm)'}]
    }
  },
  methods: {
      postData(e) {
        axios.post("http://localhost:8002/outputservice/tq-input/addTq", this.spdInput)
        .then((response) =>{
        console.warn(response)
        })
        e.preventDefault();
    },
      stop() {
        clearInterval(this.interval);
      },
    async fetchData() {
      this.loaded = false;
      await Vue.axios.get('http://localhost:8002/outputservice/tq-output/findAll')
            .then((response) =>{
                this.tqNm = response.data.data.items;

                this.resData = response.data.data.items;
                this.resData.forEach(d => {
                  const id = d.id;
                  const TqRes = d.tsenseTqNm;

                  this.arrTqNm[id] = TqRes;
                  this.loaded = true
            });})
    },
  },
  computed: {
    rows() {
      return this.tqNm.length
    }
  },
  mounted()
  {
    this.interval = setInterval(() => {
      this.fetchData();
    }, 1000 );
  }
}
</script>

<style scoped>
table {
  margin-left: 20px;
  margin-right: 20px;
}
hr{
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(173, 216, 230, 0), rgba(173, 216, 230, 0.75), rgba(173, 216, 230, 0));
}
h2{
  color:  #039be5;
}
h6{
    color:  #039be5;
}
button{
  margin-top: 2.5em;
}
.center_div{
    margin: 0 auto;
    width:80%
}
.voltage-selection {
	width: 300px;
	padding: 5px;
	box-sizing: border-box;
	height: 30px;
}
.btn-space {
  margin-right: 5px;
}
</style>

