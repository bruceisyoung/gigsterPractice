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

export function logout() {
	return {
		type: 'LOGOUT'
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

export function showCreatePanel() {
	return {
		type: 'SHOWCREATEPANEL'
	}
}

export function hideCreatePanel() {
	return {
		type: 'HIDECREATEPANEL'
	}
}

export function saveExpense(username, datetime, cost, description) {
	return {
		type: 'SAVEEXPENSE',
		username: username,
		datetime: datetime,
		cost: cost,
		description: description
	}
}

export function fetchExpense(username) {
	return {
		type: 'FETCHEXPENSE',
		username: username
	}
}

export function updateExpenseDatabase(expenses) {
	return {
		type: 'UPDATEEXPENSEDATABASE',
		expenses: expenses
	}
}