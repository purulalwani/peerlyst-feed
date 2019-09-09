// Module to do basic CRUD (create, read, update, delete) operations on a Model
module.exports = function (Model) {
    let crud = {};

    // Create new object from the Model
    crud.create = function (data) {
        let obj = new Model(data);
        return obj.save();
    };


    // Get an object by Id
    crud.get = function (id) {
        return Model.findOne({_id: id}).exec();
    };

    crud.getAll = function () {
        return Model.find().exec();
    };

    crud.getQueryOne = function (query) {
        return Model.findOne(query).exec();
    };

    crud.getQuery = function (query) {
        return Model.find(query).exec();
    };
   

    crud.remove = function (id, callback) {
        crud.get(id, function (err, obj) {
            if (err) return callback(err);
            if (!obj) return callback('Not Found');
            obj.remove(callback);
        });
    };

    crud.update = function(id, newData) {
        return Model.updateOne(id, newData);
    };

    return crud;
};
