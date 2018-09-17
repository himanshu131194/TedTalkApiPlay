const api = require('../api/api');
module.exports = (app) => {

   const indexRoute = async (req ,res)=>{
     let apiResponce = await api.getAllTalks({
        offset : 3,
        limit : 12,
        ...(req.body) || {}
     });
     let { talks } = apiResponce.data;
     res.render('index.hbs', { talks });
   }
   app.route('/')
      .get(indexRoute)
      .post(indexRoute);






   app.post('/filters', (req, res)=>{

   });
}
