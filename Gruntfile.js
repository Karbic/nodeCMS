module.exports = function(grunt) {
    [   'grunt-mocha-test',
        'grunt-contrib-jshint'
    ].forEach(function(task) {
            grunt.loadNpmTasks(task);
    });



    grunt.initConfig({
        mochaTest: {
            test: {
                src: ['qa/tests-*.js']
            }
        },
        jshint: {
            app: ['nodecms.js', 'public/js/**/*.js', 'lib/**/*.js'],
            qa: ['Gruntfile.js', 'public/js/**/*.js', 'lib/**/*.js']
        }
    });

    grunt.registerTask('default', ['mochaTest', 'jshint']);

};
