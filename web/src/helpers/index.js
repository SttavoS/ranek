export default function serialize(object) {
	let queryString = '';
	for (const key in object) {
		queryString += `&${key}=${object[key]}`;
	}

	return queryString;
}
