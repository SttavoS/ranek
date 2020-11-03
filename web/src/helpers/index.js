export function serialize(object) {
	let queryString = '';
	for (const key in object) {
		queryString += `&${key}=${object[key]}`;
	}

	return queryString;
}

/**
 *
 * @param {fields: Array, base: String, mutation: String} options
 * @returns {Object} object
 */
export function mapFields(options) {
	const object = {};
	for (let increment = 0; increment < options.fields.length; increment++) {
		const field = [options.fields[increment]];

		object[field] = {
			get() {
				return this.$store.state[options.base][field];
			},
			set(value) {
				this.$store.commit(options.mutation, { [field]: value });
			},
		};
	}

	return object;
}
