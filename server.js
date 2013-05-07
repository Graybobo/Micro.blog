/*! KILLHAPPY. 2013-05-05 */

var connect = require('connect'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring'),
    ejs = require('ejs'),
    INFO = require('./config').BlogInfo,
    DB = require('./config').DB,
    Auth = require('./config').Auth,
    serverPort = 80;

require("./Date.strftime");

connect(

	connect.favicon(__dirname + '/assets/favicon.ico'),
	connect.static(__dirname + '/assets'),
	connect.staticCache(),
	connect.compress(),
	connect.cookieParser(),
	connect.session({secret: 'keyboard cat'}),
	
	connect.router(function( app ){

		app.get('/', function( req, res ){
			DB.collection('essay').findItems({}, function( err, results ){
				res.writeHead( 200 );
				res.end(
					ejs.render(
						fs.readFileSync('./views/master.ejs', 'utf8'),
						{
							locals: {
								title: 'Micro blog.',
								essay: results,
								info: INFO
							}
						}
					)
				);
			});
		});

		/* about */
		app.get('/about', function( req, res ){
			res.writeHead( 200 );
			res.end(
				ejs.render(
					fs.readFileSync('./views/about.ejs', 'utf8'),
					{
						locals: {
							title: '关于我.',
							info: INFO
						}
					}
				)
			);
		});
		
		/* login */
		app.get('/login', function( req, res ){
			res.writeHead( 200 );
			res.end(
				ejs.render(
					fs.readFileSync('./views/login.ejs', 'utf8'),
					{
						locals: {
							title: '登录.',
							info: INFO
						}
					}
				)
			);
		});
		
		/* login authenticate */
		app.post('/authenticate', function( req, res ){
			var query = url.parse( req.url, true ).query,
			body = '';
			
			req.on('data', function( data ){
				body += data;
			});
			
			req.on('end', function(){
				var document = qs.parse( body );
				if( document.account === Auth.account && document.password === Auth.password ){
					console.log( '---- login successful.' );
					req.session.account = Auth.account;
					res.setHeader( 'Location', query.url ? query.url : '/publish' );
				}
				else {
					console.log( '---- login failed.' );
					res.setHeader( 'Location', req.url );
				}
				res.writeHead( 302 );
				res.end();
			});
		});
		
		/* publish get */
		app.get('/publish', function( req, res ){			
			if( req.session.account && req.session.account == Auth.account ){
				res.writeHead( 200 );
				res.end(
					ejs.render(
						fs.readFileSync('./views/publish.ejs', 'utf8'),
						{
							locals: {
								title: '发布文章.',
								info: INFO
							}
						}
					)
				);
			}
			else{
				res.setHeader( 'Location', '/login' );
				res.writeHead( 302 );
				res.end();			
			}
		});
		
		/* publish post */
		app.post('/publish', function( req, res ){
			var body = '';
			
			var callbackJson = {
				code: 0,
				msg: ''
			};
			
			req.on('data', function( data ){
				body += data;
			});
			
			req.on('end', function(){
				var document = qs.parse( body ),
					URL = document.url;
				
				DB.collection('essay').findOne({url: qs.unescape( URL )}, function( err, results ){
					if( err ){
						callbackJson.code = 0;
					}
					else if( results ){
						callbackJson.code = 0;
						callbackJson.msg = 'Url Address duplicate.';
						console.log( '---- Url Address duplicate.' );
					}
					else{
						var _published = new Date();
						document.published = _published.strftime( Date.Formats.F );
						document.author = document.author || INFO.author.name;
						DB.collection('essay').insert(document, null, function( err, results ){
							if( err ){
								callbackJson.code = 0;
								console.log( '---- DB insert failed.' );
							}
							else{
								callbackJson.code = 1;
								console.log( '---- DB insert successful.' );
							}
						});
					}
					res.writeHead( 200 );
					res.end( JSON.stringify( callbackJson ) );
				});
			
			});
		});
		
		/* 404 - Page not found. */
		app.get('/*', function( req, res ){
			console.log( '---- 404 request.' );
			res.writeHead( 404 );
			res.end(
				ejs.render(
					fs.readFileSync('./views/404.ejs', 'utf8'),
					{
						locals: {
							title: '404 - Page not found.',
							message: 'The page you want to access does not exist.',
							info: INFO
						}
					}
				)
			);
		});
		
	})

).listen( serverPort || 80 );
