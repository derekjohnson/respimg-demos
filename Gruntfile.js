module.exports = function(grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('svgo-grunt');
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-imageoptim');

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
				files: 'src/js/*.js',
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
					'dist/css/style.css': 'src/sass/style.scss',
					'dist/css/old-ie.css': 'src/sass/old-ie.scss',
					'dist/css/really-old-ie.css': 'src/sass/really-old-ie.scss'
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
					'dist/js/script.min.js': ['src/js/main.js']
				}
			}
		},

		jshint: {
			prod: ['Gruntfile.js']
		},

		svgo: {
			prod: {
				files: 'dist/img/*.svg'
			}
		},

		svg2png: {
			prod: {
				files: [
					{
						src: ['dist/img/**/*.svg']
					}
				]
			}
		},

		imageoptim: {
			prod: {
				options: {
					quitAfter: true
				},

				files: [
					'dist/img'
				]
			}
		}
	});

	grunt.registerTask('default', ['sass','svgo','jshint','uglify','imageoptim','csslint']);

	grunt.registerTask('img', ['svgo','svg2png','imageoptim']);
};