<template>
<div id="app">
  <Highlights v-bind:items="items"></Highlights>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
          <h2>Operating Condition Ratio</h2>
          <pie-chart
          v-if="loaded"
          xtitle="ID"
          ytitle="Operating Condition"
          :download="true"  
          :data="arrOpCond"
          ></pie-chart>
      </b-col>

      <b-col>
      <div class="list-group">
        <br><br>
        <a class="list-group-item list-group-item-info">NL : No Load</a>
        <a class="list-group-item list-group-item-action list-group-item-danger">MG : Motor Generation</a>
        <a class="list-group-item list-group-item-action list-group-item-warning">LR : Locked Rotor</a>
        <a class="list-group-item list-group-item-action list-group-item-success">M : Motoring</a>
        <a class="list-group-item list-group-item-action list-group-item-primary">BRB : Broken Rotor Bar</a>
      </div>
      </b-col>
    </b-row>

    <b-row>    
      <b-col>
      <h2>Torque against ID</h2>  
      <line-chart
        v-if="loaded"
        xtitle="ID"
        ytitle="Torque (Nm)"
        :download="true"  
        :data="arrTI"
        ></line-chart>

      </b-col>

        <b-col>
        <h2>Measured Speed against ID</h2>  
          <line-chart
        v-if="loaded"
        xtitle="ID"
        ytitle="Measured Speed (RPM)"
        :download="true"  
        :data="arrTS"
        ></line-chart>

        </b-col>
    </b-row>

    <b-row>
      <b-col>
      <h2>Voltage against ID</h2>  
      <line-chart
        v-if="loaded"
        xtitle="ID"
        ytitle="Voltage (V)"
        :download="true"  
        :data="arrVT"
        ></line-chart>
    </b-col>
    
        <b-col>
        <h2>Current against ID</h2> 
          <line-chart
        v-if="loaded"
        xtitle="ID"
        ytitle="Current (A)"
        :download="true"  
        :data="arrIT"
        ></line-chart>
        </b-col>
      </b-row>
  </b-container>
</div>
</template>

<script>
import Highlights from '../components/Highlights.vue'

export default {
  name: 'charts',
  props: ["items"],
  components: {
    'Highlights': Highlights
  },
  data() {
    return {
      loaded: false,
      arrIT: {},
      arrVT: {},
      arrTS: {},
      arrTI: {},
      arrOpCond: {},
      opcondNL: 0,
      opcondMG: 0,
      opcondLR: 0,
      opcondM: 0,
      opcondBRB: 0,
      timer: ''
    }
  },
  created(){
    this.loaded = false;
    this.items.forEach(d => {
      const id = d.dataID;
      const imirmsA = d.imirmsA;
      const imvrmsV = d.imvrmsV;
      const tsense = d.tsenseTqNm;
      const speedMes = d.spdMesRpm;

        if (d.opCond == "NL") {
        this.opcondNL++;
        } else if (d.opCond == "MG") {
        this.opcondMG++;
        } else if (d.opCond == "M") {
        this.opcondM++;
        } else if (d.opCond == "BRB") {
        this.opcondBRB++;
        } else {
        this.opcondLR++;
        }

      this.arrOpCond["NL"] = this.opcondNL;
      this.arrOpCond["MG"] = this.opcondMG;
      this.arrOpCond["LR"] = this.opcondLR;
      this.arrOpCond["M"] = this.opcondM;
      this.arrOpCond["BRB"] = this.opcondBRB;

      this.arrIT[id] = imvrmsV;
      this.arrVT[id] = imirmsA;
      this.arrTS[id] = speedMes;
      this.arrTI[id] = tsense;
    })
    this.loaded = true;
  }
}
</script>

<style scoped>
  #motorInfo {
    background-color: turquoise;
    border-radius: 10px;
    margin-right: 50px;
  }

  #motorTable td{
    padding: 0p;
    margin: 0px;
    color: white;
  }

  .bv{
    color: white;
  }

  #table-top {
    margin-bottom: 50px;
  }

  #table-bottom {
    margin-bottom: 50px;
  }
  
  hr {
    background-color: white;
    width: 18em;
  }
  
  h2{
    color:  #039be5;
  }
</style>
