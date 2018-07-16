<template>
    <div>
        {{ getResults }}
        <router-link to="/categories">Take another Quiz</router-link>    
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "Results",
        computed: mapGetters(['getResults'])
    }
</script>

<style scoped>

</style>

