<template>
    <div class="container">
        <h1>Categories</h1>
        <div class="button-group">
            <button value="21" @click="setupQuiz" class="button">Sports</button>
            <button value="11" @click="setupQuiz" class="button">Movies</button>
            <button value="14" @click="setupQuiz" class="button">TV</button>
            <button value="12" @click="setupQuiz" class="button">Music</button>
            <button value="23" @click="setupQuiz" class="button">History</button>
            <button value="22" @click="setupQuiz" class="button">Geography</button>
            <button value="27" @click="setupQuiz" class="button">Animals</button>
            <button value="24" @click="setupQuiz" class="button">Politics</button>
        </div>
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
    h1 {
        padding-top: 1em;
    }
    .button-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1024px;
        margin: 0 auto;
    }

    @media (min-width: 768px) {
        .button-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
</style>

