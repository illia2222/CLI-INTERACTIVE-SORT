import fs from 'fs/promises'

const FILE_NAME = 'data.txt';

export async function createUser(user) {
    await fs.appendFile(FILE_NAME, JSON.stringify(user) + '\n', 'utf8')
}

export async function findAllUsers() { 
    const data = await fs.readFile(FILE_NAME, 'utf8');
    const users = data.split('\n').filter(Boolean).map(JSON.parse);
    return users;
}