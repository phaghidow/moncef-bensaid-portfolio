# Ajouter un projet

Créez un dossier par projet dans `content/projects/`, avec un nom d'URL simple, par exemple `mon-nouveau-projet/`. Ajoutez-y les deux fichiers `en.json` et `fr.json` en reprenant la structure des dossiers voisins.

Chaque fichier contient les données d'affichage et l'étude de cas dans `caseStudy`. Choisissez un `index` unique pour définir l'ordre dans la liste (par exemple `04`), et définissez `inProgress` à `true` pour afficher le badge de projet en cours. Le slug du dossier devient automatiquement la route `/en/projects/<slug>` et `/projets/<slug>`; le sitemap, l'index et la navigation précédent/suivant sont générés depuis ces dossiers.

Pour présenter des captures ou des vidéos, ajoutez une propriété `media` aux fichiers de langue :

```json
"media": {
  "screenshots": [
    {
      "id": "planning",
      "title": "Planification",
      "description": "Calendrier et suivi des tâches.",
      "images": [
        { "src": "/projects/mon-nouveau-projet/ecran.png", "title": "Calendrier", "alt": "Calendrier du projet" }
      ],
      "upcoming": ["Autre vue à ajouter"]
    }
  ],
  "videos": [
    {
      "src": "/projects/mon-nouveau-projet/demo.mp4",
      "poster": "/projects/mon-nouveau-projet/demo-poster.jpg",
      "title": "Démo",
      "hook": "Une accroche courte tirée du meilleur moment de la vidéo.",
      "description": "Description de la vidéo.",
      "duration": "00:43"
    }
  ],
  "closingGallery": {
    "id": "behind-the-scenes",
    "title": "Dans les coulisses",
    "description": "Quelques moments de conception et de réalisation.",
    "images": [],
    "upcoming": ["Code", "Notes de conception"]
  }
}
```

Les fichiers doivent être placés sous `public/projects/mon-nouveau-projet/`. Utilisez `upcoming` pour afficher les emplacements des visuels qui seront ajoutés plus tard ; `closingGallery` permet de placer un dernier bouquet de coulisses après les médias et juste avant la navigation entre projets. Choisissez pour `poster` une image extraite du passage le plus représentatif, rédigez un `hook` bref et indiquez la durée pour aider le visiteur à choisir. Le lecteur vidéo ne charge le fichier qu’après le clic. Les textes de `title`, `alt`, `hook` et `description` sont localisés dans chaque fichier `fr.json` et `en.json`.

Les galeries affichent jusqu’à trois vignettes ; au-delà, la troisième indique le nombre d’images supplémentaires et ouvre la galerie complète. Une vidéo unique est centrée et mise en avant sans occuper toute la largeur de la page.

Pour ajouter une galerie dédiée aux fichiers exportés entre la vidéo et les coulisses, renseignez `media.exportGallery` avec la même structure qu’un groupe de captures. La propriété optionnelle `centered: true` centre les cartes tout en gardant leur largeur alignée sur celle des vignettes standard.
