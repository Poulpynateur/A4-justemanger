# Setup

Le .env à la racine du projet doit contenir les clés suivantes (JWT_ACCESS_SECRET doit être identique a `node-controller`) :
```
PORT=3000

DB_HOST=db-sqlserver
DB_DATABASE=JusteManger
DB_USERNAME=admin
DB_PASSWORD=Password123
```

La clé publique dans `/ressources/public.pem` doit être similaire à `./node-service-auth/ressources/public.pem`.

Générer un secret dans la console pour JWT :
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Installer les dépendances de l'application :
```
npm install
```

# Starting

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
