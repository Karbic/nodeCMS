const express = require('express');

const app = express();

const fortune = require(__dirname + '/lib/fortune.js');

//set up handlebars

const handlebars = require('express-handlebars').create({
	defaultLayout: 'main',
	helpers: {
       section: function(name, options) {
           if(!this._sections) this._sections = {};
           this._sections[name] = options.fn(this);
           return null;
		}
	}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/popper.js/dist'));
app.use(express.static(__dirname + '/node_modules/handlebars/dist'));

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastURL: 'https://www.wunderground.com/forecast/us/or/portland',
                iconURL: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Moscow',
                forecastURL: 'https://www.wunderground.com/forecast/us/or/portland',
                iconURL: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Irkutsk',
                forecastURL: 'https://www.wunderground.com/forecast/us/or/portland',
                iconURL: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            }
        ]
    }
}

app.use(function(req, res, next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeatherData();
    next();
});

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test == 1;
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about', {fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js'});
});

app.get('/tours/hood-river', function(req, res) {
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});

app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + 
		app.get('port') + '; press Ctrl-C to terminate.');
});

