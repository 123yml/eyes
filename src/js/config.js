require.config({
	baseUrl : "/",
	paths : { // 短名称
		jquery : "lib/jquery/jquery-1.12.4.min",
		load : "js/loadHeaderAndFooter",
		zoom : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		template:"lib/artTemplate/template-web",
		cookie : "lib/jquery-plugins/jquery.cookie",
		bootstrap : "/lib/bootstrap/js/bootstrap.min",
		fly : "lib/jquery-plugins/jquery.fly.min"
	},
	shim : {
		zoom:{
			deps : ["jquery"]
		},
		fly:{
			deps : ["jquery"]
		}
	}
}); 