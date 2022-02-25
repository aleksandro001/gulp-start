import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    //looking for .otf font files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        //convert to .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        //unload to the source folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    //looking for .ttf font files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        //convert to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        //unload to the build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        //looking for .fft font files
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        //convert to .woff2
        .pipe(ttf2woff2())
        //unload to the folder with the result
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
export const fontsStyle = () => {
    //font connection styles file
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    //check if font files exist
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            //check if there is a styles file for connecting fonts
            if (!fs.existsSync(fontsFile)) {
                // If the file does not exist, we create it
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    //write font connections in the styles file
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                //If there is a file, print the message
                console.log("The file sccc/fonts.scss already exists. To update the file you need to delete it");
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}