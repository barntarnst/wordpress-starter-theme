var util = require('gulp-util')

module.exports = {
  proxy: 'http://your-wordpress-url',
  production: !!util.env.production
}
