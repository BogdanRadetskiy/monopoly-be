export const booleanTransform = ({ value }): boolean => {
	if (value === 'true' || value === '1') return true;
	if (value === 'false' || value === '0') return false;
	return value;
};

export const numberTransform = ({ value }): number => {
	if (typeof value === 'string') return Number(value);
	return value;
};
