const express = require('express');
const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { getListFunc, getList } = require('./getList');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './tmp/savedPages');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', [upload.single('file-to-upload'), getList], (req, res) => {
	
});

app.get('/doingwork', (req, res) => {

	res.send("Working on it!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
