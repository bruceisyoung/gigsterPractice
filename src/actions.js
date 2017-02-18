export function signUp(username, password) {
	return {
		type: 'SIGNUP',
		username: username,
		password: password
	}
}

export function login(username, password) {
	return {
		type: 'LOGIN',
		username: username,
		password: password
	}
}

export function switchToLogin() {
	return {
		type: 'SWITCHTOLOGIN'
	}
}

export function switchToSignUp() {
	return {
		type: 'SWITCHTOSIGNUP'
	}
}

export function authSucceed(username, isAdmin) {
	return {
		type: 'AUTHSUCCEED',
		username: username,
		isAdmin: isAdmin
	}
}

export function authFail(text) {
	return {
		type: 'AUTHFAIL',
		errorMessage: text
	}
}