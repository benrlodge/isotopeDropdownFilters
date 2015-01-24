module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      example: {
        port: 4567,
        base: ''
      }
    },

    coffee: {
      compile: {
        files: { './js/isotopeDropdownFilters.js': './coffee/isoDropdownFilters.coffee' }
      }
    },

    watch: {
      coffee: {
        files: ['./coffee/isoDropdownFilters.coffee'], tasks: 'coffee'
      }
    }

  });
  

  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.registerTask('default', ['connect:example','coffee']);
  
};