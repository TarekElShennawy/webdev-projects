<template>
<div id="content">
  <Highlights v-bind:items="items"></Highlights>
<!-- Table showcasing all data obtained -->
  <div class="overflow-auto">
      <b-table
        sticky-header
        id="my-table"
        :items="items "
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        striped
        show-empty
        smallS
        no-border-collapse
        @filtered="onFiltered"
      >
<!--      <template #cell(actions)="row">
        <b-button size="sm" @click="$emit('del-data', row.item.id)" class="mr-1">
          Delete
        </b-button>
       </template>
-->
      </b-table>

      <!-- User Interface controls -->
      <b-row>
        <b-col lg="4" class="my-1">
          <b-form-group
            label="Sort"
            label-for="sort-by-select"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sort-by-select"
                v-model="sortBy"
                :options="sortOptions"
                :aria-describedby="ariaDescribedby"
                class="w-75"
              >
                <template #first>
                  <option value="">-- none --</option>
                </template>
              </b-form-select>

              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                :aria-describedby="ariaDescribedby"
                size="sm"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col lg="4" class="my-1">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          
        </b-col>
      </b-row>
      <b-row>

        <b-col>
                  <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            size="md"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
  </div>
</div>
</template>

<script>
import Highlights from '../components/Highlights.vue'

export default {
  name: 'content',
  props: ["items"],
  components: {
    'Highlights': Highlights
  },
  data () {
    return {
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show all" }],
        sortBy: 'id',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        busy: false,
        timeout: null,
        filterOn: [],
        fields: [ {key: 'dataID', label: 'ID', sortable: true, sortDirection: 'asc'},
         {key: 'spdRefHz', label: 'Reference Speed (Hz)'},
         {key: 'spdMesRpm', label: 'Measured Speed (Rpm)'},
         {key: 'imirmsA', label: 'RMS Current (A)'},
         {key: 'imvrmsV', label: 'RMS Voltage (V)'},
//         {key: 'opcond', label: 'Condition'},
         {key: 'tsenseTqNm', label: 'Torque (N/m)'}]
//          { key: 'actions', label: 'Actions'}]
         
      }
  },
  computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
     rows() {
        return this.items.length
      }
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

