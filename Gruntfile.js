module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'string-replace': {
      build: {
        files: {
          'dist/': 'dist/*.js',
        },
        options: {
          replacements: [{
            pattern: /{{ VERSION }}/g,
            replacement: '<%= pkg.version %>'
          }]
        }
      },
      jshint: {
        files: {
          'dist/': 'dist/*.js',
        },
        options: {
          replacements: [{
            pattern: /\/\*\s*jshint[^\n]*\n/g,
            replacement: ''
          }]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      beforereplace: ['src/cssLoader.js'],
      afterreplace: ['dist/InstaSynchP-CSSLoader.user.js'],
      beforeconcat: ['tests/src/*.js'],
      afterconcat: ['tests/test.js'],
      other: ['Gruntfile.js']
    },
    concat: {
      test: {
        src: ['tests/src/*.js'],
        dest: 'tests/test.js',
      },
      dist: {
        src: ['src/meta.js', 'src/style.js', 'src/cssLoader.js'],
        dest: 'dist/InstaSynchP-CSSLoader.user.js'
      }
    },
    qunit: {
      all: ['tests/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('default', ['concat', 'string-replace:build', 'jshint',
    'string-replace:jshint', 'qunit'
  ]);
  grunt.registerTask('test', ['concat', 'jshint', 'qunit']);
  grunt.registerTask('build', ['shell', 'concat', 'string-replace']);
};
