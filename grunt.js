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
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/<%= pkg.name %>.js>',
          '<file_strip_banner:src/chrome.js>',
          '<file_strip_banner:src/firefox.js>',
          '<file_strip_banner:src/safari.js>'
        ],
        dest: '<%= pkg.name %>.js'
      },
      chrome: {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/<%= pkg.name %>.js>',
          '<file_strip_banner:src/chrome.js>',
          '<file_strip_banner:src/firefox.js>',
          '<file_strip_banner:src/safari.js>'
        ],
        dest: 'test/chrome/<%= pkg.name %>.js'
      },
      release: {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/<%= pkg.name %>.js>',
          '<file_strip_banner:src/chrome.js>',
          '<file_strip_banner:src/firefox.js>',
          '<file_strip_banner:src/safari.js>'
        ],
        dest: 'release/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    min: {
      dist: {
        src: [
          '<banner:meta.banner>',
          '<config:concat.dist.dest>'
        ],
        dest: '<%= pkg.name %>.min.js'
      },
      release: {
        src: [
          '<banner:meta.banner>',
          '<config:concat.dist.dest>'
        ],
        dest: 'release/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    watch: {
      files: ['<config:lint.files>', 'test/*.js', 'test/*.html', 'package.json'],
      tasks: 'lint concat min qunit'
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
        self: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min qunit');

};
