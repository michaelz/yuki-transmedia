var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        options: {
            node: true
        },
        all: [ "Gruntfile.js", "app/*.js", "app.js" ]
    },
    develop: {
      server: {
        file: 'app.js'
      }
    },
    apidoc: {
      yukidoc: {
        src: "app/",
        dest: "public/doc/",
        options: {
          debug: false,
          includeFilters: [ ".*\\.js$" ],
          excludeFilters: [ "node_modules/" ]
        }
      }
    },
    sass: {
      dist: {
        files: [
            {
                expand: true,
                    cwd: "app/resources/sass",
                    src: ["**/*.scss"],
                    dest: "public/css",
                    ext: ".css"
            }
        ]
      }
    },
    copy: {
        main: {
            files: [
                {
                    expand: true,
                    flatten:true,
                    src: ['app/resources/javascript/*'],
                    dest: 'public/js/', filter: 'isFile'
                }
            ]
        },
        jquery: {
            files: [
                {
                    expand:true,
                    flatten:true,
                    src: ['node_modules/jquery/dist/jquery.min.js'],
                    dest: 'public/js/lib/', filter: 'isFile'
                }
            ]
        },
        lib: {
            files: [
                {
                    expand:true,
                    cwd: 'app/resources/javascript/lib/',
                    flatten:false,
                    src:['**'],
                    dest: 'public/js/lib',
                }
            ]
        },
        fonts: {
            files: [
                {
                    expand:true,
                    flatten:true,
                    src: ['app/resources/fonts/*'],
                    dest: 'public/fonts', filter: 'isFile'
                }
            ]
        }
    },
    uglify: {
        options: {
            mangle: false  // Use if you want the names of your functions and variables unchanged
        },
        frontend: {
            files: [{
              expand: true,
              cwd: 'public/js',
              src: '*.js',
              dest: 'public/js'
            }]
        }

    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js_main: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload','copy:main','copy:jquery','copy:lib'],
        options: {
            livereload: reloadPort
        }
      },
      css: {
        files: [
          'app/resources/sass/*.scss',
          'app/resources/sass/*/*.scss'
        ],
        tasks: ['sass:dist'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/*.handlebars',
          'app/views/**/*.handlebars'
        ],
        options: { livereload: reloadPort }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.config.requires('watch.js_main.files');
  files = grunt.config('watch.js_main.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'sass',
    'jshint',
    'copy',
    'uglify',
    'develop',
    'apidoc',
    'watch'
  ]);
  
  grunt.registerTask('deploy', [
    'sass',
    'jshint',
    'copy',
    'uglify',
    'develop',
    'apidoc'
  ]);
};
