const { createTransport } = require('nodemailer');
const transporter = createTransport({
	name: process.env.SMTP_DOMAIN,
	host: process.env.SMTP_SERVER,
	port: process.env.SMTP_PORT,
	secure: false,
	logger: true,
	debug: true,
	ignoreTLS: true,
});
const transporter2 = createTransport({
	//name: '',
	host: process.env.SMTP_SERVER_AUTH,
	port: process.env.SMTP_PORT_SECURE,
	secure: true,
    auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS,},
	ignoreTLS: false,
    logger: true,
    debug: true,
});

module.exports = {
	async send(from, to, subject, html) {
		const info = await transporter.sendMail({
			from,
			to,
			subject,
			html
		});
		console.log(`Message from ${ JSON.stringify(from) } to ${ JSON.stringify(to) } with subject ${ JSON.stringify(subject) } successfully sent, info: ${ JSON.stringify(info) }`);
		return info;
	},
    async sendAuth(from, to, subject, html) {
		const info = await transporter2.sendMail({
			from,
			to,
			subject,
			html
		});
		console.log(`Message from ${ JSON.stringify(from) } to ${ JSON.stringify(to) } with subject ${ JSON.stringify(subject) } successfully sent, info: ${ JSON.stringify(info) }`);
		return info;
	},
};
