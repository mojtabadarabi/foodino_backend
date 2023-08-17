import App from './app';
import 'module-alias/register';

// set __ dir name
global.__basedir = __dirname

new App()