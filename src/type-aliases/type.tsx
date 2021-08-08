export type Options = {
	answer: string;
	isRight: boolean | null;
};

export type Questions = {
	question: string;
	point: number;
	time: string;
	code?: string,
	option: Options[];
};

export type Quiz = {
	id: number;
	quizName: string;
	questions: Questions[];
};

export type Quizs = {
	quiz: Quiz[];
};
