module.exports = function(grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');

	// config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
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

	grunt.registerTask('css_compile', ['sass']);
}