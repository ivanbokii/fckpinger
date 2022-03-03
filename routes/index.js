let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

const alertColours = {
  'ok': 'success',
  'timeout': 'danger',
  'failed': 'warning',
};

router.get('/', function(req, res, next) {
  const outputPath = path.resolve(__dirname, '../output.json');
  let output = JSON.parse(fs.readFileSync(outputPath).toString());
  output = output.map(item => {
    item.colour = alertColours[item.type];

    if (item.type !== 'timeout') {
      const url = new URL(item.targetUrl);
      item.hostname = url.hostname;
    }

    return item;
  });

  res.render('index', { title: 'Hello', output });
});

router.post('/upload', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let checklist = req.files.checklist;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      checklist.mv('../checklist.json');

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: checklist.name,
          mimetype: checklist.mimetype,
          size: checklist.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
