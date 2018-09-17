const fetch = require('node-fetch')
const { Headers } = fetch

let cookie = null;

const query = (path, ops) => {
	return fetch(`http://localhost:5000/${path}`, {
		method: ops.method,
		body: ops.body,
		credentials: 'include',
		body: JSON.stringify(ops.body),
		headers: new Headers({
			...(ops.headers   || {}),
			cookie,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}),
	}).then(async (r) => {
		cookie = r.headers.get('set-cookie') || cookie
		return {
			data: await r.json(),
			status: r.status
		}
	}).catch(error => error)
}

exports.getAllTalks = (projection=null)=>{
	let queryParams = 'talks', count = 1;
  if(projection){
		 for(key in projection){
			   if(count==1)
				    queryParams += `?${key}=${projection[key]}`;
				 else
				    queryParams += `&${key}=${projection[key]}`
				 ++count;
		 }
     return query(queryParams, { method: 'GET' });
  }
  return query(queryParams, { method: 'GET' });
}



// const login = (username, password) => query('/login', {
// 	method: 'POST',
// 	body: { username, password },
// })
// const logout = () => query('/logout', {
// 	method: 'POST',
// })
// const getProfile = () => query('/profile', {
// 	method: 'GET',
// })
// const changePassword = (password) => query('/changepass', {
// 	method: 'PUT',
// 	body: { password },
// })
// const deleteProfile = () => query('/delete', {
// 	method: 'DELETE',
// })
