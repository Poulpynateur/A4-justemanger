# Mise en place

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

Clean docker :
```
docker-compose down -v --rmi all --remove-orphans
```

Commande dans la BDD :
```
docker-compose exec mongo /bin/bash
```