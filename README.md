# Yuki le panda roux

Ce repository git contient l'application Yuki-transmedia, narrant l'aventure de Yuki le panda roux à travers les différents chapitres.

## Installation

Ouvrez Babun ou un autre terminal unix, et tappez

```
$ git clone -b dev git@github.com:michaelz/yuki-transmedia.git # Cloner la branch dev directement
$ cd yuki-transmedia
$ npm install
```

## Lancer l'application

```
$ grunt
```

## GIT Workflow

Utilisation de git pour tous les membres de l'équipe.

Nous utilisons la fonctionnalité des branches dans git. La branche `master` est utilisée pour la production. Une branche `dev` a été créée pour le serveur de développement. 

Pour chaque nouvelle fonctionnalité, il faut créer une nouvelle branche, basée sur la branche `dev`, avec la commande suivante : 

```
$ git checkout -b nom_de_la_branche --track origin/dev`
```
Ceci va créer une nouvelle branche `nom_de_la_branche` et switcher dessus.

La procédure pour les commits reste la même que d'habitude, sauf au niveau du "pull".


```
$ git commit -am "mon message de commit très important car public" # commit 
$ git pull --rebase # correspond à un 'git fetch' suivi d'un 'git rebase' --> mieux que juste git pull, ça évite les merges
$ git push origin nom_de_la_branche # va pousser les modifications sur notre branche vers origin (= github)
```

Une fois que la fonctionnalité est terminée, il faut merger le nouveau code avec la branche `dev`.  Pour cela, on va faire un pull request depuis Github directement.

Le pull request doit être fait entre ***`dev` et `nom_de_la_branche`, et pas avec `master`***. Une fois le pull request crée, on peut contrôler que tout est ok sur Github et merger les modifications.

On a le choix de garder notre branche ou de la supprimer une fois que c'est mergé (si la fonctionnalité n'est pas terminée par exemple mais qu'on a quand même envie de voir les modifications sur `dev`).

C'est M qui s'occupe de mettre en production (= merger `dev` sur `master` et fetcher sur le serveur).


## Documentation

La documentation backend (api routes) est accessible sur `/doc`.  Les commentaires au dessus des controllers se fait de cette manière: 
```
 /**
  * @api {get} /user/:id Request User information
  * @apiName GetUser
  * @apiGroup User
  *
  * @apiParam {Number} id Users unique ID.
  *
  * @apiSuccess {String} firstname Firstname of the User.
  * @apiSuccess {String} lastname  Lastname of the User.
  */
```
Source: [apidocs.com](http://apidocjs.com/#getting-started)
