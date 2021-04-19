require('dotenv').config();
const { v1: uuidv1 } = require('uuid');
const { assertNamedType } = require('graphql');
const axios = require('axios');


module.exports = {
    Query: {
        async checkPayment(_, { payId }, context) {
            try {
                let payments = await axios.get('https://api.yookassa.ru/v3/payments', {
                    auth: {
                        username: process.env.YA_SHOP_ID,
                        password: process.env.YA_SHOP_SECRET_KEY
                    }
                });
                let payment = payments.data.items.find(p => p.metadata && p.metadata.orderDetails && p.metadata.orderDetails === payId);
                if(payment === undefined) return 'false'
                if(payment.status !== 'succeeded') return 'false'
                return 'true'
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
