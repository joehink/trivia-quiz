<template>
    <div v-if="getCurrQuestion">
        <h3 v-html="getCurrQuestion.question.question"></h3>
        <div v-if="isCorrect">Good job you got it right!</div>
        <div v-if="isIncorrect">Oh no! You got it wrong.</div>
        <button 
            v-for="(answer, index) in getCurrQuestion.question.answers" 
            :key="answer"
            :value="answer"
            :class="answer === selectedAnswer ? 'selected' : 'button'"
            @click="selectAnswer"
        >
            {{ `${index + 1}. ${answer}` }}
        </button>
        <button :disabled="isQuestionAnswered" @click="answerQuestion(selectedAnswer)">Submit</button>
        <button :disabled="!isQuestionAnswered" @click="setupQuestion">Next</button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'Question',
        data() {
            return {
                selectedAnswer: null
            }
        },
        computed: mapGetters(['getCurrQuestion', 'isQuestionAnswered', 'isCorrect', 'isIncorrect']),
        methods: {
            ...mapActions(['setupQuestion', 'answerQuestion']),
            selectAnswer(event) {
                const answer = event.target.value;
                this.selectedAnswer = answer;
            }
        },
        created() {
            this.setupQuestion();
        }
    }
</script>

<style scoped>
    .selected {
        background-color: green;
    }
</style>

