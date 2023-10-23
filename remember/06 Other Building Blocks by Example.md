
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