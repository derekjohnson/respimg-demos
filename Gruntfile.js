module.exports = function(grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
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

		csslint: {
			prod: {
				options: {
					'import': 2,
					'empty-rules': 2,
					'compatible-vendor-prefixes': false,
					'box-sizing': false
				},

				src: ['css/style.css']
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
			prod: ['Gruntfile.js']
		},

		imagemin: {
			prod: {
				options: {
					optimizationLevel: 3
				},

				files: [
					{
						expand: true,     // Enable dynamic expansion.
						cwd: 'img/src/',      // Src matches are relative to this path.
						src: ['**/*.png'], // Actual pattern(s) to match.
						dest: 'img/',   // Destination path prefix.
						ext: '.png',   // Dest filepaths will have this extension.
					},

					{
						expand: true,     // Enable dynamic expansion.
						cwd: 'img/src/',      // Src matches are relative to this path.
						src: ['**/*.jpg'], // Actual pattern(s) to match.
						dest: 'img/',   // Destination path prefix.
						ext: '.jpg',   // Dest filepaths will have this extension.
					}
				]
			}
		},

		svgo: {
			prod: {
				files: 'img/*.svg'
			}
		}
	});

	grunt.registerTask('default', ['sass','svgo','jshint','uglify','imagemin','csslint']);

	grunt.registerTask('img', ['imagemin','svgo']);
};