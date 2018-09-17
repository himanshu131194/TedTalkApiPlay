module.exports = (app, db)=>{
   app.get('/talks', async (req ,res)=>{
       let talks = '';
       let projectionFilters = {};
       console.log(req.query);
       if(req.query['ted_name'])
          projectionFilters['main_speaker'] = decodeURIComponent((req.query['ted_name']).trim());
       if(req.query['ted_occupation'])
          projectionFilters['speaker_occupation'] = decodeURIComponent((req.query['ted_occupation']).trim());
       if(req.query['ted_event'])
          projectionFilters['event'] = decodeURIComponent((req.query['ted_event']).trim());
       if(req.query['ted_title'])
          projectionFilters['title'] = decodeURIComponent((req.query['ted_title']).trim());
       if(req.query.offset && req.query.limit){
          let pageNumber = parseInt(req.query.offset), pageSize = parseInt(req.query.limit);
          console.log(projectionFilters);
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
