<template>
  <div class="container">
    <ErrorView :title="'Ooooops, page you are trying to access doesn\'t exist\''"
               :status="'404'"
               :navigate-to-page="'PageHome'"
               :navigate-to-text="'Navigate back Home'"/>
  </div>
</template>

<script>
import ErrorView from "@/components/ErrorView";

export default {
  name: 'PageNotFound',
  components: {
    ErrorView
  }
}
</script>

<style scoped>

</style>
