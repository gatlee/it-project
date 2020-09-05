const path = require('path');

module.exports = {
  '*.{html,js,tsx,ts,json,md,css,scss}': (files) => {
    if (
      files.length > 0 &&
      files[0] !== '[filename]' &&
      files[0] !== '[file]'
    ) {
      const cwd = process.cwd();
      const relativePaths = files.map((f) => path.relative(cwd, f));
      return [
        `nx affected:lint --files="${relativePaths.join(',')}" --parallel`, //
        `git add ${relativePaths.join(' ')}`,
      ];
    } else {
      return [];
    }
  },
};
