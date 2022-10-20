export const prepareDataToUpdate = <T>(request: T): T => {
	Object.keys(request).forEach(key => {
		if (!(typeof request[key] === 'string' ? request[key].length : true) || request[key] === undefined) {
			delete request[key];
		}
	});

	return request;
};
