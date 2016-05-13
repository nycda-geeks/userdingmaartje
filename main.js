var express = require('express');
var fs = require('fs');
var app = express();
var bodyparser = require('body-parser');





app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(express.static('./public'))
app.use(bodyparser.urlencoded({extended:false}))


var server = app.listen(3000, function() {
  console.log('Example app listening on port: ' + server.address().port);
})
    

app.get('/search', function (request, response) {
  // shows form
    response.render('searchajax', {
      title: "Search User Directory"
    });
 });


// GET Add user page
app.get('/users/add', function(request, response) {
    response.render('adduser', {
      title: "Add new user to the directory"
    });
 });

// GET Userlist page.
app.get('/users', function(request, response) {
    fs.readFile('users.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    } else {
      response.render('userlist', {
        title: "User Directory",
        userlist: JSON.parse(data)
      });
    };
    });
});

// POST Search
app.post('/search',function(request, response) {
  var name=request.body.name;
  if (request.body.ajax) {var ajax = true} else {var ajax=false};

  fs.readFile('users.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    } else {
      var users=JSON.parse(data);
      var result=[];

      for (i=0;i<users.length;i++) {
        if (users[i].firstname.toLowerCase().indexOf(name.toLowerCase()) > -1 || users[i].lastname.toLowerCase().indexOf(name.toLowerCase()) > -1 ) {
          result.push(users[i]);
        };
      };

      if (ajax == true) {
        response.send(result);
      } else {
        response.render('userlist', {
          title: "Search User Directory",
          userlist: result
        });
      };
    };
    });
});

// POST Add user
app.post('/users/add',function(req, res) {
 
  if (req.body.firstname && req.body.lastname && req.body.email) {
    var newuser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    };

    fs.readFile('./users.json', 'utf8', function(err, data) {
      if (err) {
        throw err;
      } else {

        var users = JSON.parse(data);
        users.push(newuser);
        
        fs.writeFile('./users.json', JSON.stringify(users), function(err) {
          if(err) { throw err };
        });
        
        res.redirect('/users');
      };
    });
  } else { res.redirect('/users/add'); };
});














