# Setup

.env file need to contain the following keys :

```
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

DB_HOST=127.0.0.1
DB_DATABASE=database_name
DB_USERNAME=username
DB_PASSWORD=password
```

Generate secret :
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

# Starting

Using the command :
```
npm run dev
```

# Directory structure

* @types : custom typescript types
* logs : app logs

src folder :

* **config** : DB setup, logger setup and .env serialization
* **core** : business logic
  * **models** : DB queries
  * **services** : business logic based on *model*
* **API** : make business logic accessible
  * **middlewares** : middleware definition
  * **routes** : route definition, call *webservice* and apply *middleware*
  * **webservices** : wrap *service* in HTTP request / response
