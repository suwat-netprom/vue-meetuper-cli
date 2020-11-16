<template>
  <!--<div v-with-warning:red.prevent="'What a nice day :)'"></div>-->
  <form class="post-create">
    <div class="field">
      <textarea v-auto-expand
                v-model="text"
                class="textarea textarea-post"
                placeholder="Write a post"
                rows="1"></textarea>
      <button :disabled="!text" @click.prevent="sendPost" class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>

<script>
import withWarning from "@/direatives/withWarning";
import autoExpand from "@/direatives/autoExpand";
export default {
  name: "PostCreate",
  directives: {
    withWarning,
    autoExpand
  },
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      text: null
    }
  },
  created() {
    console.log('this.threadId');
    console.log(this.threadId);
  },
  methods: {
    sendPost () {
      this.$store.dispatch('threads/sendPost', {text: this.text, threadId: this.threadId}).then(() => {
        this.text = ''
      })
    }
  }
}
</script>

<style scoped lang="scss">
.textarea-post {
  padding-bottom: 30px;
}

.post-create {
  margin-bottom: 15px;
}
</style>
