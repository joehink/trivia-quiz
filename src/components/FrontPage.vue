<template>
    <div class="container">
        <div class="box">
            <h1>Trivia Quiz</h1>
            <router-link 
                to='/categories'
                class="button"
            > 
                Start
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FrontPage'
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
