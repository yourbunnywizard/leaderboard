import { Color } from 'types/user_types';

export function getColor(color: Color): string {
	let _color: string;
	switch (color) {
		case Color.RED:
			_color = 'red';
			break;
		case Color.GREEN:
			_color = 'green';
			break;
		case Color.BLUE:
		default:
			_color = 'blue';
	}

	return _color;
}
