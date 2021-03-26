const checkAuth = require('./check-auth');

const timeout = ms => new Promise(res => setTimeout(res, ms))

module.exports = {
    async Find(Model, params = {}, belongTo = [], delayTime = 0) {
        if (delayTime !== 0) await timeout(delayTime);
        const keys = Object.keys(params).length;
        const belongParams = (keys === 0) ? {} : Object.fromEntries(new Map(belongTo.map(i => [i, params[i]])));
        let items = await Model.find(belongParams).sort({ createdAt: 1 });
        return items;
    },

    async Update(Model, params = {}, fieldsArray = [], hasMany = [], delayTime = 0) {
        if (delayTime !== 0) await timeout(delayTime);
        let item;
        const now = new Date().toISOString();
        if (!params.id || params.id.includes('new')) {
            item = new Model({ createdAt: now });
            // Change parent
            hasMany.forEach(async fields => {
                let prevKey = Object.fromEntries(new Map([[fields.parentKey, params.id]]));
                let newKey = Object.fromEntries(new Map([[fields.parentKey, item.id]]));
                await fields.model.updateMany(prevKey, newKey);
            });
        } else {
            item = await Model.findById(params.id);
        }
        if (item) {
            fieldsArray.forEach(field => {
                if (params[field] !== undefined) item[field] = params[field];
            });
            item.updatedAt = now;
            await item.save();
            return item;
        } else {
            throw new Error('no item');
        }
    },

    async Delete(Model, params = {}, delayTime = 0) {
        if (delayTime !== 0) await timeout(delayTime);
        if (!params.id) return 'delete error';
        if (params.id.includes('new')) return 'delete error 2';
        const itemToDelete = await Model.findById(params.id);
        if (itemToDelete) await itemToDelete.delete();
        return params;
    },

    async UpdateEstimate(Model, params = {}, belongTo = [], fieldsArray = [], hasMany = [], context, delayTime = 0) {
        // check user id
        if (checkAuth(context).id !== params.userId) throw new Error('wrong user session');

        // can have only one item per user
        const keys = Object.keys(params).length;
        const belongParams = (keys === 0) ? {} : Object.fromEntries(new Map(belongTo.map(i => [i, params[i]])));
        belongParams.userId = params.userId;
        let hasItems = await Model.find(belongParams);
        if (hasItems.length !== 0) return hasItems[0];

        // update
        return await this.Update(Model, params, fieldsArray, hasMany, delayTime);
    },

    location(item, name, location, _) {
        if (location.coordinates[0] !== undefined && location.coordinates[1] !== undefined) {
            item[name] = { type: "Point", coordinates: [parseFloat(location.coordinates[0]), parseFloat(location.coordinates[1])] }
        }
    }
};