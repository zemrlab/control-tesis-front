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
        <h3 class="section--title">Registro de Tesis</h3>
        <div class="content-search clearfix">
          <div class="clearfix">
            <p>Busque el Usuario a Registrar:</p>
            <ui-textbox v-model="codigoBuscar" name="search" placeholder="Buscar por código de alumno" icon="search" hide-label></ui-textbox>
            <ui-button @click="onSubmitSearchStudent()" :loading="loadSearch" color="primary">BUSCAR</ui-button>
          </div>
          <div v-if="flagFindStudent" class="clearfix" style="margin-top: 10px;">
            <template v-if="!isEmpty(student)">
              <p style="margin: 0;font-size: 16px;"><b>Resultados de la busqueda: </b></p>
              <p style="margin: 0 0 3px;"><b>Nombre y Apellido: </b> {{student.nom_alumno +' '+student.ape_paterno +' '+student.ape_materno}}</p>
              <p style="margin: 0;"><b>Código: </b> {{student.cod_alumno}}</p>
            </template>
            <template v-else>
              <p style="margin: 0;"><b>El código no existe.</b></p>
            </template>
          </div>
        </div>
        <div class="content-register clearfix">
          <ui-collapsible :open="open1">
            <div slot="header">
              <h5 class="section--subtitle"><span class="num">1</span>Dictamen de Inscripción y Registro de Asesor</h5>
            </div>
            <dictamen-inscripcion :tesis="tempTesis" :idtesis="idtesis" :teachers="teachers" :student="student" @success="onInscripcion" @modal="onEventModal" @idtesis="onIdTesis"></dictamen-inscripcion>
          </ui-collapsible>

          <ui-collapsible :open="open2">
            <div slot="header">
              <h5 class="section--subtitle"><span class="num">2</span> Dictamen de Declaracion de Expedito</h5>
            </div>
            <dictamen-expedito :tesis="tempTesis" :idtesis="idtesis" :teachers="teachers" :student="student"></dictamen-expedito>
          </ui-collapsible>

          <ui-collapsible :open="open3">
            <div slot="header">
              <h5 class="section--subtitle"><span class="num">3</span> Designación Jurado Informante</h5>
            </div>
            <designacion-jurado :tesis="tempTesis" :idtesis="idtesis" :teachers="teachers" :student="student"></designacion-jurado>
          </ui-collapsible>

          <ui-collapsible :open="open4">
            <div slot="header">
              <h5 class="section--subtitle"><span class="num">4</span> Designación Jurado Examinador</h5>
            </div>
            <designacion-examinador :tesis="tempTesis" :idtesis="idtesis" :teachers="teachers" :student="student"></designacion-examinador>
          </ui-collapsible>
        </div>
      </div>
    </section>
  </template>
  <ui-modal dismiss-on="close-button esc" ref="modalConfirmation">
    <div slot="header"><b :style="'color:' + modal.type === 'success' ? 'green':'red'">{{modal.title}}</b></div>
    {{modal.message}}
  </ui-modal>
</div>
</template>
<script>
import DictamenInscripcion from './components/DictamenInscripcion.vue'
import DictamenExpedito from './components/DictamenExpedito.vue'
import DesignacionJurado from './components/DesignacionJurado.vue'
import DesignacionExaminador from './components/DesignacionExaminador.vue'
export default {
  name: 'TesisRegisterPage',
  components: {
    DictamenInscripcion,
    DictamenExpedito,
    DesignacionJurado,
    DesignacionExaminador
  },
  data () {
    return {
      teachers: [],
      student: {},
      idtesis: null,
      tesis: {},
      tempTesis: {},
      step1: true,
      open1: false,
      step2: true,
      open2: false,
      step3: true,
      open3: false,
      step4: true,
      open4: false,
      flagStep1: false,
      flagFindStudent: false,
      codigoBuscar: '',
      flagResponse: false,
      loadSearch: false,
      modal: {
        type: 'success',
        title: '',
        message: ''
      }
    }
  },
  created () {
    this.getAllTeacher()
  },
  methods: {
    onEventModal (type, title, message) {
      this.modal.type = type
      this.modal.title = title
      this.modal.message = message
      this.openModal('modalConfirmation')
    },
    onInscripcion (tesis) {
      this.tesis = tesis
      this.open1 = false
      this.step2 = false
      this.open2 = true
    },
    onSubmitSearchStudent () {
      this.flagFindStudent = false
      this.student = {}
      if (this.isEmpty(this.codigoBuscar) || (this.codigoBuscar.length < 8 || this.codigoBuscar.length > 8)) {
        this.flagFindStudent = true
        return false
      }
      this.loadSearch = true
      this.axios.post('api/alumno/buscarPorCodigo', { cod_alumno: this.codigoBuscar }).then(res => {
        let data = res.data
        this.student = data.alumno
        this.existsTesisByStudent()
        // console.log(res)
      }).catch(() => {
        this.flagFindStudent = true
        this.loadSearch = false
        this.step1 = true
        this.open1 = false
      })
    },
    existsTesisByStudent () {
      this.axios.get(`api/tesis/obtener/${this.student.cod_alumno}`).then(res => {
        let data = res.data
        this.tempTesis = data || {}
        if (!this.isEmpty(data.tesis)) {
          this.idtesis = data.tesis.idtesis
          if (data.tesis.paso === 1) {
            this.step1 = false
            this.open1 = true
          } else if (data.tesis.paso === 2) {
            this.step1 = this.step2 = false
            this.open1 = false
            this.open2 = true
          }
        }
        this.flagFindStudent = true
        this.flagStep1 = true
        this.loadSearch = false
      }).catch(err => {
        console.log('error', err)
      })
    },
    onIdTesis (id) {
      this.idtesis = id
    },
    getAllTeacher () {
      this.axios.get('api/docente/listar')
      .then(res => {
        let data = res.data.docente
        // console.log('ticher', data)
        data.forEach(item => {
          this.teachers.push({
            label: `${item.apell_pat} ${item.apell_mat}, ${item.nombres}`,
            value: item.id
          })
        })
        this.flagResponse = true
        // console.log(res)
      }).catch(err => {
        this.flagResponse = true
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
