<template>
    <div>
        <button value="21" @click="setupQuiz">Sports</button>
        <button value="11" @click="setupQuiz">Movies</button>
        <button value="14" @click="setupQuiz">TV</button>
        <button value="12" @click="setupQuiz">Music</button>
        <button value="23" @click="setupQuiz">History</button>
        <button value="22" @click="setupQuiz">Geography</button>
        <button value="27" @click="setupQuiz">Animals</button>
        <button value="24" @click="setupQuiz">Politics</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: 'Categories',
        methods: mapActions(['setupQuiz'])
    }
</script>

<style scoped>

</style>
