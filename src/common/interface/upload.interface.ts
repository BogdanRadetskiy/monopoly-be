export interface UploadFileResponseType {
	id: string;
	imageName: string;
	mediaLink: string;
	size: number;
	fileId: string;
	url: string;
}

export interface ImageDataType {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	imageName: string;
	buffer: Buffer;
	size: number;
	format: string;
}
