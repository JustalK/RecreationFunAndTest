# Errors

### Invalid shorthand property initializer

1. Just change the "=" to ":" in the array

### Can't set headers after they are sent.

1. Throw when I send two codes for a route (so when I do two times res.send(200) by example).
For fixing this, I put a if else on the errors conditions. Because I was sending both 200 and 500.