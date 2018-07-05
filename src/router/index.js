import Vue from 'vue'
import Router from 'vue-router'
// import SignPage from '../pages/SignPage.vue'
import BaseView from '../pages/BaseView.vue'
import TesisPage from '../pages/tesis/TesisPage.vue'
import TesisRegisterPage from '../pages/tesis/TesisRegisterPage.vue'
import TesisListPage from '../pages/tesis/TesisListPage.vue'
// import ListTesisPage from '../pages/ListTesisPage.vue'
// import SearchTesisPage from '../pages/SearchTesisPage.vue'
import TeacherPage from '../pages/docente/TeacherPage.vue'
import StudentPage from '../pages/alumno/StudentPage.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'SignPage',
    //   component: SignPage
    // },
    {
      path: '/',
      name: 'BaseView',
      component: BaseView,
      children: [
        // {
        //   path: '/',
        //   redirect: '/docentes'
        // },
        {
          path: 'docentes',
          name: 'TeacherPage',
          component: TeacherPage
        },
        {
          path: 'alumnos',
          name: 'StudentPage',
          component: StudentPage
        },
        {
          path: 'tesis',
          name: 'TesisPage',
          component: TesisPage
        },
        {
          path: 'tesis/registrar',
          name: 'TesisRegisterPage',
          component: TesisRegisterPage
        },
        {
          path: 'tesis/buscar',
          name: 'TesisListPage',
          component: TesisListPage
        }
        // {
        //   path: 'listar-tesis',
        //   name: 'ListTesisPage',
        //   component: ListTesisPage
        // },
        // {
        //   path: 'busqueda',
        //   name: 'SearchTesisPage',
        //   component: SearchTesisPage
        // }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return { x: 0, y: 0 }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
