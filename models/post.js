/**
 * Created by Sandeep on 27/09/14.
 */
var mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema=mongoose.Schema;

autoIncrement.initialize(mongoose);

var postSchema=new Schema({
    title:'String',
    permalink:'String',
    content:'String',
    tags:'String',
    keywords:'String',
    datePublished: { type: Date, default: Date.now }
});

postSchema.plugin(autoIncrement.plugin, {model:'Post',startAt:1});

module.exports=mongoose.model('Post',postSchema);