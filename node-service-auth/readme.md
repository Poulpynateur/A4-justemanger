# Setup

Le .env à la racine du projet doit contenir les clés suivantes :
```
PORT=3000

DB_HOST=db-sqlserver
DB_DATABASE=JusteManger
DB_USERNAME=admin
DB_PASSWORD=Password123
```

Créer les clés publique et privé et les mettre dans les fichiers `./ressources/private.key` et `./ressources/public.pem`.

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
