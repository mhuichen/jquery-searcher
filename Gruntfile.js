(function() {

"use strict";

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// some variables
		filename: "<%= pkg.name.replace('-', '.') %>",
		banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
			"<%= grunt.template.today('yyyy-mm-dd') %>\n" +
			" * <%= pkg.homepage %>\n" +
			" * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
			" Licensed <%= pkg.license %> \n*/\n",

		// run jshint with the existing jshintrc file on all js files in "src" folder
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			all: ["src/*.js"]
		},

		// clean existing files	in "dist" folder
		clean: {
			files: ["dist/*"]
		},

		// concat the source file(s) and the banner and copy it to the "dist" folder
		concat: {
			options: {
				banner: "<%= banner %>"
			},
			dist: {
				src: "src/<%= filename %>.js",
				dest: "dist/<%= filename %>.js"
			},
		},

		// create the minified js and copy it to the "dist" folder
		uglify: {
			options: {
				preserveComments: "some"
			},
			build: {
				src: "<%= concat.dist.dest %>",
				dest: "dist/<%= filename %>.min.js"
			}
		}
	});

	// Load all tasks
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	// Default task(s).
	grunt.registerTask("default", ["jshint", "clean", "concat", "uglify"]);

};

}).call(this);