(function ($) {
	var $window = $(window),
		$body = $('body');

	ipLookup();

	// Breakpoints.
	breakpoints({
		xlarge: ['1141px', '1680px'],
		large: ['981px', '1140px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['321px', '480px'],
		xxsmall: [null, '320px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly.
	$('.scrolly').scrolly();

	// Track user location
	function showUserDetails(ipdata) {

		if (typeof ipdata != "undefined") {
			const countryCode = ipdata.country_code;
			fetch('./assets/lib/language.json')
				.then(results => results.json())
				.then(data => {
					data.forEach(element => {
						if (element.countryCode === countryCode) {
							$("#welcome").html(element.text.welcome);
							$("#landing").html(element.text.landing);
							$("#join-now-free").html(element.text.joinNowFree);
							$("#find-now-free").html(element.text.findNowFree);
							$("#discover").html(element.text.discover);
							$("#section1-header").html(element.text.section1Header);
							$("#section1-desc").html(element.text.section1Desc);
						}
					});
				});
		}
	}

	function ipLookup() {
		$.get('https://api.userinfo.io/userinfos', function (res) {
			getIpData(res.ip_address);
		});
	}

	function getIpData(ip) {
		$.get('https://ipwhois.app/json/' + ip, function (res) {
			showUserDetails(res);
		});
	}

})(jQuery);