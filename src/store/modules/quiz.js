import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

import { router } from '../../main';

const state = {
    details: {
        category: '',
        numberOfQuestions: 1,
    },
    questions: [],
    correctQuestions: [],
    incorrectQuestions: [],
    currQuestion: {
        question: null,
        isCorrect: false,
        isIncorrect: false
    }
};

const getters = {
    getCurrQuestion: state => state.currQuestion,
    getResults: state => `${state.correctQuestions.length}/${state.details.numberOfQuestions}`,
    isQuestionAnswered: state => state.currQuestion.isCorrect || state.currQuestion.isIncorrect,
    isCorrect: state => state.currQuestion.isCorrect,
    isIncorrect: state => state.currQuestion.isIncorrect,
    getNumberOfQuestions: state => state.details.numberOfQuestions
};

const mutations = {
    setQuizDetails: (state, details) => {
        Vue.set(state, 'details', details)
    },
    setQuestions: (state, questions) => {
        Vue.set(state, 'questions', questions);
    },
    setCurrQuestion: (state, question) => {
        Vue.set(state.currQuestion, 'question', question);
        Vue.set(state.currQuestion, 'isCorrect', false);
        Vue.set(state.currQuestion, 'isIncorrect', false);
    },
    setQuestionAnswer: (state, answer) => {
        if (state.currQuestion.question.correct_answer === answer) {
            const correctQuestions = [...state.correctQuestions, state.currQuestion];
            Vue.set(state, 'correctQuestions', correctQuestions)
            Vue.set(state.currQuestion, 'isCorrect', true);
            Vue.set(state.currQuestion, 'isIncorrect', false);
        } else {
            const incorrectQuestions = [...state.incorrectQuestions, state.currQuestion];
            Vue.set(state, 'incorrectQuestions', incorrectQuestions);
            Vue.set(state.currQuestion, 'isCorrect', false);
            Vue.set(state.currQuestion, 'isIncorrect', true);
        }
    }
};

const actions = {
    setupQuiz: async ({ commit }, event) => {
        // Save details of quiz to state
        commit('setQuizDetails', {
            category: event.target.innerText,
            numberOfQuestions: 10
        })

        // Create query string for api request
        const query = qs.stringify({
            category: event.target.value,
            amount: 10,
            type: 'multiple'
        })

        //Fetch questions from API
        const response = await axios.get(`https://opentdb.com/api.php?${query}`);

        // Add numbers to questions
        const numberedQuestions = response.data.results.map((question, index) => {
            question.number = index + 1;
            question.answers = [...question.incorrect_answers, question.correct_answer].sort();
            return question;
        })

        // Save questions to state
        commit('setQuestions', numberedQuestions);

        // Navigate to first question;
        router.push('/question');
    },
    setupQuestion: ({ commit, rootState }) => {
        const { correctQuestions, incorrectQuestions, questions } = rootState.quiz;
        const { numberOfQuestions } = rootState.quiz.details;

        if ((correctQuestions.length + incorrectQuestions.length) === numberOfQuestions) {
            router.push('/results')
        } else {
            const question = questions.shift();

            commit('setCurrQuestion', question);
            commit('setQuestions', questions);
        }    
    },
    answerQuestion: ({ commit }, answer) => {
        commit('setQuestionAnswer', answer);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}

