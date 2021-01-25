const checkAuth = require('./check-auth');
const Estimate = require('../graphql/models/Estimate');

module.exports = {
	estimate(item, name, like, context) {
        if (like.length > 0){
            if (like[0].owner === ''){
                const u = checkAuth(context);
                if(item[name].filter(i => i.owner == u.id).length !== 0){
                    if(item[name].find(i => i.owner == u.id).value == like[0].value){
                        item[name] = item[name].filter((i) => i.owner != u.id);
                    } else {
                    let index = item[name].findIndex( i => i.owner == u.id);
                        item[name][index].value = like[0].value;
                    }
                } else {
                    const newEst = new Estimate({owner: u.id, value: like[0].value});
                    item[name] = item[name].concat(newEst);
                }
            }
        }
    },
    location(item, name, location, _) {
        if (location.coordinates[0] !== undefined && location.coordinates[1] !== undefined) {
            item[name] = { type: "Point", coordinates: [parseFloat(location.coordinates[0]), parseFloat(location.coordinates[1])] }
        }
    }
};