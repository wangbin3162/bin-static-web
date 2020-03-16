const {src, dest, series} = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

// 编译函数
function convertJs () {
  return src('./components/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./components/dist'))
}

// 打包默认的styl
function compile () {
  return src('./src/styles/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin()).pipe(rename({suffix: '.min'}))
    .pipe(dest('./src/styles'))
}

exports.build = series(convertJs)
