// /**
//  * Database: lowdb
//  * =====================
//  *
//  * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
//  *
//  * @license: MIT License
//  *
//  */
// import type { TelegramUserInterface } from "../types/databases.type";
// import configs from "../configs/config";
// import lowdb from "lowdb";
// import lowdbFileSync from "lowdb/adapters/FileSync";

// const databases = { users: lowdb(new lowdbFileSync<{ users: TelegramUserInterface[] }>(configs.databases.users)) };

// databases.users = lowdb(new lowdbFileSync(configs.databases.users));
// databases.users.defaults({ users: [] }).write();

// /**
//  * writeUser()
//  * =====================
//  * Write user information from telegram context to user database
//  *
//  * @Context: ctx.update.message.from
//  *
//  * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
//  *
//  * @param { TelegramUserInterface } json - telegram user object
//  *
//  */
// const writeUser = async (json: TelegramUserInterface): Promise<void> => {
//  const user_id = databases.users.get("users").find({ id: json.id }).value();

//  if (user_id) {
//      databases.users.get("users").find({ id: user_id.id }).assign(json).write();
//  } else {
//      databases.users.get("users").push(json).write();
//  }
// };

// export { databases, writeUser };
// export default databases;



import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { Database, User } from '../types/databases.type';

const adapter = new FileSync<Database>(resolve(__dirname, '../../databases/users.json'));
const db = low(adapter);

db.defaults({ users: [] }).write();

export const addUser = (user: User): void => {
  db.get('users').push(user).write();
};

export const getUser = (username: string): User | undefined => {
  return db.get('users').find({ username }).value();
};

export const updateUser = (username: string, updates: Partial<User>): void => {
  db.get('users').find({ username }).assign(updates).write();
};

export default db;
