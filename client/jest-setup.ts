import Vue from 'vue';
import * as recipeHelpers from "./src/helpers";
type MyFn = (...args: any[]) => any;
type MyMap = { [key: string]: MyFn };
const helpers: MyMap = recipeHelpers;
Object.keys(helpers).forEach(key => Vue.filter(key, helpers[key]))
