import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';

export class User extends BaseModel {
  email: string;
  hash: string;
  firstName?: string;
  lastName?: string;
  hashedRT?: string;
  role: Role = 'USER';
}
