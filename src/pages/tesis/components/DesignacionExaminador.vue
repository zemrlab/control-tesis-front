<template>
  <div class="">
    <div class="row">
      <div class="col-xs-12 col-sm-3">
        <ui-datepicker placeholder="dd/mm/aaaa"
        picker-type="modal" :max-date="pickerMax" :lang="dateEs" v-model="picker1">Seleccione fecha</ui-datepicker>
      </div>
    </div>
    <p>Número</p>
    <div class="row">
      <div class="col-xs-12 col-sm-2 col-md-2">
        <ui-textbox placeholder="Número" v-model="num1" name="num1"></ui-textbox>
      </div>
      <div class="col-xs-12 col-sm-2 col-md-2">
        <ui-textbox placeholder="Año" v-model="num4" name="num4"></ui-textbox>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Grado</th>
              <th>Nombre y Apellido</th>
              <th>Tipo de Jurado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Dra.</td>
              <td>Nora La Serna Palomino</td>
              <td>Presidente</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Dr.</td>
              <td>David Santos Mauricio Sánchez</td>
              <td>Asesor</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mg.</td>
              <td>Edgardo Palza Vargas</td>
              <td>Miembro</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mg.</td>
              <td>Esther Berger Vida</td>
              <td>Miembro</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mg.</td>
              <td>Luzmila Pro Concepción</td>
              <td>Miembro</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-3">
        <ui-datepicker placeholder="dd/mm/aaaa"
        picker-type="modal" :lang="dateEs" v-model="picker2">Fecha de Sustentación</ui-datepicker>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-2">
        <ui-textbox v-model="hours" name="hours" label="Hora de Sustentación"></ui-textbox>
        <span>*Las horas son c</span>
      </div>
    </div>
    <div class="text-right">
      <ui-button @click="onSubmitDeclaracionExpedito()" color="primary">Registrar</ui-button>
    </div>
  </div>
</template>
<script>
import { dateEs } from '../../../mixins/text.js'
export default {
  name: 'DesignacionExaminador',
  props: {
    teachers: {
      type: Array,
      default: []
    },
    student: {
      type: Object,
      default: {}
    },
    idtesis: Number,
    tesis: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      pickerMax: new Date(),
      dateEs,
      hours: 0,
      selectAsesor: '',
      picker1: null,
      picker2: null,
      titulo: '',
      idDocumento: '',
      user: {},
      num1: '',
      num4: '',
      codigoBuscar: '',
      responseContact: false
    }
  },
  created () {
    // this.fetchTeacher()
  },
  mounted () {
  },
  methods: {
    onSubmitDeclaracionExpedito () {
      console.log('aa')
    },
    fetchTeacher () {
      this.axios.get('/api/listarProfesor')
      .then(res => {
        let data = res.data.profesor
        console.log(data)
        data.forEach(item => {
          this.teachers.push({
            label: item.nombre,
            value: item.idProfesor
          })
        })
        this.responseContact = true
        // console.log(res)
      }).catch(err => {
        this.responseContact = true
        console.log('error', err)
      })
    },
    onSubmitSearchStudent () {
      if (this.isEmpty(this.codigoBuscar)) {
        return
      }
      this.axios.post('/api/buscarPorCodigo', { codigo: this.codigoBuscar })
      .then(res => {
        let data = res.data
        console.log(data)
        this.user = data.alumno
        this.loading = false
        // console.log(res)
      }).catch(err => {
        this.loading = false
        console.log('error', err)
      })
    },
    formatDate1 (date) {
      let _date = new Date(date)
      var mm = _date.getMonth() + 1
      var dd = _date.getDate()
      return [
        _date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
      ].join('-')
    }
  }
}
</script>
