<template>
<div class="content-login">
  <div class="wrap-login">
    <div class="block-login">
      <div class="form-login">
        <h4>LOGIN</h4>
        <div class="card">
          <div class="card-body">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="Activity name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Activity name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
            <!-- div class="form-group has-label">
              <ui-textbox name="name" label="Usuario" type="text" v-model="user"></ui-textbox>
            </div>
            <div class="form-group has-label">
              <ui-textbox name="name" label="Contraseña" type="password" v-model="password"></ui-textbox>
            </div -->
          </div>
          <div class="card-footer text-center">
            <ui-button :loading="loading" color="primary" :disabled="loading" @click="onSubmitLogin()">INGRESAR</ui-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// import { UiTextbox, UiButton } from 'keen-ui'
export default {
  name: 'SignPage',
  components: {
    UiTextbox, 
    UiButton
  },
  data () {
    return {
      user: '',
      password: '',
      loading: false
    }
  },
  methods: {
    onSubmitLogin () {
      this.$router.push({name: 'StudentPage'})
    }
  }
}
</script>
