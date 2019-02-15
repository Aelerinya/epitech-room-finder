# Epitech room finder

Vous connaissez ce sentiments d'injustice profond, quand vous vous êtes installés confortablement dans une salle, que vous êtes plongés dans votre travail, et qu'un AER arrive pour dire : “S'il vous plait sortez de la salle. Il va y avoir une activité dans dix minutes.”
Et bien maintenant ce problème est résolu ! Avec ce module, vous pourrez vérifier chaque jours quelles salles sont libres afin de ne plus jamais être dérangé !

## Instalation

`npm install epitech-room-finder`

## Utilisation

### Exemple
```javascript
const finder = require('epitech-room-finder')

//Initialize the module
finder.init(token, login, city, roomList)

finder.find(date)
.then(function (list) {
  //Use the available room list
})
.catch(function (err) {
  //An error occured
})
```

### Initialisation
`module.init(token, login, city, roomList)` prend quatre arguments:
- token: lien d'autologin récupéré dans l'onglet administration de l'Intra
- login: adresse mail \@epitech.eu
- city: code en trois lettre de la ville (ex: `LYN` pour Lyon)
- roomList: liste des salles à analyser. Des alias permettent de préciser qu'une salle est inclue dans une autre salle. Cette liste est un objet JSON suivant ce modèle :
```json
{
  "rooms": [
    "salle 1",
    "salle 1.1",
    "salle 2",
    "etc..."
  ],
  "alias": {
    "salle 1.1": "salle 1",
    "salle 1.2": "salle 1",
  }
}
```

### Récupérations des salles

`module.find(date) => Promise(list)`
`date` est une date sour la forme `YYYY-MM-JJ`.
`module.find()` renvoie une Promise qui contient la liste des salles ne contenant aucune activité dans la journée.
