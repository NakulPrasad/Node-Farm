//creating simple webserver
const http = require('http');
const fs = require('fs');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

/////////////////
//FILES
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

///////////////////
//SERVER

const server = http.createServer((req, res) => {
  //parsing variable from url

  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    //using template calling replaace Template
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    // console.log(cardHtml);
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
    res.end(output);
  }

  //product page
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    // console.log(query);
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }

  //api
  else if (pathname === '/api') {
    res.writeHead(200, 'JSON', {
      'Content-Type': 'application/json',
    });
    res.end(data);
  }
  //not found
  else {
    res.writeHead(404, 'mission failed', {
      'Content-Type': 'text/html',
      'my-customheader': 'nakul-haha', //custom header
    });
    res.end('<h1>page not found</h1>'); //end must be after .write/.writeHead
  }
});

server.listen(2222, '127.0.0.1', () => {
  console.log('listening on port 2222');
});
