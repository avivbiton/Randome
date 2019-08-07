const isNullOrUndefined = require("util").isNullOrUndefined;

const requireBody = (fieldNames) => (req, res, next) => {

    const errors = {};

    for(let i = 0; i < fieldNames.length; i++){
        if(isNullOrUndefined(req.body[fieldNames[i]])) {
            errors[fieldNames[i]] = `${fieldNames[i]} is required`;
        }
    }

    if(Object.keys(errors).length !== 0) {
        res.status(400).json(errors);
    }else {
        next();
    }

};


module.exports = requireBody;

