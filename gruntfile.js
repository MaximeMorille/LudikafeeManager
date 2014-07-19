module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/js/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    coffee: {
      compile: {
        files: {
          'public/js/**/*.js': 'app/js/**/*.js'
        }
      },

      compileJoined: {
        options: {
          join: true
        },
        files: {
          // concat then compile into single file
          'public/js/adherents_manager.js': [
              'app/js/**/*.coffee'
            ]
        }
      },
    },

    compass: {
      dev: {
        options: {
          sassDir: 'app/stylesheets/',
          imagesDir: 'app/img/',
          httpImagesPath: '/img/',
          fontsDir: 'app/fonts/',
          relativeAssets: false,
          environment: 'development',
          outputStyle: 'expanded',
          cssDir: 'public/css/'
        }
      }
    },

    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: {
          'public/js/min/adherents_manager.min.js': [
            'public/js/adherents_manager.js'
          ]
        }
      }
    },

    qunit: {
      files: [
        'test/**/*.html'
      ]
    },
    jshint: {
      files: [
        'Gruntfile.js',
        'app/js/*.js',
        'test/**/*.js'
      ],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['app/js/**/*.coffee', 'app/stylesheets/**/*.scss'],
      tasks: ['coffee', 'compass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['uglify', 'coffee', 'compass']);

  grunt.registerTask('compile_dev', function() {
    grunt.task.run('coffee');
    grunt.task.run('compass');
  });

};