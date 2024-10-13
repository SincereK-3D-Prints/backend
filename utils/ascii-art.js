const colors = require('ansi-colors');

const asciiArt = () => colors.redBright(`
   ____ __ __ ____  ___   ___ 
  / __// //_/|_  / / _ \\ / _ \\
 _\\ \\ / ,<  _/_ < / // // ___/
/___//_/|_|/____//____//_/
`);

module.exports = asciiArt;
