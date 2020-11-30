const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/info/:id', (req, res) => {
  const queryText = `SELECT * FROM "mix" WHERE id = $1;`;
  pool.query(queryText,[req.params.id])
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});

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
      console.log('GET all mixes from order', result.rows);
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});

router.get('/:mixId/:mixSizeId', (req, res) => {
    console.log('in get size', req.params);
  const queryText = `SELECT mix_size.mix_size
                        FROM "mix"
                        JOIN mix_size ON mix_size.id = mix.mix_size_id
                        WHERE mix.id = $1 AND mix_size_id = $2;`;
  pool.query(queryText, [req.params.mixId, req.params.mixSizeId])
  .then((result) => {
      console.log('GET mix_size', result.rows[0]);
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
    const queryText = `INSERT INTO "mix" ("order_id", "mix_size_id", "name") VALUES ($1, $2, $3);`
    console.log('POST new mix with',req.body)
    pool.query(queryText, [req.body.order_id, req.body.mix_size_id, req.body.name])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});
router.delete('/:id', (req, res) => {
  // code here
  console.log('in delete order', req.params.id)
  const queryText = `DELETE FROM "mix" WHERE "id" = $1;` 
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
