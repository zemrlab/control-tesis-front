<template>
<div class="bgTransition">
  <template v-if="!responseContact">
    <div class="preload-app">
      <ui-progress-linear></ui-progress-linear>
    </div>
  </template>
  <template v-else>
    <section class="section-register">
      <div class="width-register clearfix">
        <h3 class="section--title">Busqueda de Tesis</h3>
        <div class="content-register clearfix">
          <div class="table-responsive">
            <table v-if="tesis.length > 0" class="table table-bordered">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Código Alumno</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody v-for="item in tesis" :key="item.idtesis">
                <tr>
                  <td>{{item.titulo}}</td>
                  <td>{{item.idalumno}}</td>
                  <td>{{item.fecha || '21/06/2018'}}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="tesis.length == 0">
              <p>No se he registrado alguna tesis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</div>
</template>
<script>
import { dateEs } from '../../mixins/text.js'
export default {
  name: 'ListTesisPage',
  data () {
    return {
      dateEs,
      selectAsesor: '',
      picker1: null,
      titulo: '',
      tesis: [],
      codigoBuscar: '',
      responseContact: false
    }
  },
  created () {
    this.fetchTesis()
  },
  mounted () {
  },
  methods: {
    fetchTesis () {
      this.axios.get('api/tesis/listar')
      .then(res => {
        let data = res.data
        this.tesis = data.tesis
        console.log(data, res)
        // data.forEach(item => {
        //   this.teachers.push({
        //     label: item.nombre,
        //     value: item.idProfesor
        //   })
        // })
        this.responseContact = true
        // console.log(res)
      }).catch(err => {
        this.responseContact = true
        console.log('error', err)
      })
    }
  }
}
</script>
