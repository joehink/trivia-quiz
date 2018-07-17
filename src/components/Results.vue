<template>
    <div class="container">
        <p>Your score:</p>
        <h1>{{ getResults }}</h1>
        <router-link class="button" to="/categories">Take another Quiz</router-link>    
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
    p {
        text-align: center;
        color: white;
        margin-bottom: 15px;
        font-size: 20px;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>

