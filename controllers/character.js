const Character = require('../models/Character')

exports.get = async (req, res, next) => {
	const character = await Character.findById(req.params.id)
	if (character)
		res.send({ character })
}

exports.getList = async (req, res, next) => {
	res.send({
		characters: await Character.find({ owner: req.user._id })
	})
}
