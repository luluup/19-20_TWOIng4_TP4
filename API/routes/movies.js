var express = require('express');
var router = express.Router();

const _ = require('lodash');
const axios = require('axios').default;

//Lien documentation POSTMAN
//https://web.postman.co/collections/9570671-c3db6332-9494-4c66-a199-70fdfec9c598?version=latest&workspace=7000658a-601c-453e-83e0-6f99acc7919d

let mesMovies = [];


/* GET tous les films. */
router.get('/', (req, res) => {
  // Get List of film and return JSON
  res.status(200).json({ mesMovies });
});

/* GET un film par son id. */
router.get('/:id', (req, res) => {

  const { id } = req.params;
  const monfilm = _.find(mesMovies, ['id', id])

  // Get List of film and return JSON
  res.status(200).json({
    message: 'Film trouvé : ',
    monfilm
  });
});

/* PUT un film via nom. */
router.put('/', (req, res) => {
  // Get the data from request from request
  const { name } = req.body;
  // Create new unique id
  const id = _.uniqueId();

  axios({

    method: 'get',
    url: `http://www.omdbapi.com/?t=${name}&apikey=ecfcb1b6`,
    responseType: 'json'

  })

    .then(function (response) {

      console.log(response.data);
      maData = response.data;
      mesMovies.push({ maData, id });
      res.status(200).json({

        message: `Film ajoute ${id}`,
        monfilm: { maData }
      });

    });

});


/* UPDATE un film via son id. */
router.post('/:id', (req, res) => {
  console.log(req.body.id);
  console.log(req.body.name);

  // Get the :id of the user we want to update from the params of the request
  const { id } = req.params;
  // Get the new data of the user we want to update from the body of the request
  const { name } = req.body;
  // Find in DB
  const filmToUpdate = _.find(mesMovies, ["id", id]);
  // Update data with new data (js is by address)
  filmToUpdate.name = name;

  // Return message
  res.json({
    message: `Just updated ${id} with ${name}`
  });
});

/* DELETE un film via son id. */
router.delete('/:id', (req, res) => {
  // Get the :id of the user we want to delete from the params of the request
  const id = req.params.id;

  console.log(req.params);

  // Remove from "DB"
  _.remove(mesMovies, ["id", id]);

  // Return message
  res.json({
    message: `Film just removed ${id}`
  });
});

module.exports = router;  