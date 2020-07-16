<template>
  <div id="app">
    <component v-bind:is="layout" />
    <loading />
  </div>
</template>

<script>
import Loading from '~/components/Loading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      defaultLayout: "default"
    };
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || this.defaultLayout) + "-layout";
    }
  }
};
</script>
