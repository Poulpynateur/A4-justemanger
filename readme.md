# Setup

## Création des .env

Le .env à la racine du projet doit contenir les clés suivantes :
```
MONGO_ROOT_USERNAME=root
MONGO_ROOT_PASSWORD=pass

SQLSERVER_ROOT_PASSWORD=Password123
```

Ìl est aussi nécessaire de créer les .env de `/node-auth` et `/node-service` (instructions dans les readme.md).

## Résolution des noms de domaines

Pour que Nginx puisse traiter les noms de domaines, modifier le fichier (ouvrir depuis un notepad administrateur) :
```
c:\windows\system32\drivers\etc\hosts
```

Et ajouter les noms de domaines utilisés par l'application :
```
127.0.0.1 auth.juste-manger.local
127.0.0.1 service.juste-manger.local
```

# Démarage

Démarrer avec du load-balancing sur 3 instances de test :
```
docker-compose up --scale service=3
```

/!\ `docker-compose up` ne build pas l'image (ne prend pas en compte les modif apporté au Dockerfile) pour cela il faut utilisé :

```
docker-compose build
```

Clean completement docker (pas besoin de up)
```
docker-compose down -v --rmi all --remove-orphans
```

Accèder au shell d'un conteneur :
```
docker-compose exec [nom-container] /bin/bash
```