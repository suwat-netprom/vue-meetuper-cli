<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard  @meetupConfirmed="createMeetup"/>
      </div>
    </section>
  </div>
</template>

<script>
import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard'
import categories from "@/store/modules/categories";

export default {
  name: "PageMeetupCreate",
  components: {
    MeetupCreateWizard
  },
  computed: {
    categories () {
      return this.$store.state.categories.items
    }
  },
  created() {
    if (this.categories.length === 0) {
      this.$store.dispatch('categories/fetchCategories')
    }
  },
  methods: {
    createMeetup(meetUpToCreate) {
      this.$store.dispatch('meetups/createMeetup', meetUpToCreate).then(createMeetup => {
        this.$router.push(`/meetups/${createMeetup._id}`)
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.meetup-create-page {
  min-height: 100vh;
}
</style>
