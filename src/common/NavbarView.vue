<template>
<div class="content-aside" :class="{'activeResize': flagNavbar}">
  <header class="header-logo">
    <div class="clearfix">
      <router-link class="alink" :to="{name: 'TesisPage'}">
        Control de Tesis
      </router-link>
    </div>
  </header>
  <div class="nav_list-user">
    <ul class="nav nav-option_style">
      <li>
        <router-link class="alink" :to="{name: 'TeacherPage'}">
          <span class="name_a">Docentes</span>
        </router-link>
      </li>
      <li>
        <router-link class="alink" :to="{name: 'StudentPage'}">
          <span class="name_a">Alumnos</span>
        </router-link>
      </li>
      <li>
        <router-link class="alink" :to="{name: 'TesisPage'}">
          <span class="name_a">Registro de Tesis</span>
        </router-link>
      </li>
      <!-- li>
        <router-link class="alink" :to="{name: 'ListTesisPage'}">
          <span class="name_a">Busqueda de Tesis</span>
        </router-link>
      </li>
      <li>
        <router-link class="alink" :to="{name: 'SearchTesisPage'}">
          <span class="name_a">Busqueda Alumno</span>
        </router-link>
      </li -->
    </ul>
  </div>
</div>
</template>

<script>
  export default {
    name: 'NavbarView',
    props: ['resize_navbar', 'btn_navbar'],
    data () {
      return {
        isResponsive: window.mobilecheck,
        flagNavbar: false,
        flagBg: false
      }
    },
    watch: {
      btn_navbar (val, old) {
        if (val) {
          if (!this.resize_navbar) {
            this.flagNavbar = true
            this.flagBg = false
          } else {
            this.flagNavbar = false
            this.flagBg = true
          }
        } else {
          if (this.resize_navbar) {
            this.flagNavbar = true
            this.flagBg = false
          } else {
            this.flagNavbar = false
            this.flagBg = false
          }
        }
      },
      resize_navbar (val, old) {
        if (val) {
          if (this.btn_navbar) {
            this.flagBg = true
          } else {
            this.flagNavbar = true
            this.flagBg = false
          }
        } else {
          this.flagNavbar = false
          this.flagBg = false
        }
      }
    },
    created () {
      this.validateShow()
    },
    ready () {
      this.fetchUnread()
    },
    methods: {
      optionMenu () {
        this.flagNavbar = !this.flagNavbar
        this.btn_navbar = !this.btn_navbar
      },
      hideNav () {
        if (this.resize_navbar) {
          this.optionMenu()
        }
      },
      validateShow () {
        if (this.resize_navbar) {
          if (this.btn_navbar) {
            this.flagNavbar = true
            this.flagBg = true
          } else {
            this.flagNavbar = true
            this.flagBg = false
          }
        } else {
          this.flagNavbar = false
          this.flagBg = false
        }
      }
    }
  }
</script>