// const express = require('express');
// const connection = require('../connection');
// const router = express.Router();
// var auth = require('./services/authentication');

// router.get('/details',auth.authenticateToken,(req, res,next) => {
//     var categoryCount;
//     var productCount;
//     var billCount;
//     var query = "select count(id) as categoryCount from ctegory";
//     connection.query(query,(err,results)=>{
//         if(!err){
//             categoryCount = results[0].categoryCount;
//         }
//         else{
//             return res.status(500).json(err);
//         }
//     })

// var query = "select count(id) as productCount from product";
// connection.query(query,(err,results)=>{
//     if(!err){
//         productCount = results[0].productCount;
//     }
//     else{
//         return res.status(500).json(err);
//     }
// })

// var query = "select count(id) as billCount from bill";
// connection.query(query,(err,results)=>{
//     if(!err){
//         billCount = results[0].billCount;
//         var data = {
//             category:categoryCount,
//             product:productCount,
//             bill:billCount
//         }
//     }
//     else{
//         return res.status(500).json(err);
//     }
// })

// })

// module.exports = router;

const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('./services/authentication');

router.get('/details', auth.authenticateToken, async (req, res, next) => {
    try {
        const categoryCountQuery = "select count(id) as categoryCount from category";
        const productCountQuery = "select count(id) as productCount from product";
        const billCountQuery = "select count(id) as billCount from bill";

        const categoryCountPromise = new Promise((resolve, reject) => {
            connection.query(categoryCountQuery, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].categoryCount);
            });
        });

        const productCountPromise = new Promise((resolve, reject) => {
            connection.query(productCountQuery, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].productCount);
            });
        });

        const billCountPromise = new Promise((resolve, reject) => {
            connection.query(billCountQuery, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].billCount);
            });
        });

        const [categoryCount, productCount, billCount] = await Promise.all([
            categoryCountPromise,
            productCountPromise,
            billCountPromise
        ]);

        var data = {
            category: categoryCount,
            product: productCount,
            bill: billCount
        };

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
