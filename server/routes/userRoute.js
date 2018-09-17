const api = require('../api/api');
module.exports = (app) => {

   const indexRoute = async (req ,res)=>{
       let offset  = (req.query.offset)? (req.query.offset): 1;
       let limit = (req.query.limit)? req.query.limit: 12;
       let apiResponce = await api.getAllTalks({
          offset : offset,
          limit : limit,
          ...(req.body) || {}
       });
     let { talks } = apiResponce.data;
     console.log(talks);
     res.render('index.hbs', { talks });
   }
   app.route('/')
      .get(indexRoute)
      .post(indexRoute);






   app.post('/filters', (req, res)=>{

   });
}
