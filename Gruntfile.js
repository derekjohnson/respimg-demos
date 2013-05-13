module.exports = function(grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('svgo-grunt');

	// config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// watch
		watch: {
			css: {
				files: 'sass/*.scss',
				tasks: ['sass'],
				options: {
					interrupt: true
				}
			},

			js: {
				files: 'js/src/*.js',
				tasks: ['uglify'],
				options: {
					interrupt: true
				}
			}
		},

		// tasks
		sass: {
			prod: {
				options: {
					style: 'compressed'
				},

				files: {
					'css/style.css': 'sass/style.scss',
					'css/old-ie.css': 'sass/old-ie.scss',
					'css/really-old-ie.css': 'sass/really-old-ie.scss'
				}
			}
		},

		uglify: {
			prod: {
				options: {
					preserveComments: false
				},

				files: {
					'js/script.min.js': ['js/src/main.js']
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js']
		},

		svgo: {
			prod: {
				files: ['img/*.svg']
			}
		}
	});

	grunt.registerTask('default', ['sass','svgo','jshint','uglify']);
};