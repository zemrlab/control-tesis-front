<template>
<div class="">
    <div class="clearfix">
      <ui-textbox v-model="titulo" multi-line name="titlo" label="Titulo"></ui-textbox>
    </div>
    <div class="clearfix">
      <ui-select name="asesor" v-model="selectAsesor" :options="teachers" label="Asesor"></ui-select>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <ui-textbox v-model="student.cod_alumno" name="codigo" label="Código"></ui-textbox>
      </div>
      <div class="col-xs-12 col-sm-6">
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
    <div class="text-right">
      <ui-button @click="onSubmitInscripcionAsesor()" :loading="loadRegister" color="primary" :disabled="disabled">{{btnTextNext}}</ui-button>
    </div>
    <!-- ui-modal dismiss-on="close-button esc" ref="modalConfirmation">
      <div slot="header"><b :style="'color:' + modal.type === 'success' ? 'green':'red'">{{modal.title}}</b></div>
      {{modal.message}}
    </ui-modal -->
</div>
</template>
<script>
import { dateEs } from '../../../mixins/text.js'
export default {
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
      dateEs,
      selectAsesor: '',
      picker1: null,
      titulo: '',
      btnTextNext: 'Registrar',
      loadSearch: false,
      loadRegister: false,
      disabled: false,
      pickerMax: new Date(),
      idalumno: '',
      idDocumento: '',
      num1: '',
      num4: ''
    }
  },
  watch: {
    tesis (val, old) {
      if (!this.isEmpty(val.tesis)) {
        this.picker1 = new Date(val.tesis.fecha_inscripcion)
        let arr = val.tesis.nro_inscripcion.split('-')
        this.num1 = arr[0]
        this.num4 = arr[3]
        this.titulo = val.tesis.titulo
        this.btnTextNext = 'Editar'
      }
    }
  },
  mounted () {
    // this.$nextTick(() => {
    // if (!this.isEmpty(this.tesis)) {
    //   this.picker1 = new Date(this.tesis.fecha_inscripcion)
    //   let arr = this.tesis.nro_inscripcion.split('-')
    //   this.num1 = arr[0]
    //   this.num4 = arr[3]
    //   this.titulo = this.tesis.titulo
    //   this.btnTextNext = 'Editar'
    // }
    // })
  },
  methods: {
    onSubmitInscripcionAsesor () {
      let data = {
        idalumno: this.student.cod_alumno,
        iddocente: parseInt(this.selectAsesor.value),
        titulo: this.titulo,
        nro_inscripcion: `${this.num1}-UPG-FISI-${this.num4}`,
        fecha_inscripcion: this.formatDate1(this.picker1)
      }
      this.disabled = true
      this.loadRegister = true
      this.axios.post('/api/tesis/inscripcion', data)
      .then(res => {
        let resdata = res.data
        this.$emit('success', resdata.tesis)
        this.$emit('modal', 'success', 'Confirmación', 'Se registro correctamente.')
        this.$emit('idtesis', resdata.tesis.idtesis)
        this.disabled = false
        this.loadRegister = false
      }).catch(() => {
        this.disabled = false
        this.loadRegister = false
        this.$emit('modal', 'error', 'Error', 'Hubo un error en el proceso vuelta a intentarlo.')
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
