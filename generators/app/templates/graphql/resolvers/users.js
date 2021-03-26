const Helper = require('../../util/helpers.js');
const MainModel = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

const belongTo = [''];
const fieldsArray = ['username', 'email', 'password'];
const HasMany = [];
const timeDaley = 0;

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username
		},
		process.env.SECRET_KEY,
		{ expiresIn: '1h' }
	);
}

module.exports = {
	Query: {
		async UserWhere(_, params, context) {
			try {
				return Helper.Find(MainModel, params, belongTo, timeDaley);
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async updateUser(_, {
			input: {
				id,
				username,
				email,
				password,
			}
		}, context) {
			try {
				if (password !== '' && password !== undefined) password = await bcrypt.hash(password, 12);
				let item;
				const now = new Date().toISOString();
				if (!id || id.includes('new')) {
					item = new MainModel({ createdAt: now });
				} else {
					item = await MainModel.findById(id);
				}
				if (item) {
					if (username !== undefined) item.username = username;
					if (email !== undefined) item.email = email;
					if (password != '') item.password = password;
					item.updatedAt = now;
					await item.save();
					return item;
				} else {
					throw new Error('no item');
				}
			} catch (err) {
				throw new Error(err);
			}
		},

		async deleteUser(_, { input: params }, context) {
			try {
				return Helper.Delete(MainModel, params, timeDaley);
			} catch (err) {
				throw new Error(err);
			}
		},

		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await MainModel.findOne({ username });

			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong crendetials';
				throw new UserInputError('Wrong crendetials', { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token
			};
		},
		async register(
			_,
			{
				registerInput: { username, email, password, confirmPassword }
			}
		) {
			// Validate user data
			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			// TODO: Make sure user doesnt already exist
			const user = await MainModel.findOne({ username });
			if (user) {
				throw new UserInputError('Username is taken', {
					errors: {
						username: 'This username is taken'
					}
				});
			}
			// hash password and create an auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new MainModel({
				email,
				username,
				password,
				createdAt: new Date().toISOString()
			});

			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token
			};
		}
	}
};
