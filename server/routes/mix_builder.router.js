const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/item/search', (req, res) => {
    console.log('XXXXXXXXXXXXXXXX',req.query.item);
  const queryText = `SELECT * FROM items WHERE "type_description" LIKE('%${req.query.item}%') LIMIT 7;`;
  pool.query(queryText,)
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});
router.get('/item/type', (req, res) => {
  const queryText = `SELECT * FROM items WHERE "item_type_id" = 2;`;
  pool.query(queryText)
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});
// router that grabs all items from DB based of a given string value
router.get('/item', (req, res) => {
    console.log('XXXXXXXXXXXXXXXX',req.query.item);
  const queryText = `SELECT * FROM items WHERE "type_description" LIKE('%${req.query.item}%');`;
  pool.query(queryText,)
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});
router.get('/mixItems', (req, res) => {
  const queryText = `SELECT items_in_mix.id, mix_id, item_id, item_size, items.name, items.price_per_lb
                      FROM "items_in_mix"
                      JOIN mix ON mix.id = items_in_mix.mix_id
                      JOIN items ON items.id = items_in_mix.item_id
                      WHERE mix_id = $1;`;
  pool.query(queryText,[req.query.mixId])
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});
router.get('/:mixId', (req, res) => {
  const queryText = `SELECT id, proportion FROM items_in_mix WHERE mix_id = $1;`;
  pool.query(queryText,[req.params.mixId])
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
  // POST route code here 
  const queryText = `INSERT INTO "items_in_mix" ("mix_id", "item_id","item_size") VALUES  ($1, $2, 2);`
    console.log(req.body)
    pool.query(queryText, [req.body.mix_id, req.body.item_id])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

router.put('/proportion', (req, res) => {
  // POST route code here 
  const queryText = `UPDATE items_in_mix SET item_size = $1 WHERE id = $2; `
    console.log(req.body)
    pool.query(queryText, [req.body.value, req.body.id])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});
router.delete('/:id', (req, res) => {
  // DELETE route code here
  if (req.isAuthenticated()){
    const queryText = `DELETE FROM "items_in_mix" WHERE ("mix_id", "item_id") = ($1, $2);`;
    console.log('in Delete router', req.query.item_id);
    pool.query(queryText, [req.params.id, req.query.item_id])
    .then( (result) => {
      res.sendStatus(200);
    })
    .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
  } else {
      alert ("not today buddy")
  }
});

module.exports = router;