
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