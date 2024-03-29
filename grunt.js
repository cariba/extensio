/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' MIT License */'
    },
    lint: {
      files: ['grunt.js', 'src/*.js']
    },
    qunit: {
      all: ['test/*.html']
    },
    server: {
      port: 7891,
      base: './test/web'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'src/<%= pkg.name %>.js'
        ],
        dest: '<%= pkg.name %>.js'
      },
      chrome: {
        src: [
          '<banner:meta.banner>',
          'src/<%= pkg.name %>.js'
        ],
        dest: 'test/chrome/libs/<%= pkg.name %>.js'
      },
      chrometest: {
        src: [
          'test/chrome/test-content-script.js',
          'test/shared/shared-content-script-test.js'
        ],
        dest: 'test/chrome/test/chrome-all-tests.js'
      },
      firefox: {
        src: [
          '<banner:meta.banner>',
          'src/<%= pkg.name %>.js'
        ],
        dest: 'test/firefox/data/<%= pkg.name %>.js'
      },
      firefoxtest: {
        src: [
          'test/firefox/data/firefox-content-script-test.js',
          'test/shared/shared-content-script-test.js'
        ],
        dest: 'test/firefox/data/firefox-all-tests.js'
      },
      safari: {
        src: [
          '<banner:meta.banner>',
          'src/<%= pkg.name %>.js'
        ],
        dest: 'test/safari.safariextension/<%= pkg.name %>.js'
      },
      safaritest: {
        src: [
          'test/safari.safariextension/safari-content-script-test.js',
          'test/shared/shared-content-script-test.js'
        ],
        dest: 'test/safari.safariextension/safari-all-tests.js'
      }
    },
    min: {
      dist: {
        src: [
          '<banner:meta.banner>',
          '<config:concat.dist.dest>'
        ],
        dest: '<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: ['<config:lint.files>', 'test/**/*.js', 'test/**/*.html', 'package.json', 'libs/minitest.js'],
      tasks: 'lint concat qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        console: true,
        jQuery: true,
        chrome: true,
        safari: true,
        self: true,
        exports: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min qunit');

};
