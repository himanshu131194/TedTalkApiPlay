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
	let query = 'talks?';
  if(projection && Object.keys(projection).length>0){

     return query(`talks?offset=${projection.offset}&limit=${projection.limit}`, { method: 'GET' });
  }
  return query(query, { method: 'GET' });
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
