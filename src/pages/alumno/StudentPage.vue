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
        <h3 class="section--title">Busqueda de Estudiante</h3>
        <div class="content-search clearfix">
          <ui-textbox v-model="codigoBuscar" name="search" placeholder="Buscar por código" icon="search" hide-label></ui-textbox>
          <ui-button @click="onSubmitSearchStudent()" :loading="loadStudent" color="primary">BUSCAR</ui-button>
          <div v-if="flagFindStudent" class="clearfix" style="margin-top: 10px;">
            <p style="margin: 0;"><b>No se encontre ningun registro con ese código.</b></p>
          </div>
        </div>
        <hr>
        <div class="content-register clearfix">
          <div class="">
            <ui-textbox v-model="user.ape_paterno" name="apellidoPaterno" label="Apellido Paterno"></ui-textbox>
            <ui-textbox v-model="user.ape_materno" name="apellidoMaterno" label="Apellido Materno"></ui-textbox>
            <ui-textbox v-model="user.nom_alumno" name="search" label="Nombres"></ui-textbox>
            <ui-textbox v-model="user.cod_alumno" name="codigo" label="Código"></ui-textbox>
            <!-- div class="row">
              <div class="col-xs-12 col-sm-6">
                <ui-select name="typeDocument" v-model="idDocumento" :options="typesDocument" label="Tipo de Documento"></ui-select>
              </div>
              <div class="col-xs-12 col-sm-6">
                <ui-textbox v-model="user.numeroDocumento" name="numDocumento" label="Número  de documento"></ui-textbox>
              </div>
            </div>
            <ui-textbox v-model="user.telefono" name="search" label="Telefono"></ui-textbox>
            <ui-textbox v-model="user.correo" type="email" name="search" label="Correo"></ui-textbox -->
          </div>
          <!-- div class="text-right">
            <ui-button @click="onSubmitRegister()" color="primary">Registrar</ui-button>
          </div -->
        </div>
      </div>
    </section>
  </template>
</div>
</template>
<script>
let typesDocument = [
  {label: 'DNI', value: '1'},
  {label: 'Carné de extranjeria', value: '2'}
]
export default {
  name: 'StudentPage',
  data () {
    return {
      typesDocument,
      idDocumento: '',
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
      codigoBuscar: '',
      responseContact: false
    }
  },
  created () {
  },
  mounted () {
    this.responseContact = true
  },
  methods: {
    onSubmitSearchStudent () {
      if (this.isEmpty(this.codigoBuscar)) {
        return
      }
      this.loadStudent = true
      this.flagFindStudent = false
      this.axios.post('api/alumno/buscarPorCodigo', { cod_alumno: this.codigoBuscar })
      .then(res => {
        let data = res.data
        console.log(data)
        this.user = data.alumno
        // this.user.apellidoPaterno = data.alumno.apellidoPaterno
        // this.user.apellidoMaterno = data.alumno.apellidoMaterno
        // this.user.nombres = data.alumno.nombres
        // this.idDocumento = `${data.alumno.idDocumento}`
        // this.user.numeroDocumento = data.alumno.numeroDocumento
        // this.user.telefono = data.alumno.telefono
        // this.user.codigo = data.alumno.codigo
        // this.user.correo = data.alumno.correo
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
