import replace from "gulp-replace"; // search and replace
import plumber from "gulp-plumber"; //error handling
import notify from "gulp-notify"; //messages (prompts)
import browsersync from "browser-sync"; //local server
import newer from "gulp-newer";//update check
import ifPlugin from "gulp-if";//conditional branching

// export the object
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}