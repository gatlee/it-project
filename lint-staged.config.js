const path = require('path');

module.exports = {
  '{apps, libs}/**/*.{html,js,tsx,ts,json,md,css,scss}': (files) => {
    const cwd = process.cwd();
    const relPaths = files.map((file) => {
      return path.relative(cwd, file);
    });

    return [
      `npm run affected:lint -- --parallel --files=${relPaths.join(
        ','
      )} --maxWarnings=0`,
      `git add ${files.join(' ')}`,
    ];
  },
};
