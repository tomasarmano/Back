const fs = require('fs');

const readFile = (file) => {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
    } catch (error) {
        return [];
    }
};

const writeFile = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = { readFile, writeFile };
