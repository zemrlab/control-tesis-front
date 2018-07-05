export default {
  methods: {
    openModal (ref) {
      this.$refs[ref].open()
    },
    closeModal (ref) {
      this.$refs[ref].close()
    },
    /*
    validateEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    */
    validateDate (_ExpiryDate) {
      if (_ExpiryDate.length !== 10) {
        return false
      }
      if (_ExpiryDate.substring(2, 3) !== '/' || _ExpiryDate.substring(5, 6) !== '/') {
        return false
      }
      let day = _ExpiryDate.substring(0, 2) - 0
      let month = _ExpiryDate.substring(3, 5) - 1
      let year = _ExpiryDate.substring(6, 10) - 0
      if (year < 1000 || year > 3000) {
        return false
      }
      if (month > 12) {
        return false
      }
      let mSeconds = (new Date(year, month, day)).getTime()
      let objDate = new Date()
      objDate.setTime(mSeconds)
      if (objDate.getFullYear() !== year || objDate.getMonth() !== month || objDate.getDate() !== day) {
        return false
      }
      return true
    },
    isEmpty (obj) {
      if (obj == null) return true

      if (obj.length > 0) return false
      if (obj.length === 0) return true

      if (typeof obj !== 'object') return true

      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false
      }
      return true
    }
  }
}
