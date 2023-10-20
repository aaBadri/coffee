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