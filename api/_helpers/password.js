const bcrypt = require('bcrypt');

exports.compare = function(pass, user_pass){
    bcrypt.compare(pass, user_pass, (err, status)=>{
        return status;
    })
}

