import React, { useReducer, createContext, useContext, Dispatch } from 'react';
import QuizData from '../data/Quizdata';
import { Options } from '../type-aliases/type';
import CalculateScore from '../utility/calculateScore';

type IntialState = {
	currentQuestion: number;
	currentScore: number;
	showQuiz: boolean;
	timer: number;
	selected: Options;
};

const intialState: IntialState = {
	currentQuestion: 0,
	currentScore: 0,
	showQuiz: true,
	timer: 10,
	selected: {
		answer: '',
		isRight: null,
	},
};

type PAYLOAD = {
	option: Options;
	id: string;
};

type ID = {
	id: string;
};

type ACTIONS =
	| { type: 'SET_SCORE'; payload: PAYLOAD }
	| { type: 'RESET' }
	| { type: 'TIMER'; payload: ID }
	| { type: 'SET_NEXTQUES'; payload: ID };

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
		case 'SET_SCORE':
			const score = CalculateScore(
				state.currentScore,
				QuizData.quiz[parseInt(actions.payload.id, 10)].questions[
					state.currentQuestion
				],
				actions.payload.option,
			);

			return {
				...state,
				selected: actions.payload.option,
				currentScore: score,
			};

		case 'SET_NEXTQUES':
			const nextQues = state.currentQuestion + 1;
			if (
				nextQues <
				QuizData.quiz[parseInt(actions.payload.id, 10)].questions.length
			) {
				return {
					...state,
					currentQuestion: nextQues,
					selected: { ...state.selected, isRight: null },
					timer: 10,
				};
			} else {
				return {
					...state,
					showQuiz: false,
				};
			}

		case 'RESET':
			return {
				...state,
				currentQuestion: 0,
				currentScore: 0,
				timer: 10,
				showQuiz: true,
			};

		case 'TIMER':
			if (state.timer === 0) {
				const nextQues = state.currentQuestion + 1;
				if (
					nextQues <
					QuizData.quiz[parseInt(actions.payload.id, 10)].questions.length
				) {
					return {
						...state,
						currentQuestion: nextQues,
						timer: 10,
					};
				} else {
					return {
						...state,
						showQuiz: false,
					};
				}
			}
			return { ...state, timer: state.timer - 1 };

		default:
			return { ...state };
	}
};
