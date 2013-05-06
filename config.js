/*! KILLHAPPY. 2013-05-05 */

var MicroBlog = {
		name: 'Micro blog.',
		author: {
			name: 'KILLHAPPY.',
			profession: '码奴.',
			qq: '65732186',
			email: 'graybobo@live.cn',
			github: 'https://github.com/Graybobo',
			hobby: '网游, Coding, Loli',
			focus: 'JavaScript, HTML5, Node.js, Python ...',
			resume: '互联网行业，一线码奴，专注JavaScript应用开发，涉猎Python、C++；\
			        游戏PK控，取乐于秒敌千里之外与血溅当场的快感...'
		},
		year: '2013'
}
exports.BlogInfo = MicroBlog;

var Auth = {
	account: 'graybobo',
	password: '******'
}
exports.Auth = Auth;

var mongo = require( "mongoskin" ),
    DB_url = "DB_UserName:DB_Password@DB_Host:port/DB_Name";
exports.DB_url = DB_url;
exports.DB = mongo.db( DB_url );
