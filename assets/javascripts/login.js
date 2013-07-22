/*!
 * require jquery.js
 * KILLHAPPY. 2013-05-05
 */

var LOGIN = window.LOGIN || {};

LOGIN = {
	
	init: function(){
		var l = window.location.href;
		if( l.indexOf( '#l_failed' ) != -1 ){
			$('#_tipInfo').html('用户名或密码错误！').show();
		}
		$('input[name="account"]').focus();
	},
	
	examine: function(){
		var _u = $.trim( $('input[name="account"]').val() );
		var _p = $.trim( $('input[name="password"]').val() );
		var c = {};
		if( _u == '' ){
			c = { i: false, m: '请输入用户名！', e: 'account' };
		}else if( _p == '' ){
			c = { i: false, m: '请输入密码！', e: 'password' };
		}else{
			c = { i: true, m: '', e: '' };
		}
		return c;
	},
	
	signIn: function(){
		var _c = this.examine();
		if( !_c.i ){
			this.showTipMsg( _c.m, false );
			$('input[name=' + _c.e + ']').focus();
			// console.log( _c.m );		
			return false;
		}else{
			this.showTipMsg( '正在努力为您登录...', true );
			// console.log( '正在努力为您登录...' );
			$("#_loginForm").submit();			
		}
	},
	
	resetForm: function(){
		$('#_loginForm .login-i').val('');
		$('#_tipInfo').html('').hide();
		$('input[name="account"]').focus();
	},
	
	showTipMsg: function( m, t ){
		var _tipInfo = $('#_tipInfo');
		if( t ){
			_tipInfo.addClass('tip-loading').html( m ).show();
		}else{
			_tipInfo.removeClass('tip-loading').html( m ).show();
		}
	}

};

$(function(){ LOGIN.init(); });
