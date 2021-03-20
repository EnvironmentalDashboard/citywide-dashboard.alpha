var myArgs = process.argv.slice(2);

var oberlinWidth = 1584;
var oberlinHeight = 893;

console.log(`Width : ${Number(myArgs[0]) / oberlinWidth} \n Height: ${Number(myArgs[1]) / oberlinHeight}` );
