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
	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-grunticon');

	// config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// watch
		watch: {
			html: {
				files: 'src/*.html',
				tasks: ['htmlbuild'],
				option: {
					interrupt: true
				}
			},

			css: {
				files: 'src/sass/*.scss',
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
		htmlbuild: {
			prod: {
				src: 'src/*.html',

				dest: 'dist/',

				options: {
					beautify: false,
					sections: {
						header: 'src/templates/header.html'
					}
				}
			}
		},

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

				files: {
					src: ['dist/img']
				}
			}
		},

		grunticon: {
			myIcons: {
				options: {
					src: "src/img/icons/",
					dest: "dist/css/icons/"
				}
			}
		}
	});

	grunt.registerTask('default', ['sass','svgo','jshint','uglify','imageoptim','csslint','htmlbuild','grunticon']);

	grunt.registerTask('img', ['svgo','grunticon','svg2png','imageoptim']);
};