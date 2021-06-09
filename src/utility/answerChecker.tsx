import { Options } from '../type-aliases/type';
import { ClassNameMap } from '@material-ui/styles';

const answerChecker = (
	option: Options,
	selected: Options,
	classes: ClassNameMap,
) => {
	if (selected.isRight && selected.answer === option.answer) {
		return classes.select;
	} else if (selected.isRight === false && selected.answer === option.answer) {
		return classes.wrong;
	} else if (selected.isRight === false && option.isRight) {
		return classes.select;
	}
};

export default answerChecker;
