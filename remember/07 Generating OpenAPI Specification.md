# 61
npm i @nestjs/swagger swagger-ui-express

Let's open up our main.ts file and start setting up swagger by generating a base "document" which will be the base object where our OpenAPI document is contained.

DocumentBuilder from the @nestjs/swagger package, helps us structure a base document that conforms to the OpenAPI specification.

# 62
@nestjs/swagger plugin not only helped us tackle tough issues. But it even figured out almost everything about our endpoints.
Without the plugin, we would have had to put decorators on top of *EVERYTHING* and specified every piece of information, about each item!

The swagger plugin automates all of this, but still gives us the ability to *override* any little thing we want, if we need to.