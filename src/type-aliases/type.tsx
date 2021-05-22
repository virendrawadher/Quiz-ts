export type Options = {
	answer: string;
	isRight: boolean | null;
};

export type Questions = {
	question: string;
	points: number;
	code: string | null;
	options: Options[];
};

export type Quiz = {
	id: number;
	quizName: string;
	questions: Questions[];
};

export type Quizs = {
	quiz: Quiz[];
};
