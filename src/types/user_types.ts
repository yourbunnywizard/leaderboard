// Список можливих кольорів
export enum Color {
	RED,
	GREEN,
	BLUE,
}

// Користувач. Позиція в рейтинговій таблиці визначається позицією в
// масиві користувачів
export interface User {
	// Улюблений колір
	color: Color;
	// Повне ім'я
	name: string;
	// Швидкість заїзду
	speed: number;
	// Час заїзду. Виражено в мілісекундах
	time: number;
}
