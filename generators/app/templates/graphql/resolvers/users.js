const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
	validateRegisterInput,
	validateLoginInput
} = require('../../util/validators');
const User = require('../../models/User');

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
        async users() {
            try {
                const users = await User.find().sort({ createdAt: -1 });//g-key populate
                return users;
            } catch (err) {
                throw new Error(err);
            }
        },
        async user(_, { id }) {
            try {
                const user = await User.findById(id);//g-key populate
                if (user) {
                    user.password = ''
                    return user;
                } else {
                    throw new Error('User not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
	},
	Mutation: {
		async updateUser(_, {
			id,
			username,
			email,
			password,
		}, context) {
			try {
                if (password != '') password = await bcrypt.hash(password, 12);
                let item;
				if (!id || id === 'new') {
					item = new User({
						email,
						username,
						password,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString()
					});
					//g-key after new
				} else {
					item = await User.findById(id);
					if (username !== undefined) item.username = username;
					if (email !== undefined) item.email = email;
					if (password != '') item.password = password;
					item.updatedAt = new Date().toISOString();
                }
                await item.save();
				return item.id;
			} catch (err) {
				throw new Error(err);
			}
		},

		async deleteUser(_, { id }, context) {
			try {
				const del = await User.findById(id);
				await del.delete();
				return 'deleted successfully';
			} catch (err) {
				throw new Error(err);
			}
		},

		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ username });

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
			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError('Username is taken', {
					errors: {
						username: 'This username is taken'
					}
				});
			}
			// hash password and create an auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
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
