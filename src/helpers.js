export function checkUsername(str) {
	let usernameRegex = /^[a-zA-Z0-9]+$/;
	return str.match(usernameRegex);
}

export function checkPassword(str) {
	let passwordRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})");
	return str.match(passwordRegex);
}