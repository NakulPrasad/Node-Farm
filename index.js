//creating simple webserver
const http = require('http');
const fs = require('fs');
// const url = require("url");

/////////////////
//FILES
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-cards.html`,
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


//replacing templates
const replaceTemplate = (temp, product)=>{
  let output = temp.replace{/%PRODUCTNAME%/}
}
///////////////////
//SERVER

const server = http.createServer((req, res) => {
  pathName = req.url;

  //overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    //using template
    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el))
    res.end(tempOverview);
  }

  //product page
  else if (pathName === '/product') res.end('This is product page');
  //api
  else if (pathName === '/api') {
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
