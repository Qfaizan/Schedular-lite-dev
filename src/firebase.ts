import * as firebase from 'firebase/app';
import {getStorage} from 'firebase/storage';
import config  from './config';

export const App = firebase.initializeApp(config.firebase);
export const storage = getStorage(App);
export {firebase};