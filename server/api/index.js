module.exports = (app, db)=>{
   app.get('/talks', async (req ,res)=>{
       let talks = '';
       let projectionFilters = {};
       if(req.query['ted_name'])
          projectionFilters['name'] = (req.query['ted_name']).trim();
       if(req.query['ted_occupation'])
          projectionFilters['speaker_occupation'] = (req.query['ted_occupation']).trim();
       if(req.query['ted_event'])
           projectionFilters['event'] = (req.query['ted_event']).trim();
       if(req.query['ted_title'])
           projectionFilters['title'] = (req.query['ted_title']).trim();
       if(req.query.offset && req.query.limit){
          let pageNumber = parseInt(req.query.offset), pageSize = parseInt(req.query.limit);
          talks = await db.collection('ted')
                          .find(projectionFilters)
                          .skip((pageNumber-1)*pageSize)
                          .limit(pageSize)
                          .toArray();
       }else
          talks = await db.collection('ted').find(projectionFilters).toArray();
       try {
         res.status(200).json({ talks })
       } catch (error) {
         res.status(403).json({ error: error.message })
       }
   });
}
