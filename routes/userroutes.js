function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

module.exports = function(app, passport) {

  // show the home page (will also have our login links)
  app.get('/logindex', function(req, res) {
    res.render('logindex.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });

  app.get('/blog_poster', isLoggedIn, function(req, res) {
    res.render('./views/blog_poster.ejs', {
      user: req.user
    });
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // AUTHENTICATE (FIRST LOGIN) ==================================================

  // LOGIN ===============================
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: './views/blog_poster.ejs',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // SIGNUP =================================
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // AUTHORIZE (ALREADY LOGGED IN)
  app.get('/connect/local', function(req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/connect/local',
    failureFlash: true
  }));
};

// route middleware to ensure user is logged in
