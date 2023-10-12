# controller

nest generate controller
or
nest g co --no-spec

nest g co modules/abc
--dry-run: simulate creating in cli

# service
help us separate business from logic

nest generate service

nest g s


In NestJS, each service is a "provider". But what do we mean by a "provider"?
Well, the main idea of a provider is that it can inject * dependencies *.
This means that objects can create various relationships to each other, and the logic of wiring up instances of objects together can all be handled by the Nest runtime system...
as opposed to trying to create and manage this type of dependency injection yourself. So what do these providers look like in Nest?
Well, like other things we've seen in Nest, providers are just a class annotated with a decorator called @Injectable().

Our CoffeesService that we just created, will be responsible for data storage and retrieval and is designed to be used by the CoffeesController or anything else that might need this functionality.

# module
create module: nest g module coffees

odules contain FOUR main things:.

First, being Controllers: which you can think of as our API roots that we want this module
to instantiate.
Next, are Exports:Here, we can list Providers within this
current module that should be available anywhere, THIS module is "imported".
Next up, are Imports. Just as we saw in AppModule... The imports Array gives us the ability to list -other- modules that THIS module *requires*. Any exported providers of these imported modules are now -fully available- HERE within this Module as well!
Last is our providers Array. Here we're going to list our services that need to be instantiated by the Nest injector. Any providers here will be available only within THIS module itself... Unless added to the "Exports" Array we saw above!

# dto
A "data transfer object", also known as a DTO.
Is an object that is used to encapsulate data and send it from one application to another.
DTO's help us define the interfaces or input and output within our system.
For example, let's imagine we have a POST request and with DTO's...
We can define the shape or interface for what we're expecting to receive for our body.

Data transfer objects or details are useful in creating a bit of Type safety within our
application.
DTO's let us create a definition for the shape of the data that's coming into the body of an API requests.

NestJS provides the ValidationPipe to
solve this exact problem.
The ValidationPipe provides a convenient way
of enforcing validation rules for all
incoming client payloads.
You can specify these rules by using
a simple annotation in your DTO.


## install
validate dto: npm install class-validator class-transformer
partial extend dto (like partialtype to add @IsOptional() with extension): npm i @nestjs/mapped-types

## 18
It can filter out properties that should NOT be received by a method handler. via "whitelisting". In our main.ts file...
Let's pass in an object inside of ValidationPipe with the key/values whitelist: true inside of it.
In addition to this, the ValidationPipe also gives us the option to STOP a request
from being processed if any non-white listed properties are present. Throwing an error instead.
Let's head back to our main.ts file and add the forbidNonWhitelisted option and set it to
true. This property, in combination with whitelist, will enable this functionality right away.


## 19
it turns out our payload may
be in the "shape" of CreateCoffeeDto,
but it's not actually an *instance*
of our CreateCoffeeDto class just yet.
Lucky for us, ValidationPipe can help us
transform this object into exactly what we're
expecting.
To enable this behavior globally.
Let's head over to our main.ts file,
and set the transform option to
"true", on our global ValidationPipe.


This auto transformation feature also performs primitive Type conversions for things such as booleans and numbers.
this feature of validation is incredibly helpful.
It not only saves us time, but also helps us be more aware of what types we're dealing with... whether they are primitive, like Boolean,Number or even our custom DTO's.