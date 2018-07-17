import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

import { router } from '../../main';

const state = {
    details: {
        category: '',
        numberOfQuestions: 1,
    },
    token: '',
    questions: [],
    correctQuestions: [],
    incorrectQuestions: [],
    currQuestion: {
        index: 0,
        isCorrect: false,
        isIncorrect: false
    }
};

const getters = {
    getQuestion: state => state.questions[state.currQuestion.index],
    isCorrect: state => state.currQuestion.isCorrect,
    isIncorrect: state => state.currQuestion.isIncorrect,
    getResults: state => `${state.correctQuestions.length}/${state.details.numberOfQuestions}`,
    isQuestionAnswered: state => state.currQuestion.isCorrect || state.currQuestion.isIncorrect,
    getQuestionDetails: state => state.details
};

const mutations = {
    setQuizDetails: (state, details) => {
        Vue.set(state, 'details', details)
    },
    setQuestions: (state, questions) => {
        Vue.set(state, 'questions', questions);
    },
    setCurrQuestion: (state, newIndex) => {
        Vue.set(state.currQuestion, 'index', newIndex);
        Vue.set(state.currQuestion, 'isCorrect', false);
        Vue.set(state.currQuestion, 'isIncorrect', false);
    },
    setQuestionAnswer: (state, answer) => {
        if (state.questions[state.currQuestion.index].correct_answer === answer) {
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
    },
    reset: state => {
        Vue.set(state, 'correctQuestions', []);
        Vue.set(state, 'incorrectQuestions', []);
        Vue.set(state, 'currQuestion', {index: 0, isCorrect: false, isIncorrect: false});
    },
    setToken: (state, token) => Vue.set(state, 'token', token)
};

const actions = {
    setupQuiz: async ({ commit, rootState }, event) => {
        function fetchQuestions(token) {
            // Create query string for api request
            let query = qs.stringify({
                category: event.target.value,
                amount: 10,
                token: token,
                type: 'multiple'
            })
            return axios.get(`https://opentdb.com/api.php?${query}`);
        }

        commit('reset');
        // Save details of quiz to state
        commit('setQuizDetails', { category: event.target.innerText, numberOfQuestions: 10 });

        let token = rootState.quiz.token;
        if(!token) {
            const tokenResponse = await axios.get('https://opentdb.com/api_token.php?command=request');
            commit('setToken', tokenResponse.data.token);
        }
        //Fetch questions from API
        let response = await fetchQuestions(token);
        if (response.data.response_code === 4 || response.data.response_code === 3) {
            const resetResponse = await axios.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
            commit('setToken', resetResponse.data.token);
            response = await fetchQuestions(token);
        }
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
    nextQuestion: ({ commit, rootState }) => {
        const { correctQuestions, incorrectQuestions } = rootState.quiz;
        const { numberOfQuestions } = rootState.quiz.details;

        if ((correctQuestions.length + incorrectQuestions.length) === numberOfQuestions) {
            router.push('/results')
        } else {
            const questionIndex = rootState.quiz.currQuestion.index + 1;
            commit('setCurrQuestion', questionIndex);
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
};

