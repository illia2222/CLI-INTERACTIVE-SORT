import inquirer from 'inquirer';
import { createUser, findAllUsers } from './db.js';

async function main() {
    while(true) {
        const user = await askUserData();
        if (!user) {
            break;
        }
        await createUser(user);
    }

    const shouldSearch = await askShouldSearch();
    if (shouldSearch) {
        const users = await findAllUsers();
        console.log(users);

        const name = await askNameToSearch();
        const foundUser = users.find(u => u.name === name);
        if (foundUser) {
            console.log(foundUser);
        } else {
            console.log('User not found')
        }
    }
}

async function askUserData() {
    const user = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter users name. To cancel press ENTER:',
        },
        {
            type: 'list',
            name: 'gender',
            message: 'Choose your Gender.',
            choices: ['male', 'female'],
            when: ((answers) => !!answers.name) 
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age',
            validate: (input) => !input || !isNaN(Number(input) && Number(input) > 0),
            when: ((answers) => !!answers.name) 
        }
    ]);
    
    if (!user.name) {
        return null;
    }
    if (!user.age) {
        delete user.age;
    }

    return user;
}

async function askShouldSearch() {
    const { search } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'search',
            message: 'Would you to search value in DB?',
        },
       
    ]);
    return search;
}

async function askNameToSearch() {
    const { searchName } = await inquirer.prompt([
        {
            type: 'name',
            name: 'searchName',
            message: 'Enter users name you wanna search in DB',
        },
       
    ]);
    return searchName;
}

main();