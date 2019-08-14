/*
 *simple grab the html tag and text in between, even if on multiple lines
 *not a substitue for a html parser, but can be handy in the future
 */

var fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'techDoc.html');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
  if (!err) {
    console.log('received data!');
    /*
     *for tags on multiple lines
     *replace for the tag you're searching for
     */
    let headers = data.match(/<header>(.|\n)*?<\/header>/g);
    headers = headers.join("\n");
    try {
      /*
       *write matches to file
       *makes it easy to work within text editor
       */
      fs.writeFile("tmp.txt", headers, err => console.log(err));
    } catch(error){
      throw error;
    }
  } else {
    throw err;
  }
});
