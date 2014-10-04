module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // ローカルサーバー設定
    connect: {
      options: {
      },
      livereload: {
        options: {
          base: 'dev/',// rootを設定
          open: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/script/main.js': ['dev/script/main.js']
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['dev/script/*.js']
    },
    // 公開用にdistフォルダにコピー
    copy: {
      dist: {
        expand: true,
        cwd: 'dev/',
        dest: 'dist',
        src: '**'
      }
    },
    // 公開フォルダから不要なデータを削除
    clean: {
      build: ['dist/_sass']
    },
    // ファイル監視
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['dev/script/*.js'],
        tasks: ['jshint']
      },
      compass: {
        files: ['dev/_sass/*.scss'],
        tasks: ['compass']
      },
      livereload: {
        files: ['dev/index.html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('css', ['compass']);
  grunt.registerTask('build', ['css', 'copy', 'clean']);
};