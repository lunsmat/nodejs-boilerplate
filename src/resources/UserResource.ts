import { Users } from '@prisma/client';

export default class UserResource
{
    public static toArray(user: Users): object {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        };
    }
}
