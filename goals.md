# Ce que je veux

Pourvoir depuis n'importe quel composant vue faire l'appel suivant :
```ts
function deleteUser() {
  const isDeletionConfirmed = await createConfirmDialog({
    title: "Supprimer l'utilisateur",
    description: "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
  })

  if (!isDeletionConfirmed) {
    return
  }

  return callApiToDeleteTheUser()
}
```


Je suis en train de plancher sur une idée qui pourrait améliorer l'expérience de développement dans mon application écrite en VueJs 3. J'aimerais qu'il soit possible, depuis n'importe quel composant de mon application, de faire la chose suivante (ceci est un exemple) :
```js
function deleteUser() {
  const isDeletionConfirmed = await createConfirmDialog({
    title: "Supprimer l'utilisateur",
    description: "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
  })

  if (!isDeletionConfirmed) {
    return
  }

  return callApiToDeleteTheUser()
}
```

En résumé, depuis n'importe où, je veux pouvoir faire en sorte de faire afficher une modale de confirmation en appelant une fonction (avec des paramètres comme le titre et la description) et recevoir sous forme de Promise la réponse donnée par l'utilisateur.

J'ai déjà un composant de créé qui permet d'afficher parfaitement une modale de confirmation tout en prenant en propriété un titre et une description. Comment puis-je faire, à partir de ce composant, pour arriver à l'exemple que j'ai donné ci-dessus ?