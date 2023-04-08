exports.NotFound =(req,res, next) =>{
    res.render("404", {tittle:"Page not found"})
}