<template>
  <div id="nav-template">
  <!-- nav menu -->
    <b-navbar toggleable="lg" type="dark" variant="primary" >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Charts' }">Monitor</b-nav-item>
          <b-nav-item :to="{ name: 'Content' }">Data Log</b-nav-item>
          <b-nav-item :to="{ name: 'Control_T' }">Control</b-nav-item>
          <b-nav-item href="https://paldigitaltwin.netlify.app/">Exit</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    <a class="navbar-brand" href="#">
      <a href="https://www.manchester.ac.uk/">
      <img src="../assets/uom_logo.png" width="110" height="45" alt="">
      </a>
    </a>
    </b-navbar>
</div>
</template>

<script>
export default {
  methods: {
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
        }, 1000)
      }
  }
}
</script>

<style scoped>
.navbar-brand {
  padding: 20;
  margin: 0;
}

</style>

