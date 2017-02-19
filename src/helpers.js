import moment from 'moment';

export function checkUsername(str) {
	let usernameRegex = /^[a-zA-Z0-9]+$/;
	return str.match(usernameRegex);
}

export function checkPassword(str) {
	let passwordRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})");
	return str.match(passwordRegex);
}

export function analyzeData(dataset, startDate, endDate) {
	let index = 0;
	let report = {};
	let reportData = [];
	
	// analyze data one by one
	while (index < dataset.length) {
		let currentMoment = moment(dataset[index].datetime);

		// get the lower boundry of the date range expense being analyzed falls in
		while(currentMoment > startDate.add(6, 'days')) {
			startDate.add(1, 'days');
		}
		startDate.subtract(6, 'days');

		// classify expense data by the startDate they fall in.
		if (!report[startDate.format('L')]) {
			report[startDate.format('L')] = {}
			report[startDate.format('L')].startDate = moment(startDate);
			report[startDate.format('L')].data = [dataset[index]];
		} else {
			report[startDate.format('L')].data.push(dataset[index]);
		}
		index++;
	}

	// analyze report, get the sum of expense cost within the same stateDate group
	let i = 0;
	let key;
	for (key in report) {
		reportData[i] = {};
		if (i === Object.keys(report).length - 1) {
			reportData[i].dateRange = report[key].startDate.format('L') + ' - ' + (endDate < startDate.add(6, 'days') ? endDate.format('L'): startDate.format('L'));
		} else {
			reportData[i].dateRange = report[key].startDate.format('L') + ' - ' + report[key].startDate.add(6, 'days').format('L');
		}
		reportData[i].totalAmount = report[key].data.reduce((sum, a) => {
			return Number(Math.round(sum + a.amount + 'e2')+'e-2'); 
		}, 0);
		i++;
	}
  
  return reportData;
}