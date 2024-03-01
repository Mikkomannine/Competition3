const errorHandler = (err, req, res, next) => {
    console.error(error.message)
    
    response.status(500);
    response.json({
    message: error.message,
    })
  }
  
  module.exports = {
    errorHandler,
  }