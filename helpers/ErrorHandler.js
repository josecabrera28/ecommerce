const ErrorHandler=(res, code=403, message)=>{
    res.status(code);
    res.send(message);
}

module.exports = ErrorHandler;