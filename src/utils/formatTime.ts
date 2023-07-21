export function formatTime(milliseconds: number) {
	const minutes = Math.floor(milliseconds / (1000 * 60))
		.toString()
		.padStart(2, '0');
	const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
		.toString()
		.padStart(2, '0');
	const ms = (milliseconds % 1000).toString().slice(-3).padStart(3, '0');

	return `${minutes}:${seconds}.${ms}`;
}
