const sendEmail = require('./email');


sendEmail(
			'work.kshitij99@gmail.com',
			'Test Subject',
			'This is a test email',
			'<b>This is a test email</b>'
		);


// (async () => {
// 	try {
// 		await sendEmail(
// 			'kshitijraoranjan99@gmail.com',
// 			'Test Subject',
// 			'This is a test email',
// 			'<b>This is a test email</b>'
// 		);
// 	} catch (error) {
// 		console.error(error);
// 		process.exitCode = 1;
// 	}
// })();


