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