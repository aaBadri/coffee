# 3
nest g resource users

# 4
npm i bcrypt 
npm i -D @types/bcrypt

nest g resource iam


# 6
npm i @nestjs/jwt

# 11
npm i ioredis

# 12
repl: npm run start -- --entryFile repl
await get("UserRepository").find()
await get("UserRepository").update({}, {role: 'regular'})
await get("UserRepository").update({email:'user1@test.com'}, {role: 'admin'})