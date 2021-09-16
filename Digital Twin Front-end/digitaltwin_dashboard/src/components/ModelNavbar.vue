<template>
  <div id="nav-template">
  <!-- nav menu -->
    <b-navbar toggleable="sm" type="light" variant="light" class="gradient bgwhite">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Control_T' }">Torque</b-nav-item>
          <b-nav-item :to="{ name: 'Control_RS' }">Rotary Speed</b-nav-item>
          <b-nav-item :to="{ name: 'Control_OC' }">Operating State</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</div>
</template>

<script>
export default {
}
</script>

