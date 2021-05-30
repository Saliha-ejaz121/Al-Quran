const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./replaceTemplate')
//reading files
const readQuran = JSON.parse(fs.readFileSync(`${__dirname}/Quran.json` , 'utf-8'));
const homePage = fs.readFileSync(`${__dirname}/index.html` , 'utf-8');
const surahPage = fs.readFileSync(`${__dirname}/surah.html` , 'utf-8');
const headerayahPage = fs.readFileSync(`${__dirname}/headerOfAyat.html` , 'utf-8');
const ayahPage = fs.readFileSync(`${__dirname}/Ayah.html` , 'utf-8');

const finalData = readQuran.data.surahs;
const finalAyah = readQuran.data;
//server managing requests
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // Home page
  if(pathname == '/'){
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const surahCard = finalData.map(el => replaceTemplate(surahPage, el)).join('');
    const output = homePage.replace('{%surah%}', surahCard);
    res.end(output);
  }
  //request for surahs
  else if (pathname == '/surah'){
    const ID = query.id
    const surah = finalAyah.surahs[ID];
    const ayah = finalAyah.surahs[ID].ayahs;

    var output1 = ayah.map(el => replaceTemplate(ayahPage , el)).join('');
  var output = replaceTemplate(headerayahPage , surah);
   output = output.replace('{%ayahs%}' , output1);
   res.writeHead(200, {
     'Content-type': 'text/html'
   });
   res.end(output);
 }
});

//server started
server.listen(3000 , '127.0.0.1', ()=>{
      console.log('request sent!..')
  });