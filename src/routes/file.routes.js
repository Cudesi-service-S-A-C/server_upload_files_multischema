require('dotenv').config()
const { Router } = require('express');
const router = new Router();

const path = require('path');
const multer = require('multer');


router.post('/upload/:param', (req, res) => {
    const { param } = req.params;
    
    const storage = multer.diskStorage({
        destination: path.join(__dirname, `../public/files/${param}`),
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
    
    const uploadFile = multer({
        storage,
        limits: { fileSize: 1000000 }
    }).single('file');
    
    uploadFile(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        res.send(`${process.env.URI_FILE}/file/${param}/${req.file.originalname}`);
    });
});

module.exports = router;