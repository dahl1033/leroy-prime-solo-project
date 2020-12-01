const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router that GETs order info based of order id selected
router.get('/order/info/:id', (req, res) => {
  console.log('hereeeee', req.params);
  const queryText = `SELECT * FROM "order" WHERE id = $1 LIMIT 1;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
      console.log('in get order info', result.rows);
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query get('/:id')${err}`);
      res.sendStatus(500);
  })
});

// router that GETs order information based of boolean value
router.get('/orders', (req, res) => {
  console.log('in get orders gen', req.query.type, req.query.user_id);
  const queryText = `SELECT * FROM "order" WHERE "comp_status"= $1 AND user_id = $2;`;
  pool.query(queryText, [req.query.type, req.query.user_id])
  .then((result) => {
      res.send(result.rows)
  })
  .catch((err) => {
      console.log(`Error on query ${err}`);
      res.sendStatus(500);
  })
});

// router that POSTs new order into order table
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "order" (user_id, name)  VALUES ($1, $2);`
    console.log('in post order',req.body)
    pool.query(queryText, [req.body.id, req.body.name])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});
router.put('/submit', (req, res) => {
  // code here
  console.log(req.body)
  const queryText = `UPDATE "order" SET "comp_status" = TRUE WHERE "id" = $1;`
    
    pool.query(queryText,[req.body.id])
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
  const queryText = `DELETE FROM "order" WHERE "id" = $1;` 
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