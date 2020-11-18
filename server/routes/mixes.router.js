const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "mix_size";`;
  pool.query(queryText)
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});

router.get('/:id', (req, res) => {
  const queryText = `SELECT * FROM "mix" WHERE "order_id" = $1;`;
  pool.query(queryText, [req.params.id])
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
    const queryText = `INSERT INTO "mix" ("order_id", "mix_size_id") VALUES ($1, $2);`
    console.log(req.body)
    pool.query(queryText, [req.body.order_id, req.body.mix_size_id])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
