var fortuneCookies = [
	"Concuer your fears",
	"Stalin is a deamon",
	"Fucking awesome",
	"RipnDip"
];

exports.getFortune = function() {
	var idx = Math.floor(Math.random() * fortuneCookies.length);
	return fortuneCookies[idx];
}