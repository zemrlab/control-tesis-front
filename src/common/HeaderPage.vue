<template>
<div class="header-section">
  <div class="vertical-title">
    <h2>{{ title }}</h2>
  </div>
</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>