const fs = require('fs');
const util = require('util');
const cheerio = require('cheerio');

const getList = (req, res, next) => {
	fs.readFile(`./tmp/savedPages/${req.file.originalname}`, 'utf8', (err, data) => {
        const $ = cheerio.load(data);
        const allLinks = $('.monster-tooltip');
        const links = [];
        const checklinks = new Set();
        allLinks.each((index, element) => {
            if (checklinks.has($(element).attr('href'))) {
                console.log('duplicate url');
            } else {
                checklinks.add($(element).attr('href'));
                links.push({
                    text: $(element).text().split(' ').join('').trim(),
                    href: $(element).attr('href'),
                });
            }
        });
        fs.unlink(`./tmp/savedPages/${req.file.originalname}`, (err) => {
            if (err) {
              console.error(err)
              return
            }
        });
        res.json(links);
    })
    next();
};

module.exports = { getList };
