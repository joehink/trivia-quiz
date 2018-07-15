<template>
    <div v-if="getCurrQuestion">
        <h3 v-html="getCurrQuestion.question.question"></h3>
        <button 
            v-for="(answer, index) in getCurrQuestion.question.answers" 
            :key="answer"
        >
            {{ `${index + 1}. ${answer}` }}
        </button>
        <button :disabled="isQuestionAnswered" @click="answerQuestion">Submit</button>
        <button :disabled="!isQuestionAnswered" @click="setupQuestion">Next</button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'Question',
        computed: mapGetters(['getCurrQuestion', 'isQuestionAnswered']),
        methods: mapActions(['setupQuestion', 'answerQuestion']),
        created() {
            this.setupQuestion();
        }
    }
</script>

<style scoped>

</style>

