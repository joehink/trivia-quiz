<template>
    <div class="container" v-if="!!getQuestion">
        <div class="box">
            <span class="question-number">{{ `${getQuestion.number} / ${getQuestionDetails.numberOfQuestions}` }}</span>   
            <h1>{{ getQuestionDetails.category }}</h1>
            <h3 v-html="getQuestion.question"></h3>
            <div class="answers">
                <div class="message">
                    <div class="alert correct" v-if="isCorrect">Good job you got it right!</div>
                    <div class="alert incorrect" v-if="isIncorrect">Oh no! You got it wrong.</div>
                </div>
                <div 
                    :class="answer === selectedAnswer ? 'selected' : 'answer'" 
                    v-for="(answer, index) in getQuestion.answers" 
                    :key="answer"
                >
                    <span>{{ `${index + 1}.` }}</span>
                    <button 
                        :value="answer"
                        v-html="answer"
                        @click="selectAnswer"
                    ></button>
                </div>
            </div>
            <div class="question-action">
                <button v-if="!isQuestionAnswered" class="button" @click="answerQuestion(selectedAnswer)">Submit</button>
                <button v-if="isQuestionAnswered" class="button" @click="nextQuestion">Next</button>
            </div>
        </div>
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
                'getQuestion',
                'isCorrect',
                'isIncorrect', 
                'isQuestionAnswered', 
                'getQuestionDetails'
            ]),
        methods: {
            ...mapActions(['nextQuestion', 'answerQuestion']),
            selectAnswer(event) {
                const answer = event.target.value;
                this.selectedAnswer = answer;
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .box {
        background-color: white;
        padding: 2em;
        box-shadow: 0 0 50px rgba(50,50,50,0.75)
    }
    .question-number {
        position: absolute;
    }
    h1 {
        background-color: #4f5b66;
        color: transparent;
        text-shadow: 2px 2px 3px rgba(255,255,255,0.5);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
    }
    h3 {
        margin: 25px 0;
        font-size: 1.5em;
        width: 600px;
        text-align: center;
    }
    .answers {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 0 auto 25px;
    }
    .answer, .selected {
        border: 2px solid #4f5b66;
        border-top: none;
        display: flex;
        background-color: #65737e;
        color: white;
    }
    .answer:nth-child(2), .selected:nth-child(2)  {
        border: 2px solid #4f5b66;
    }
    .answer button, .selected button {
        border: none;
        font-size: 1em;
        outline: none;
        width: 100%;
        height: 100%;
        text-align: left;
        padding: 10px;
        background-color: transparent;
        color: white;
        cursor: pointer;
    }
    .answers span {
        align-self: center;
        padding: 0 .25em 0 1em;
    }
    .question-action {
        text-align: center;
    }
    .button {
        display: inline-block;
        padding: 5px;
        font-size: 20px;
    }
    .selected, .selected button {
        background-color: #c0c5ce;
        color: black;
    }
    .alert {
        padding: 10px;
        text-align: center;
    }
    .correct {
        background-color: green;
        color: white;
    }
    .incorrect {
        background-color: red;
        color: white;
    }
    .message {
        min-height: 36px;
    }
</style>

