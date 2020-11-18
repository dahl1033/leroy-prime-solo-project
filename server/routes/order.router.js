const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  
  const queryText = `SELECT * FROM "order" WHERE "comp_status"= FALSE LIMIT 1;`;
  pool.query(queryText)
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // code here
  const queryText = `INSERT INTO "order" ("user_id")  VALUES (${req.body.id});`
    console.log(req.body)
    pool.query(queryText)
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;