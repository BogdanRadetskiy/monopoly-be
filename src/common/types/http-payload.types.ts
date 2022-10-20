import { Request } from 'express';
import { User } from 'src/entity/users/entities/user.entity';

export type HttpRequestWithUser = Request & { user: User };

export type MetadataType = {
	userId?: string;
};

export type HttpRequestWithMetadata = Request & { metadata: MetadataType };
