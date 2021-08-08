import React, { useReducer, createContext, useContext, Dispatch } from 'react';
import QuizData from '../data/Quizdata';
import { Options, Quiz } from '../type-aliases/type';
import CalculateScore from '../utility/calculateScore';

type IntialState = {
	title: TITLE[],
	quizData: Quiz[]
	currentQuestion: number;
	currentScore: number;
	showQuiz: boolean;
	timer: Number;
	selected: Options;
	isSelected: Boolean;
	showRules: Boolean;
	token: String;
};

const intialState: IntialState = {
	title: [],
	quizData: [],
	currentQuestion: 0,
	currentScore: 0,
	showQuiz: true,
	timer: 10,
	selected: {
		answer: '',
		isRight: null,
	},
	isSelected: false,
	showRules: true,
	token: '',
};

type PAYLOAD = {
	opt: Options;
	id: string;
};

type ID = {
	id: string;
};

type TITLE = {
	quizName: String
}


type ACTIONS =
	| {type: 'TITLE', payload: TITLE[]}
	| { type: 'ADD_QUIZ'; payload: Quiz[]}
	| { type: 'SET_SCORE'; payload: PAYLOAD }
	| { type: 'RESET' }
	| { type: 'TIMER'; payload: ID }
	| { type: 'SET_NEXTQUES'; payload: ID }
	| { type: 'SET_PREVQUES'; payload: ID }
	| { type: 'SET_START_QUIZ', payload: ID }
	| { type: 'SET_TOKEN'; payload: String};

const QuizContext = createContext<{
	state: IntialState;
	dispatch: Dispatch<ACTIONS>;
}>({
	state: intialState,
	dispatch: () => null,
});

export const QuizProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(ReducerQuiz, intialState);

	return (
		<QuizContext.Provider value={{ state, dispatch }}>
			{children}
		</QuizContext.Provider>
	);
};

export const useQuiz = () => {
	return useContext(QuizContext);
};

const ReducerQuiz = (state: IntialState, actions: ACTIONS) => {
	switch (actions.type) {
		case 'TITLE':
			return{
				...state,
				title: actions.payload
			}
		case 'ADD_QUIZ':
			console.log(actions.payload, "payload")
			return {
				...state,
				quizData: actions.payload
			}
		case 'SET_SCORE':
			const score = CalculateScore(
				state.currentScore,
				state.quizData[parseInt(actions.payload.id, 10)].questions[
					state.currentQuestion
				],
				actions.payload.opt,
			);

			return {
				...state,
				selected: actions.payload.opt,
				isSelected: true,
				currentScore: score,
			};

		case 'SET_NEXTQUES':
			const nextQues = state.currentQuestion + 1;
			if (
				nextQues <
				state.quizData[parseInt(actions.payload.id, 10)].questions.length
			) {
				return {
					...state,
					currentQuestion: nextQues,
					selected: { ...state.selected, isRight: null },
					isSelected: false,
					timer: +state.quizData[+actions.payload.id].questions[nextQues].time,
				};
			} else {
				return {
					...state,
					isSelected: false,
					showQuiz: false,
				};
			}

		case 'SET_PREVQUES':
			const prevQues = state.currentQuestion - 1;
			if (prevQues >= 0) {
				return {
					...state,
					currentQuestion: prevQues,
					selected: { ...state.selected, isRight: null },
					isSelected: false,
					timer: +state.quizData[+actions.payload.id].questions[prevQues].time,
				};
			} else {
				return {
					...state,
				};
			}

		case 'RESET':
			return {
				...state,
				currentQuestion: 0,
				currentScore: 0,
				timer: 10,
				selected: { ...state.selected, isRight: null },
				isSelected: false,
				// showQuiz: true,
				showRules: true,
				token: '',
			};

		case 'SET_START_QUIZ':
			return {
				...state,
				showRules: false,
				showQuiz: true,
				timer: +state.quizData[+actions.payload.id].questions[0].time,
			};

		case 'TIMER':
			if (state.timer === 0) {
				const nextQues = state.currentQuestion + 1;
				console.log(nextQues, "next ques")
				if (
					nextQues <
					state.quizData[parseInt(actions.payload.id, 10)].questions.length
				) {
					return {
						...state,
						currentQuestion: nextQues,
						selected: { ...state.selected, isRight: null },
						isSelected: false,
						timer: +state.quizData[+actions.payload.id].questions[nextQues].time,
					};
				} else {
					return {
						...state,
						showQuiz: false,
					};
				}
			}
			return { ...state, timer: +state.timer - 1 };
			// return { ...state };

		case 'SET_TOKEN':
			return { ...state, token: actions.payload };

		default:
			return { ...state };
	}
};
