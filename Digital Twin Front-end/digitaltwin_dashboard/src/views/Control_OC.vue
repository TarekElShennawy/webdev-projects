<template>
  <div>
    <ModelNavbar/>
    <h2>Classification</h2>
    <hr>
    <h6>Operating State</h6>
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
          :items="opCond"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          medium
        ></b-table>
        </b-col>

      <b-col>
        <div>
        <h2>Operating Condition Chart</h2>
        <pie-chart
        v-if="loaded"
        xtitle="ID"
        ytitle="Operating Condition"
        :download="true"  
        :data="arrOpCond"
        ></pie-chart>
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

export default {
  name: 'charts',
  components: {
    ModelNavbar
  },
  data() {
    return {
      loaded: false,
      resData: {},
      arrOpCond: {},
      newVoltage: '',
      opCond: [],
      opcondM: 0,
      opcondMG: 0,
      opcondLR: 0,
      opcondNL: 0,
      opcondBRB: 0,
      perPage: 5,
      currentPage: 1,
      fields: [  {key: 'id', label: 'ID'},
       {key: 'opcond', label: 'Operating Condition'}]
    }
  },
  async created()
    {
      this.fetchData()
    },
  methods: {
      addVoltage() {
        axios.post('http://localhost:8002/outputservice/spd-input/addSPD',  {
          spdInput: this.newVoltage
        })
        .then((response) => {console.log(response);});
    },
  async fetchData(){
      await Vue.axios.get('http://localhost:8002/outputservice/opcond/findAll')
            .then((response) =>{
                this.opCond = response.data.data.items;

                this.resData = response.data.data.items;
                this.resData.forEach(d => {
  
                if (d.opcond == "NL") {
                this.opcondNL++;
                } else if (d.opcond == "MG") {
                this.opcondMG++;
                } else if (d.opcond == "M") {``
                this.opcondM++;
                } else if (d.opcond == "BRB") {
                this.opcondBRB++;
                } else {
                this.opcondLR++;
                }

              this.arrOpCond["NL"] = this.opcondNL;
              this.arrOpCond["MG"] = this.opcondMG;
              this.arrOpCond["LR"] = this.opcondLR;
              this.arrOpCond["M"] = this.opcondM;
              this.arrOpCond["BRB"] = this.opcondBRB;
                  this.loaded = true
            });})
    }
  },
  computed: {
    rows() {
      return this.opCond.length
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

hr{
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(173, 216, 230, 0), rgba(173, 216, 230, 0.75), rgba(173, 216, 230, 0));
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

</style>

