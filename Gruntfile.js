/**
 * Created by Administrator on 2016/6/30 0030.
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            basic: {
                options:{
                    separator:';'
                },
                files: {
                    'build/global.js': ['includes/*.js', '!includes/carousel.js', '!includes/main.js', '!includes/utile_bak.js', 'includes/carousel.js', 'includes/main.js'],
                }
            },
            css: {
                src:['includes/*.css','!includes/common_bak.css'],
                dest:'build/all.css'
            }
        },
        cssmin:{
            dist:{
                src:'build/all.css',
                dest:'build/all.min.css'
            }
        },
        uglify:{
            dist:{
                src:'build/global.js',
                dest:'build/global.min.js'
            }
        },
        imagemin:{
            dist:{
                options:{
                    optimizationLevel:3
                },
                files:[{
                    expand:true,
                    cwd:'images/',
                    src:'**/*.png',
                    dest:'build/img/'
                }]
            }
        },
        clean:{
            all:['build/'],
            left:['build/*.js','build/*.css','!build/*.min.css','!build/*.min.js'],
            js:['build/*.js','!build/*.min.js'],
            css:['build/*.css','!build/*.min.css'],
            html:['build/Carousel.html']
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true
                },
                src:'Carousel.html',
                dest:'build/Carousel.html'
            }
        },
        watch:{
            js:{
                files:['includes/*.js'],
                tasks:['concat:basic','uglify','clean:js'],
                options:{
                    livereload:true
                }
            },
            css:{
                files:['includes/*.css'],
                tasks:['concat:css','cssmin','clean:css'],
                options: {
                    livereload: true
                }
            },
            html:{
                files:['Carousel.html'],
                tasks:['clean:html','htmlmin'],
                options:{
                    livereload:true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default',['clean:all','concat','uglify','cssmin','imagemin','htmlmin','clean:left','watch']);
}