<template>
<div class="content-layout">
  <navbar-view :resize_navbar.sync="resizeNavbar" :btn_navbar.sync="btn_navbar"></navbar-view>
  <section class="content-main" :class="{'activeResize':show_menu}">
    <header class="header-user">
      <!-- v-if="show_btn_menu" -->
      <!-- button class="show_menu" @click="optionMenu()">
        <i class="material-icons">dehaze</i>
      </button -->
      <!-- div class="clearfix">
        <div class="b-right">
          <div class="sign">
            <ul class="nav nav_opt"> 
              <li>
                <div class="picture-user">
                  <span class="name-user">Usuario Prueba</span>
                </div>
              </li>
            </ul> 
          </div>
        </div>
      </div -->
    </header>
    <router-view></router-view>
  </section>
</div>
</template>
<script>
  import NavbarView from '../common/NavbarView.vue'
  export default {
    name: 'BaseView',
    components: {
      NavbarView
    },
    data () {
      let isResponsive = this.$mobilecheck
      return {
        isResponsive,
        // verify phone
        flagResend: false,
        showResendCode: false,
        flagConfirmation: false,
        flagResponseConfirmation: false,
        viewOption: false,
        dialogReactive: false,
        activeAccount: false,
        resizeNavbar: false,
        btn_navbar: false,
        show_menu: false,
        flagUser: false
      }
    },
    created () {
      this.handleResize()
    },
    mounted () {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      optionMenu () {
        this.btn_navbar = !this.btn_navbar
        if (window.innerWidth <= 768) {
        } else {
          this.show_menu = !this.show_menu
        }
      },
      handleResize (event) {
        if (window.innerWidth <= 768) {
          if (!this.resizeNavbar) {
            this.resizeNavbar = true
            this.show_menu = true
          }
        } else {
          this.show_menu = false
          this.resizeNavbar = false
          this.btn_navbar = false
        }
      },
      showOption () {
        if (!this.viewOption) {
          this.viewOption = true
        } else {
          this.viewOption = false
        }
      },
      hideOption () {
        if (this.viewOption) {
          this.viewOption = false
        } else {
          this.viewOption = true
        }
      },
      signOut () {
      }
    }
  }
</script>
