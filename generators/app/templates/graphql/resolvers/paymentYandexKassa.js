require('dotenv').config();
const uuidv1 = require('uuid/v1');
const { assertNamedType } = require('graphql');
const yandexKassa = require('yandex-checkout');

module.exports = {
    Query: {
        async check_payment(_, { payId }, context) {
            try {
                let payment = { error: { code: "empty" } };
                if (payId === undefined || payId === '') return JSON.stringify(payment);
                const yandexCheckout = require('yandex-checkout')({
                    shopId: process.env.YA_SHOP_ID,
                    secretKey: process.env.YA_SHOP_SECRET_KEY,
                    debug: false,
                });
                try {
                    payment = await yandexCheckout.getPayment(payId);
                } catch (err) {
                    payment = err;
                }

                return JSON.stringify(payment);
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {

        async makePayment(_, { payId, sum }, context) {
            try {

                //const yandexCheckout = yandexKassa({ shopId: process.env.YA_SHOP_ID, secretKey: process.env.YA_SHOP_SECRET_KEY });
                const yandexCheckout = require('yandex-checkout')({
                    shopId: process.env.YA_SHOP_ID,
                    secretKey: process.env.YA_SHOP_SECRET_KEY,
                    debug: false,
                });
                const idempotenceKey = uuidv1();

                const payment = await yandexCheckout.createPayment({
                    "amount": {
                        "value": sum,
                        "currency": "RUB"
                    },
                    'confirmation': {
                        'type': 'embedded',
                    },
                    'description': payId,
                }, idempotenceKey);

                return JSON.stringify(payment);
            } catch (err) {
                throw new Error(err);
            }
        },
    }
};
