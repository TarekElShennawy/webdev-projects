<template>
<div>
<ModelNavbar/>
<h2>Regression</h2>
<hr>
<h6>Rotary Speed</h6>
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
          :items="spdMes"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          medium
        ></b-table>
        </b-col>
      
        <b-col>
        <div>
        <h2>Speed Chart</h2>
        <line-chart
        v-if="loaded"
        xtitle="ID"
        ytitle="Measured Speed"
        :download="true"  
        :data="arrSpdMeasRes"
        ></line-chart>
        </div></b-col>
      </b-row>

      <b-row>
      <b-col>
      <div class="container center_div">
        <form @submit="postData" method="post">
          <input type="text" name="imirmsA" class="form-control" v-model="spdInput.imirmsA" placeholder="RMS Current"> <br>
          <input type="text" name="imvrmsV" class="form-control" v-model="spdInput.imvrmsV" placeholder="RMS Voltage"> <br>
          <input type="text" name="spdRefHz" class="form-control" v-model="spdInput.spdRefHz" placeholder="Reference Speed"> <br>
          <input type="text" name="tsenseTqNm" class="form-control" v-model="spdInput.tsenseTqNm" placeholder="Torque"> <br>
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
      loaded: false,
      spdInput: {
        imirmsA:null,
        imvrmsV:null,
        spdRefHz:null,
        tsenseTqNm:null
      },
      resData: {},
      arrSpdMeasRes: {},
      spdMes: [],
      perPage: 5,
      currentPage: 1,
      fields: [  {key: 'id', label: 'ID'},
       {key: 'spdMesRpm', label: 'Rotary Speed (Rpm)'}]
    }
  },
  methods: {
      postData(e) {
        axios.post("http://localhost:8002/outputservice/spd-input/addSPD", this.spdInput)
        .then((response) =>{
        console.warn(response)
        })
        e.preventDefault();
    },
      stop() {
        clearInterval(this.interval);
      },
  async fetchData() {
      this.loaded = false
      await Vue.axios.get('http://localhost:8002/outputservice/spd-output/findAll')
            .then((response) =>{
                this.spdMes = response.data.data.items;

                this.resData = response.data.data.items;
                this.resData.forEach(d => {
                  const id = d.id;
                  const spdMeasRes = d.spdMesRpm;

                  this.arrSpdMeasRes[id] = spdMeasRes;
                  this.loaded = true
            })
            console.log(this.arrSpdMeasRes);
            })
    }
  },
  computed: {
      rows() {
        return this.spdMes.length
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
h2{
  color:  #039be5;
}
h6{
    color:  #039be5;
}
hr{
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(173, 216, 230, 0), rgba(173, 216, 230, 0.75), rgba(173, 216, 230, 0));
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

