const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/items', (req, res) => {
  const queryText = `SELECT * FROM "items";`;
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
/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;