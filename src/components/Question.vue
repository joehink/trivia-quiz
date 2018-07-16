<template>
    <div v-if="getCurrQuestion">
        {{ `${getCurrQuestion.question.number} / ${getNumberOfQuestions}` }}
        <h3 v-html="getCurrQuestion.question.question"></h3>
        <div v-if="isCorrect">Good job you got it right!</div>
        <div v-if="isIncorrect">Oh no! You got it wrong.</div>
        <button 
            v-for="(answer, index) in getCurrQuestion.question.answers" 
            :key="answer"
            :value="answer"
            v-html="`${index + 1}. ${answer}`"
            :class="answer === selectedAnswer ? 'selected' : 'button'"
            @click="selectAnswer"
        >
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
        computed: mapGetters([
            'getCurrQuestion', 
            'isQuestionAnswered', 
            'isCorrect', 
            'isIncorrect', 
            'getNumberOfQuestions'
            ]),
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

