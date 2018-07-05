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
        <h3 class="section--title">Busqueda de Profesor</h3>
        <div class="content-search clearfix">
          <ui-textbox v-model="nameSearch" name="search" placeholder="Buscar por nombre" icon="search" hide-label></ui-textbox>
          <ui-button @click="onSubmitSearchStudent()" :loading="loadStudent" color="primary">BUSCAR</ui-button>
          <div v-if="flagFindStudent" class="clearfix" style="margin-top: 10px;">
            <p style="margin: 0;"><b>No se encontre ningun registro con ese código.</b></p>
          </div>
        </div>
        <hr>
        <div class="content-register clearfix">
          <table v-if="teachers.length > 0" class="table table-bordered">
            <thead>
              <tr>
                <th style="width: 30px;">#</th>
                <th>Nombre</th>
                <th>Apellido Pat.</th>
                <th>Apellido Mat.</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in teachers" :key="item.id">
              <tr>
                <td>{{index + 1}}</td>
                <td>{{item.nombres}}</td>
                <td>{{item.apell_pat}}</td>
                <td>{{item.apell_mat}}</td>
              </tr>
            </tbody>
          </table>
          <!-- div class="">
            <ui-textbox v-model="user.ape_paterno" name="apellidoPaterno" label="Apellido Paterno"></ui-textbox>
            <ui-textbox v-model="user.ape_materno" name="apellidoMaterno" label="Apellido Materno"></ui-textbox>
            <ui-textbox v-model="user.nom_alumno" name="search" label="Nombres"></ui-textbox>
            <ui-textbox v-model="user.cod_alumno" name="codigo" label="Código"></ui-textbox>
          </div>
          <div class="text-right">
            <ui-button @click="onSubmitRegister()" color="primary">Registrar</ui-button>
          </div -->
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
let typesDocument = [
  {label: 'DNI', value: '1'},
  {label: 'Carné de extranjeria', value: '2'}
]
export default {
  name: 'TeacherPage',
  data () {
    return {
      typesDocument,
      idDocumento: '',
      teachers: [],
      user: {
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        codigo: '',
        numeroDocumento: '',
        telefono: '',
        correo: ''
      },
      flagFindStudent: false,
      loadStudent: false,
      nameSearch: '',
      flagResponse: false,
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
  mounted () {
  },
  methods: {
    getAllTeacher () {
      this.axios.get('api/docente/listar')
      .then(res => {
        let data = res.data.docente
        this.teachers = data
        // console.log('ticher', data)
        // data.forEach(item => {
        //   this.teachers.push({
        //     label: `${item.apell_pat} ${item.apell_mat}, ${item.nombres}`,
        //     value: item.id
        //   })
        // })
        this.flagResponse = true
        // console.log(res)
      }).catch(err => {
        this.flagResponse = true
        console.log('error', err)
      })
    },
    onSubmitSearchStudent () {
      if (this.isEmpty(this.nameSearch)) {
        return
      }
      this.loadStudent = true
      this.flagFindStudent = false
      this.axios.post('api/docente/busqueda', { nombres: this.nameSearch })
      .then(res => {
        let data = res.data
        console.log(data)
        this.user = data.alumno
        this.loadStudent = false
        // console.log(res)
      }).catch(err => {
        this.flagFindStudent = true
        this.loadStudent = false
        console.log('error', err)
      })
    },
    onSubmitRegister () {
      this.user.idDocumento = parseInt(this.idDocumento.value)
      this.axios.post('/api/registrarAlumno', this.user)
      .then(res => {
        let data = res.data
        console.log('registrar', data)
        this.loading = false
        // console.log(res)
      }).catch(err => {
        this.loading = false
        console.log('error', err)
      })
    }
  }
}
</script>
