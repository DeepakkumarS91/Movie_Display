import Raven from 'raven-js';

function init(){
    // Raven.config('http://ecbd4d47f8874d6693eb38e1c444f252@sentry.io/1439834',{
    //     release:'1-0-0',
    //     environment:'development-test',
    // }).install()
}

function log(error){
    console.log(error)
    //Raven.captureException(error)
}

export default {
    init,
    log
}