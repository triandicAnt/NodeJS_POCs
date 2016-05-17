
var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
             console.log('deserializing user:',user.username);
             done(err, user);
        });
        // return done(null, users[username]);

    });

  passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
           /* if(!users[username]){
                console.log('User not found with username ' + username);
                return done(null, false);
            }
            if(isValidPassword(users[username],password)){
                return done(null, users[username]);
            }
            else{
                console.log('Invalid password '+ username);
                return done(null, false);
            }
            */
                User.findOne({'username': username},
                    function (err, user) {
                        if(err)
                            return done(err);
                        if(!user)
                        {
                            console.log("User not found with the usename" +username);
                            return done(null,false);
                        }
                        if(!isValidPassword(user, password)){
                            console.log('Invalid password!');
                            return done(null, false);
                        }
                        return done(null, user);
                    }
                );
        }
    ));
 
   
  
   
   

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            /*if(users[username]){
                console.log('User already exits with username ' + username);
                return done(null, false);
            }
            users[username] = {
                username : username,
                password : createHash(password)
            }
            console.log(users[usename].username + ' registration successful.');
            return done(null,users[username]);*/
             User.findOne({ 'username' :  username }, function(err, user) {
                // In case of any error, return using the done method
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: '+username);
                    return done(null, false);
                } else {
                    // if there is no user, create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);  
                            throw err;  
                        }
                        console.log(newUser.username + ' Registration successful');    
                        return done(null, newUser);
                    });
                }
            });
         })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};