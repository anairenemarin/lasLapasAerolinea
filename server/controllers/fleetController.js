const model = require("../models/Fleet");

module.exports.get = async (req, res, next) => {
  const items = await model.find().exec();
  res.json(items);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const items = await model.findOne({ _id: id }).exec();
  res.json(items);
};

module.exports.create = (req, res, next) => {
  const items = new model({ ...req.body });
  items.save();
  res.json(items);
};

module.exports.delete = async (req, res, next) => {
  const items = await model.findByIdAndRemove(req.params.id);
  // si items es null significa que no existe el registro
  if (items) {
    res.json({ result: `items borrado correctamente`, items });
  } else {
    res.json({ result: "Id de items Invalido Invalid", items });
  }
};

module.exports.update = async (req, res, next) => {
  const items = await model.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body }, // ==> {title: title, body: body}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(items);
};
