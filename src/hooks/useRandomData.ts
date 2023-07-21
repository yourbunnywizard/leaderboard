import { useState } from 'react';
import { Color, User } from 'types/user_types';

interface IReturnedData {
	generateUsers: () => Promise<User[]>;
	isLoading: boolean;
}

export const useRandomData = (): IReturnedData => {
	const [isLoading, setIsLoading] = useState(false);
	const DISTANCE = 25;
	let last_min_time = 932000;

	async function generateUsers() {
		setIsLoading(true);

		const users = await new Promise<User[]>((resolve) => {
			setTimeout(() => {
				const users: User[] = [];

				for (let i = 0; i < 50; i++) {
					users.push({
						color: getRandomColor(),
						name: getRandomName(),
						time: last_min_time,
						speed: calculateSpeed(DISTANCE, last_min_time),
					});

					last_min_time += Math.random() * 5;
				}

				setIsLoading(false);
				resolve(users);
			}, 2000);
		});
		return users;
	}

	return {
		isLoading,
		generateUsers,
	};
};

function getRandomColor(): Color {
	return Math.floor((Math.random() * Object.keys(Color).length) / 2);
}

const FIRST_NAMES = [
	'Іван',
	'Олександр',
	'Анна',
	'Олеся',
	'Михайло',
	'Вікторія',
	'Дмитро',
	'Тетяна',
	'Олена',
	'Юлія',
];

const LAST_NAMES = [
	'Петренко',
	'Іванченко',
	'Захарченко',
	'Коваленко',
	'Ткачук',
	'Мороз',
	'Коваль',
	'Коваленко',
	'Шевченко',
	'Остапенко',
];

function getRandomName(): string {
	const randomName =
		FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
	const randomLastName =
		LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

	return `${randomName} ${randomLastName}`;
}

function calculateSpeed(
	distanceInKilometers: number,
	timeInMilliseconds: number
): number {
	const timeInHours = timeInMilliseconds / (1000 * 3600);
	return distanceInKilometers / timeInHours;
}
