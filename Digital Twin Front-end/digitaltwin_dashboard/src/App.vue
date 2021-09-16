<template>
<div class="website">
  <b-container id="app">
        <Navbar/>
        <router-view v-bind:items="this.items.data.items" v-on:del-data="deleteData" />
  </b-container>
</div>

</template>

<script>
import Vue from 'vue';
import axios from 'axios'
import Navbar from '@/components/Navbar';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios)

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
        name: "app",
        items: []
      }
  },
  methods: {
      async deleteData(id) {
        await axios.delete(`http://localhost:8001/modservice/testdata/${id}`)
        .then(res => {
        this.items = this.items.filter(item => item.id !== id
          ,res.data)})
      },
      async fetchData() {
        await Vue.axios.get('http://localhost:8002/outputservice/measured-data/findAll')
              .then((response) =>{
                  this.items = response.data; 
                  console.log(this.items.data.items);
              });
      },
      reloadPage() {
        this.busy = true
        this.setTimeout(() => {
        window.location.reload();
        })
      },
       clearTimeout() {
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }
      },
      onHidden() {
        // Return focus to the button once hidden
        this.$refs.button.focus()
      },
      setTimeout(callback) {
        this.clearTimeout()
        this.timeout = setTimeout(() => {
          this.clearTimeout()
          callback()
        }, 5000)
      },
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
  @import './components/style.css';

  #app {
    padding: 0px;
    border: 1px solid lightblue;
    border-radius: 5px;
    text-align: center;
    background-color: white;
  } 

</style>
