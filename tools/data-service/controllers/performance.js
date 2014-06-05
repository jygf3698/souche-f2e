// Generated by CoffeeScript 1.7.1
(function() {

    PerformanceClickModel = new BaseModel("performance/clicks");
    TrafficModel = new BaseModel("TrafficModel", "mongo");
    ClickModel = new BaseModel("ClickModel", "mongo");
    module.exports = {
        "/click": {
            get: function() {
                return function(req, res) {
                    var phone_match, tag_match;
                    if (!req.query || !req.query.cookie) {
                        res.send('error');
                        return;
                    }
                    req.query.user_ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
                    phone_match = req.query.cookie.match(/noregisteruser=([0-9]*?);/);
                    if (phone_match) {
                        req.query.user_phone = phone_match[1];
                    }
                    tag_match = req.query.cookie.match(/usertag=([0-9a-zA-Z_]*?);/);
                    if (tag_match) {
                        req.query.user_tag = tag_match[1];
                    }
                    req.query.time = new Date();
                    ClickModel.add(req.query).done(function(err) {
                        res.send('ok');
                    })
                }
            }
        },
        "/click-chart": {
            get: function() {
                return function(req, res) {
                    res.locals.url = req.query.url;
                    if (!res.locals.url) {
                        res.locals.url = "http://www.souche.com"
                    }
                    res.locals.iframeurl = res.locals.url
                    if (res.locals.iframeurl.indexOf("?") == -1) {
                        res.locals.iframeurl = res.locals.iframeurl + "?load_data=1"
                    } else {
                        res.locals.iframeurl = res.locals.iframeurl + "&load_data=1"
                    }
                    if (req.query.time) {
                        res.locals.iframeurl += "&time=" + req.query.time;
                    } else {

                    }
                    res.locals.time = req.query.time;
                    return res.render('performance/clicks');
                }
            }
        },
        "/click-data": {
            get: function() {
                return function(req, res) {

                    var condition, maxTime, minTime, time, times, url;
                    url = decodeURIComponent(req.query.url);
                    time = req.query.time;
                    if (time) {
                        times = time.split(' to ');
                        minTime = times[0] + " 00:00:00";
                        maxTime = times[1] + " 23:59:59";
                    }
                    console.log(url);
                    condition = {
                        page_url: url
                    };
                    if (time) {
                        condition.time = {
                            $gt: minTime,
                            $lt: maxTime
                        };
                    }
                    ClickModel.findAll().offset(0).limit(1000000).where(condition).fields(['page_x', 'page_y', 'element_id']).done(function(error, clicks) {

                        if (req.query.callback) {
                            res.send(req.query.callback + "(" + JSON.stringify(clicks) + ")");
                        } else {
                            res.send(clicks);
                        }
                    });

                }
            }
        },
        "/traffic_begin": {
            get: function() {
                return function(req, res) {
                    if (!req.query) {
                        res.send('error');
                        return;
                    }
                    req.query.ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
                    req.query.stay_second = 0;
                    req.query.click_count = 0;
                    req.query.visit_length = 0;

                    req.query.time = new Date();
                    TrafficModel.add(req.query).done(function(error, traffic) {
                        res.send(req.query.callback + "('" + traffic._id + "')");
                    })
                }
            }
        },
        "/traffic_end": {
            get: function() {
                return function(req, res) {
                    var id = req.query._id;
                    delete req.query._id;
                    TrafficModel.where({
                        _id: id
                    }).update(req.query).done(function(error, traffic) {
                        res.send("ok")
                    })
                }
            }
        }
    };

}).call(this);