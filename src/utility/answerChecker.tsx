import { Options } from '../type-aliases/type';

const answerChecker = (option: Options, selected: Options) => {
	if (selected.isRight && selected.answer === option.answer) {
		return 'select';
	} else if (selected.isRight === false && selected.answer === option.answer) {
		return 'wrong';
	} else if (selected.isRight === false && option.isRight) {
		return 'select';
	}
};

export default answerChecker;
