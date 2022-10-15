import bcrypt from 'bcryptjs';
import { Users } from '@prisma/client';
import jwt from 'jsonwebtoken';

import prisma from '@prisma-client';

export default class UserService {
    public async create(name: string, email: string, password: string): Promise<Users> {
        const hash = await bcrypt.hash(password, 8);

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hash,
            },
        });

        return user;
    }

    public generateToken(user: Users): string {
        const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
            expiresIn: '7d',
        });

        return token;
    }

    public async findByEmail(email: string): Promise<Users | null> {
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    public async checkPassword(password: string, hash: string): Promise<boolean> {
        const passwordMatch = await bcrypt.compare(password, hash);

        return passwordMatch;
    }
}
