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
    <div class="text-right">
      <ui-button @click="onSubmitDeclaracionExpedito()" color="primary" :loading="loadRegister" :disabled="disabled">{{btnTextNext}}</ui-button>
    </div>
  </div>
</template>
<script>
import { dateEs } from '../../../mixins/text.js'
export default {
  name: 'DictamenExpedito',
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
      picker1: null,
      loadRegister: false,
      disabled: false,
      btnTextNext: 'Registrar',
      num1: '',
      num4: '',
      responseContact: false
    }
  },
  watch: {
    tesis (val, old) {
      console.log(val.dictamen_expedito, this.isEmpty(val.dictamen_expedito))
      if (!this.isEmpty(val.dictamen_expedito)) {
        this.picker1 = new Date(val.dictamen_expedito.fecha_dictamen)
        let arr = val.dictamen_expedito.nro_dictamen.split('-')
        this.num1 = arr[0]
        this.num4 = arr[3]
        this.btnTextNext = 'Editar'
      }
    }
  },
  created () {
    // this.fetchTeacher()
  },
  mounted () {
  },
  methods: {
    onSubmitDeclaracionExpedito () {
      if (this.idtesis !== null) {
        let data = {
          idtesis: this.idtesis,
          nro_dictamen: `${this.num1}-UPG-FISI-${this.num4}`,
          fecha_dictamen: this.formatDate1(this.picker1)
        }
        this.disabled = true
        this.loadRegister = true
        this.axios.post('/api/dictamenExpedito/registrar', data)
        .then(res => {
          // let resdata = res.data
          this.disabled = false
          this.loadRegister = false
          this.btnTextNext = 'Editar'
          this.$emit('modal', 'success', 'Confirmación', 'Se registro correctamente.')
          // console.log(res)
        }).catch(err => {
          this.disabled = true
          this.loadRegister = false
          this.$emit('modal', 'error', 'Error', 'Hubo un error en el proceso vuelta a intentarlo.')
          console.log('error', err)
        })
      }
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
