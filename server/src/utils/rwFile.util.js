const fs = require('fs');

const readJsonFileAsObject = async (filepath, logging = false) => {
  if (!fs.existsSync(filepath)) {
    console.log('Json File does not exist!');
    return [];
  }
  try {
    const data = await fs.promises.readFile(filepath, 'utf-8');
    const json = await JSON.parse(data);
    if (logging) console.log('Object read from Json File!');
    return json;
  } catch (err) {
    console.log(err);
  }
};

const saveObjectAsJsonFile = (filepath, object, logging = false) => {
  const json = JSON.stringify(object, null, 4);
  try {
    fs.writeFileSync(filepath, json);
    if (logging) console.log('Object saved in Json File!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = { readJsonFileAsObject, saveObjectAsJsonFile };
