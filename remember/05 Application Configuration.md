# 44
npm i @nestjs/config

# 46
npm i @hapi/joi
npm i --save-dev @types/hapi__joi

let's us take advantage of the "joi" package to make sure any important environment variables are validated.
With "Joi", you can define an object schema and validate JavaScript objects against it.

# 49
Each namespace configuration exposes a "key" property, which we can use in order to inject the ENTIRE object to any class, registered within the Nest container.
In addition, ConfigType is a helper Type provided out of the box, which *infers* the return type of our function!
Now we can access this object directly instead of using the get() method. We even have the benefit of strong-typing now.

# 50
Our application is throwing an Error, because our process environment variables are being loaded
AFTER the TypeOrmModule.forRoot() call happens. Thus, all these values DATABASE_HOST, DATABASE_PORT, etc... Will fallback to undefined. 

It can be `async` and it's able to inject dependencies, through the "inject" property.
So in our example, we could even inject the ConfigService and use it here instead of using process .env directly.


Our code works because the asynchronous configuration we added, will be loaded *AFTER* every module registered in the application is resolved. Thus the imports order won't affect anything for our TypeOrmModule anymore.