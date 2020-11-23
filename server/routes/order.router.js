const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// router.get('/', (req, res) => {
  
//   const queryText = `SELECT * FROM "order" WHERE "comp_status"= FALSE LIMIT 1;`;
//   pool.query(queryText)
//   .then((result) => {
//       res.send(result.rows)
//   })
//   .catch((err) => {
//       console.log(`Error on query ${err}`);
//       res.sendStatus(500);
//   })
// });

router.get('/orders', (req, res) => {
  
  const queryText = `SELECT * FROM "order" WHERE "comp_status"= $1;`;
  pool.query(queryText, [req.query.type])
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