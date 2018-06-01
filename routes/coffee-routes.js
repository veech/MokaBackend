const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/:cupId', (req, res) => {
	User.findOne({
		cups: {
			$elemMatch: {
				uid: req.params.cupId
			}
		}
	})
		.then(doc => {
			if (!doc) return res.send({ error: 'No cup found' });

			res.send(doc.prefs[0]);
		})
		.catch(err => {
			res.send(err);
		});
});

module.exports = router;