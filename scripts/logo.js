
// logo执行
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '..', 'files/ascii.txt'), function (err, data) {
    var odata = data.toString().split('\n');
    console.log(odata);
});