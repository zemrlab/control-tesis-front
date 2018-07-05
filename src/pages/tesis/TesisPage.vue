<template>
<div class="bgTransition">
  <template v-if="!flagResponse">
    <div class="preload-app">
      <ui-progress-linear></ui-progress-linear>
    </div>
  </template>
  <template v-else>
    <section class="section-register">
      <div class="width-register clearfix">
        <ul class="nav nav__menu-tesis">
          <li>
            <router-link class="alink" :to="{name: 'TesisRegisterPage'}">
              <div class="menu-icon"><i class="material-icons">school</i></div>
              <span class="name_a">Registrar</span>
            </router-link>
          </li>
          <li>
            <router-link class="alink" :to="{name: 'TesisListPage'}">
              <div class="menu-icon"><i class="material-icons">search</i></div>
              <span class="name_a">Busqueda</span>
            </router-link>
          </li>
        </ul>
        <div class="clearfix">
          <form class="form-content" method="GET" action="https://control-tesis-back.herokuapp.com/api/tesis/exportar">
            <div style="color: #fff">
              <ui-button color="primary">Exportar Excel</ui-button>
            </div>
          </form>
          <!-- ui-button @click="onSubmitExcel()" :loading="loadExport" color="primary" :disabled="loadExport">Reporte Excel</ui-button -->
        </div>
      </div>
    </section>
  </template>
</div>
</template>
<script>
export default {
  name: 'TesisPage',
  data () {
    return {
      flagResponse: false,
      loadExport: false
    }
  },
  mounted () {
    this.flagResponse = true
  },
  methods: {
    onSubmitExcel () {
      this.loadExport = true
      this.axios.get('/api/tesis/exportar').then(res => {
        let data = res
        console.log(data)
        this.loadExport = false
      }).catch(() => {
        this.loadExport = false
      })
    }
  }
}
</script>
