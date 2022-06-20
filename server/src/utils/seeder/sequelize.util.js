module.exports.bulkCreate = (db, Model, modelArray) => {
  Model.bulkCreate(modelArray, {
    ignoreDuplicates: true,
    logging: false,
  }).catch((err) => {
    console.log(err);
  });
};
