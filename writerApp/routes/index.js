var express = require('express');
var router = express.Router();
var path = require('path');

router.use("/recent", require("./recent"));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//API Routers
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','views', 'index.ejs'));
})

router.post('/',(req, res) => {
  console.log(req.body);
})

module.exports = router;
