const fs = require('fs')

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

let configJson
// read text output of firebase config:web, and copy json portion
try {
  const file = process.argv[2]
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error('error reading config.txt (should have been automatically generated', err)
    }

    const begin = data.indexOf("(") + 1
    const end = data.indexOf(")")
    configJson = data.slice(begin,end)
  });
}
catch(err) {
  throw "getFireBaseConfig.js must be called with a txt file as a positional argument"
}

// write json to ui/src/Config.js
try {
  fs.readFile('./Config.js', 'utf8', (err,data) => {
    if (err) {
      return console.error('error reading Config.js:', err);
    }

    const result = data.replace(/'<fbconfig>'/g, configJson);
  
    fs.writeFileSync('./ui/src/Config.js', result, 'utf8');
  });
}
catch(err) {
  throw 'error reading Config.js in ui/'
}
