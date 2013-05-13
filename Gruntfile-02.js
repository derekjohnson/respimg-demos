module.exports = function(grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			css: {
				files: 'sass/*.scss',
				tasks: ['sass'],
				options: {
					interrupt: true
				}
			}
		},

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
		}
	});

	grunt.registerTask('default', ['sass']);
};