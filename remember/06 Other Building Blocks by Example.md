
# 53
nest g filter common/filters/http-exception

# 54
Guards have a single responsibility.
Which is to determine whether a given request is allowed access to something.
If the request meets certain conditions, such as permissions, roles, ACLs, etc..
It *will* be allowed access to that route.
If the conditions are *NOT* met, that it will be *denied* and an Error will be thrown.
One of the best use-cases for Guards: is Authentication and Authorization.

nest g guard common/guards/api-key

A guard is just a Class with the
@Injectable decorator which we've seen in previous videos.


One important requirement of guards is that they should implement the `canActivate` interface exported from @nestjs/common.
This interface requires us to provide the canActivate() method within our class.
This canActivate method should return a Boolean, indicating whether the current request is allowed to proceed OR denied access.

# 56
nest g interceptor common/interceptors/wrap-response

Interceptors, have many useful capabilities inspired by the aspect oriented programming technique.
This technique aims to increase modularity by allowing the separation of cross-cut and concerns.
Interceptors achieve this by adding additional behavior to existing code, without modifying the code itself! 
Interceptors make it possible for us to:
1) Bind extra logic before or after method execution.
2) Transform the "Result" returned from a method.
3) Transform the "Exception" thrown from a method.
4) Extend basic method behavior.
5) Or even completely overriding a method - depending on a specific condition. For example doing something like caching various responses.

the rxjs tap() operator doesn't otherwise interfere with the response cycle at all.



there's a potential to do so many other things here:Like passing down version numbers, analytics tracking, etc etc..

interceptors give us an incredible power to manipulate Requests OR Responses, without changing *any* underlying code.


# 58

Pipes have 2 typical use-cases.
1) "Transformation" where we transform *input* data to the desired *output*,
2) And "validation", where we *evaluate* input data and if -valid-, simply pass it through unchanged. If the data is -not valid-, we want to throw an Exception.
In both cases. Pipes operate on the arguments being processed by a Controller's route handler.
NestJS triggers a Pipe just *before* a method is invoked.
Pipes also receive the arguments meant to be passed onto the method.
Any transformation or validation operation takes place at -this- time.
Afterwards the route handler is invoked with any potentially transformed arguments.


For example ValidationPipe, which we've seen in
previous lessons, and ParseArrayPipe, which we

13
00:00:57,680 --> 00:01:03,740
haven't seen but it's an extremely helpful Pipe
that helps us parse and validate Arrays.


nest g pipe common/pipes/validate-uuid

This transform() method has 2 parameters.
`value`: the input value of the currently processed argument before it is received by our route handling method. 
And `metadata`. The metadata of the currently processed argument. Whatever value is returned from this transform
function completely overrides the previous value of the argument.
So when is this useful.

Consider that sometimes the data passed from the client needs to undergo some change, before this data can be properly handled by the route handler method.
Another example use case for pipes would be to provide default values.

Transformer pipes can perform these functions by interposing the transformation function we create between the client request and the request handler.

# 59

Middleware is a function that is called *before* the route handler and any other building blocks are processed. This includes Interceptors, Guards and Pipes.

Middleware functions have access to the Request &amp; Response objects, and are *not* specifically tied to *any method*, but rather to a specified "route path".

Middleware functions can perform the following tasks:
1) Executing code.
2) Making changes to the request and response objects.
3) Ending the request/response cycle.
4) Or even calling the `next()` middleware function in the call stack.

When working with middleware, if the current middleware function does not end the request/response cycle.
It *must* call the `next()` method, which passes control to the next middleware function.
Otherwise the request will be left -hanging-, and never complete.

Custom Nest middleware can be implemented in either a Function or a Class.
Function Middleware is "stateless", it can *not* inject dependencies, and doesn't have access to the Nest container.
On the other hand. Class Middleware can rely on external dependencies and inject providers registered in the same module scope.

For a more realistic use case you could potentially utilize something like what we just created, to log "long lasting methods" to a database, and keep track of how long every API takes to complete.
