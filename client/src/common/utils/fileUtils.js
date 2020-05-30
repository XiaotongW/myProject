// import fs from 'fs';
const fs = require('browserify-fs');

function verifyFileName(path) {
  const regExp = new RegExp(/^(\.\/|_*)?_*\w+((-|_)*\w*)*(\.json)$/);
  return typeof path === 'string' && regExp.test(path) === true;
}

const functions = {
  fs_FileWrite(path, content) {
    if (verifyFileName(path) === false) {
      // console.log(`Error file name ${path}`);
      return;
    }
    fs.writeFile(path, JSON.stringify(content), 'utf-8', (err) => {
      if (err) {
        // console.log('error', err);
      }
    });
  },

  fs_FileRead(fileName) {
    if (verifyFileName(fileName) === false) {
      // console.log(`Error file name ${fileName}`);
      return Promise.resolve(
        {
          error: undefined,
          data: null,
        },
      );
    }
    return new Promise((resolve) => {
      fs.readFile(fileName, 'utf-8', (err, data) => {
        resolve(
          {
            error: err,
            data: typeof data === 'undefined' ? data : JSON.parse(data),
          },
        );
      });
    });
  },
};

export default {
  ...functions,
};
