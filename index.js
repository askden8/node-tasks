

const fs = require('fs');
const path = require('path');

const base = './test';
const newbase = './new';

const copyFile = (fileName,name) => {


    fs.copyFileSync("./"+fileName, newbase+"/"+name.charAt(0)+"/"+name);
    delFile("./"+fileName);
};

const readDir = (base, level) => {
	const files = fs.readdirSync(base);
	files.forEach( item => {
		if (item==".DS_Store"){return;}
		let localBase = path.join(base, item);
		let state = fs.statSync(localBase);
		if (state.isDirectory()) {
			console.log(' '.repeat(level) + 'Dir: ' + item);
			readDir(localBase, level + 1);
		} else {
			console.log(' '.repeat(level) + 'File: ' + item);
            makeNewDir(localBase,item);

		}
	});
};
function makeNewDir(localBase,item)
{
    fs.mkdir(newbase+"/"+item.charAt(0),function(err){
        if (err) {
            return console.error(err);
        }
        console.log("Directory created successfully!");
        copyFile(localBase,item);
    });
}

function delFile(nameFile)
{
    console.log("Going to delete an existing file");
    fs.unlink(nameFile, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("File deleted successfully!");
    });
}

readDir(base, 0);






