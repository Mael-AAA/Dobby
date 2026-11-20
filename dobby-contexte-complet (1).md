# Dobby — Contexte complet du projet (document de référence)

Ce document contient tout ce qui a été décidé sur le projet Dobby : contexte, positionnement, arborescence, contenu de chaque page, CTA, réassurance, application, stack technique et direction artistique (section 21). Le design du robot reste à définir.

Règle : lis ce document avant chaque séance de travail et mets-le à jour après chaque décision validée.

---

## 1. Le projet

- Projet de cours de 3e année de BUT Techniques de Commercialisation, réalisé seul.
- Livrables : le concept de marque, un site vitrine et une application.
- Critères du professeur : pas encore communiqués. Il attend un site propre et une application propre.
- Objectif du site : un effet « wow » dès l'arrivée, puis rassurer sur l'IA et les robots domestiques.
- Pas de vente en ligne : tous les CTA mènent à une demande de devis (la démonstration à domicile est une étape du parcours devis).
- Tout est fictif (marque, chiffres, avis, partenaires, label, médias), mais le projet doit rester crédible de bout en bout : c'est ce qui fera la différence face au jury.
- Le site est codé de zéro avec Claude Code dans VS Code (pas de WordPress, pas de WooCommerce, pas de Polylang).

## 2. Décisions validées

| Sujet | Décision | Pourquoi |
| --- | --- | --- |
| Nom | Dobby. Entreprise : Maison Dobby (fictive), fondée en 2021, lancement commercial en mars 2025 | Nom conservé. Point de vigilance : Dobby est une marque de Warner Bros. Ça passe pour un projet de cours, pas pour un vrai lancement |
| Produit | Assistant domestique de 1,70 m (une seule taille), à partir de 30 000 € | Prix d'appel premium, taille unique pour la cohérence |
| Finitions | Trois finitions : Obsidienne, Nacre, Cuivre (édition limitée) | À confirmer une fois le design du robot défini, et à harmoniser avec la DA (une finition Minuit est envisageable) |
| Vocabulaire | On dit « assistant domestique », jamais « humanoïde » ni « autonome » | Rassurer : on montre la maîtrise, pas la puissance |
| Autonomie | Formule : « Il prend l'initiative, dans le cadre que vous fixez. » | Il agit seul, mais le client garde le contrôle |
| Données | Traitement local par défaut. Seules sortent les instructions envoyées depuis l'application (chiffrées de bout en bout) et les commandes ou réservations validées. Aucune donnée vendue | « 100 % local » était faux, puisque Dobby se pilote à distance et réserve en ligne |
| Regard humain | Aucun opérateur humain ne voit la maison ni ne pilote Dobby. L'assistance n'accède qu'aux diagnostics, avec le code du client | Lever la peur « quelqu'un me regarde à travers ses yeux » |
| Conversion | Un seul CTA : « Demander un devis ». Page « Demande de devis » (pas de panier ni de paiement) | Deux CTA concurrents diluaient la conversion |
| Devis | Justifié par la configuration : finition, nombre de résidences, intégration à la domotique existante, formule de conciergerie | Expliquer pourquoi un devis pour un produit « à partir de 30 000 € » |
| Marchés | France, Suisse, Belgique, Luxembourg, Monaco. Site en français uniquement | Un site en français seul devient cohérent avec des marchés francophones premium |
| Cible | Très hauts patrimoines ultra-connectés (détail en section 3) | « Foyers aisés » était trop large |
| Rôle face au personnel | Dobby ne remplace pas le personnel de maison : il vend la discrétion, la disponibilité 24 h/24 et la continuité entre plusieurs résidences | Cette cible a souvent déjà du personnel |
| Volume | 3 200 foyers équipés et une liste d'attente | Exclusivité plus désirable et chiffre crédible |
| Essai | Essai de 90 jours, satisfait ou remboursé. Le remplacement sous 48 h relève de la garantie | Deux promesses de 90 jours se contredisaient |
| Label | Label Sécurité Domestique Niveau 5, délivré par l'IESD (Institut européen de sécurité domestique, fictif). Niveau 5 = le plus haut | Un label sans organisme n'était pas crédible |
| Pages | « Partenaires » fusionnée dans « La Maison Dobby ». « Avis et réseaux » devient « Témoignages ». Ajout d'une page « L'application » | Pages faibles ou manquantes |
| Écran d'entrée | Écran d'entrée avec son optionnel (voix de Dobby), inspiré du site de Lorenzo Lottici | Effet « wow » |
| Logo | « La présence » : deux yeux ambrés (ovales verticaux) et un sourire, sans tête ni contour. Nom DOBBY en Italiana, espacé de 30 %, sous le symbole ou à sa droite | Simple, épuré, il crée la confiance et annonce le regard du robot |
| Direction artistique | « L'heure bleue » : Minuit en fond, Outremer pour les temps forts, Ambre pour le regard et le bouton principal, Ivoire pour le texte. Italiana pour les titres, Manrope pour le texte (détail en section 21) | Mélange des palettes 1 (Minuit et Ambre) et 5 (Outremer) : premium et rassurant, mais reconnaissable |
| Abandons | Hologramme abandonné. Pas de silhouette d'elfe dans le logo (personnage protégé). Logos « porte entrouverte », dôme, cadran 10 h 10 et visière écartés. Palette noir et cuivre jugée trop basique | Droits d'auteur ; choix de la piste la plus simple |
| Mention | « Projet fictif » dans le pied de page de toutes les pages | Honnêteté et conformité |

## 3. Positionnement

Dobby vend du temps et de la discrétion à des foyers qui ont déjà tout, sauf du temps. La sécurité n'est pas l'argument de vente : c'est la condition pour que le client écoute les autres.

### Cible principale

Les très hauts patrimoines ultra-connectés : dirigeants, entrepreneurs, investisseurs et professions libérales de haut niveau, 35 à 55 ans, en couple avec enfants, propriétaires de plusieurs résidences déjà équipées en domotique.

**Persona : Alexandre et Claire, 46 et 43 ans.** Lui dirige un fonds d'investissement, elle est associée dans un cabinet d'avocats. Deux enfants de 9 et 13 ans, un chat (Plume). Appartement dans le 16e à Paris, chalet à Megève, villa au Cap-Ferret. Une gouvernante à mi-temps. Ils voyagent une semaine sur deux.

- **Ce qui les fatigue :** gérer trois maisons, coordonner le personnel, les imprévus quand ils sont loin.
- **Ce qui les inquiète :** des inconnus dans leur intimité, la sécurité des enfants, la fuite de leurs données.
- **Ce qu'ils achètent vraiment :** la tranquillité d'esprit et des soirées en famille.

Cible secondaire, à évoquer sans la viser : les parents âgés de ces foyers, équipés par leurs enfants pour rester chez eux plus longtemps.

### Le why (cercle d'or)

- **Pourquoi :** le temps est le seul luxe qui ne s'achète pas. Nous voulons le rendre à ceux qui en manquent, sans qu'ils aient à sacrifier leur intimité.
- **Comment :** un assistant qui prend en charge des missions entières, conçu d'abord pour la sécurité, et discret par principe.
- **Quoi :** Dobby, assistant domestique de 1,70 m, à partir de 30 000 €, installé et suivi par un Conseiller dédié.

### Promesse et signature

- **Promesse :** « Votre maison, enfin sous contrôle. Votre temps, enfin à vous. »
- **Signature courte** (logo, réseaux, fin de vidéo) : « Le temps vous appartient. »
- **Question à laquelle le site répond :** « Pourquoi puis-je lui ouvrir ma porte ? »

### Quatre piliers et leurs preuves

| Pilier | Ce qu'on promet | La preuve affichée |
| --- | --- | --- |
| Sécurité | Il ne peut pas blesser | Force limitée mécaniquement, arrêt physique en moins d'une seconde, label IESD Niveau 5 |
| Confidentialité | Ce qui se passe chez vous reste chez vous | Traitement local par défaut, Zones privées, caméras couvertes physiquement, aucun opérateur humain |
| Fiabilité | Il est là quand vous en avez besoin | Garantie Sérénité 10 ans, assistance 24 h/24, remplacement sous 48 h |
| Liberté | Vous récupérez votre temps | 19 h gagnées par semaine en moyenne, missions entières déléguées en une phrase |

### Ton et vocabulaire

Ton premium, sobre et rassurant. Vouvoiement, phrases courtes, aucun jargon technique. Le futur, mais rassurant : on montre la maîtrise, jamais la puissance.

| On dit | On évite |
| --- | --- |
| Assistant domestique | Robot humanoïde, androïde |
| Il prend l'initiative, dans le cadre que vous fixez | Autonome, intelligent, il décide |
| Votre maison, votre intimité | Données, capteurs, algorithmes |
| Confier, déléguer | Remplacer, automatiser |
| Conseiller Dobby | Commercial, technicien |
| À partir de 30 000 €, sur devis | Prix, tarif, promo |

## 4. Le produit

### Ce qui est fixé

- 1,70 m, 58 kg.
- Bouton d'arrêt physique sur la nuque, indépendant du logiciel : arrêt en 0,4 s. Même commande à la voix (« Dobby, stop. ») et dans l'application.
- Volet physique qui couvre les caméras à tout moment.
- Revêtement souple sur les mains, les bras et le torse.
- Il se déplace dans les escaliers, y compris les escaliers en colimaçon standards.
- Recharge sur une station.

### Ce qui reste à définir

- **Le design du robot** (silhouette, tête, regard, matières, détail signature) : prochaine étape. Il doit être simple, pas tout blanc, avoir un petit détail particulier et paraître accueillant, sans tomber dans le jouet ni copier un robot existant (les images de référence fournies montrent le Figure 03 : on s'en inspire pour l'ambiance, pas pour la forme).
- **Contrainte venue du logo :** son visage reprend le symbole. Deux yeux en ovales verticaux qui s'allument en ambre et un sourire lumineux, sur une visière ou une face sombre. Le visage reste abstrait, jamais humain.

### Fiche technique (valeurs fictives)

| Caractéristique | Valeur |
| --- | --- |
| Taille | 1,70 m |
| Poids | 58 kg |
| Autonomie | 18 h, recharge en 3 h sur sa station |
| Vitesse de marche | 3 km/h maximum en intérieur |
| Force de préhension | Limitée mécaniquement à 20 N |
| Niveau sonore | Moins de 35 dB, plus silencieux qu'une bibliothèque |
| Langues comprises | 6, dont français et anglais |
| Connexion | Wi-Fi 7, chiffrement de bout en bout |

### Capacités (les cinq savoir-faire)

Cuisine, entretien, animaux, maison connectée, démarches (détail en section 7.3).

## 5. Chiffres de référence (à reprendre partout à l'identique)

3 200 foyers équipés dans 5 pays · 98 % de satisfaction · 4,9/5 sur 1 840 avis · 19 h gagnées par semaine en moyenne · 0 incident de sécurité depuis le lancement (mars 2025) · arrêt en 0,4 s · 240 collaborateurs · installation sous 4 à 6 semaines.

## 6. Arborescence et navigation

Neuf pages principales et un seul objectif : chaque page mène à la demande de devis. Témoignages et FAQ sortent du menu pour le garder court, mais restent accessibles depuis l'accueil et le pied de page. 65 sections au total.

### Menu

- **Desktop :** logo à gauche, cinq entrées au centre (Découvrir Dobby, Sécurité & confidentialité, L'application, Garanties & services, La Maison Dobby), bouton « Demander un devis » à droite. L'en-tête est fixe et s'affine au défilement.
- **Mobile :** menu plein écran, bouton devis fixé en bas de l'écran.

### Éléments communs à toutes les pages

- Écran de chargement court (une seconde au maximum).
- Sections qui apparaissent lentement au défilement.
- Fin de page : appel au devis, puis pied de page.

### Pages et adresses

| Page | Adresse | Rôle |
| --- | --- | --- |
| Accueil | / | Faire « wow », puis rassurer |
| Découvrir Dobby | /dobby | Montrer ce qu'il fait |
| Sécurité & confidentialité | /securite | Lever les peurs |
| L'application | /application | Montrer le contrôle à distance |
| Garanties & services | /garanties | Supprimer le risque d'achat |
| Témoignages | /temoignages | Preuve sociale |
| La Maison Dobby | /maison-dobby | Histoire, éthique, partenaires |
| FAQ | /faq | Répondre aux objections |
| Demande de devis | /devis | Convertir |
| Pages légales | /mentions-legales, /confidentialite, /cookies, /conditions-garantie | Conformité |
| 404 | — | Clin d'œil « Dobby est libre » |

### Plan détaillé : Accueil (/)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 0 | Écran d'entrée | Logo qui s'allume, « Casque recommandé », deux choix : avec le son, en silence | Avec le son : ambiance douce et voix de Dobby « Bonsoir. Je vous attendais. » |
| 1 | Hero | Dobby dans la pénombre, titre, deux boutons, indicateur « Défiler » | Une lumière balaie la silhouette, puis le regard s'allume ; titre révélé mot par mot |
| 2 | Bandeau de réassurance | 4 engagements | Fondu à l'apparition |
| 3 | Une soirée avec Dobby | 4 horaires, une image par horaire, un téléphone avec le message vocal | Section épinglée : l'image change pendant que les horaires défilent |
| 4 | Ce qu'il fait | 5 cartes savoir-faire, lien vers la page produit | Défilement horizontal des cartes, effet au survol |
| 5 | Pourquoi lui ouvrir votre porte ? | 4 blocs de confiance, gros plan sur le bouton d'arrêt | Les blocs apparaissent un par un ; lien vers Sécurité |
| 6 | Chiffres clés | 3 200 foyers, 19 h, 98 %, 0 incident | Compteurs qui défilent de 0 à la valeur |
| 7 | L'application | Téléphone en main, écran « Nourrir Plume » | L'écran s'allume au défilement ; lien vers L'application |
| 8 | Témoignages | 3 témoignages, note 4,9/5 | Carrousel automatique lent, flèches |
| 9 | Garanties | 4 icônes d'engagement | Fondu ; lien vers Garanties |
| 10 | Appel final | Titre, bouton devis, mention du prix | Bouton mis en valeur par une animation discrète |

### Plan détaillé : Découvrir Dobby (/dobby)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | Hero produit | Dobby en pied, de face, titre | Le robot tourne sur lui-même au défilement (séquence d'images ou 3D) |
| 2 | Lui parler | 3 phrases d'exemple dans des bulles, onde vocale | Les phrases s'écrivent lettre par lettre, l'onde bouge |
| 3 | Les cinq savoir-faire | 5 blocs image et texte en alternance, sommaire 01 à 05 | Sommaire collé sur le côté qui suit la lecture ; images qui se dévoilent |
| 4 | Il apprend votre maison | Plan de maison, texte sur la mémoire effaçable | Le plan se dessine trait par trait |
| 5 | Plusieurs résidences | Carte stylisée Paris, Megève, Cap-Ferret | Les points s'allument et se relient |
| 6 | Fiche technique | Vue éclatée du robot et tableau de 8 caractéristiques | Points annotés qui s'ouvrent au survol |
| 7 | Finitions | 3 pastilles : Obsidienne, Nacre, Cuivre ; mention du prix | Clic sur une pastille : le robot change de finition |
| 8 | Appel | Bouton « Configurer mon devis » | Même bloc que l'accueil |

### Plan détaillé : Sécurité & confidentialité (/securite)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | Hero | Dobby accroupi à hauteur d'un enfant, titre | Fondu lent |
| 2 | Sommaire | 6 ancres : Physique, Arrêt, Confidentialité, Zones privées, Enfants, Certification | Collé en haut, l'ancre active est mise en évidence |
| 3 | Sécurité physique | 4 garanties, schéma des zones de ralentissement autour d'un enfant | Cercles concentriques qui s'étendent |
| 4 | Le bouton d'arrêt | Gros plan sur la nuque, texte, bouton « Essayez » | Clic : l'écran s'assombrit d'un coup, puis « Dobby arrêté en 0,4 s » |
| 5 | Ce qui reste, ce qui sort | Schéma maison et nuage, 5 engagements | Les données restent dans la maison ; seules les instructions chiffrées circulent |
| 6 | Zones privées | Plan de maison, volet des caméras | Deux pièces s'assombrissent ; le volet se ferme |
| 7 | Les enfants | Profils enfants, droits des parents | Fondu |
| 8 | Certification | Échelle IESD de 1 à 5, texte | L'échelle se remplit jusqu'au niveau 5 |
| 9 | Comité d'éthique | 7 silhouettes, texte, lien | Fondu ; lien vers La Maison Dobby |
| 10 | Appel | Boutons FAQ et devis | Même bloc que l'accueil |

### Plan détaillé : L'application (/application)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | Hero | Téléphone au centre, titre | L'écran s'allume au défilement |
| 2 | Confier une tâche | Écran de saisie, raccourcis, photo de confirmation | Démo jouée : « Nourrir Plume » s'écrit, Dobby confirme, la photo arrive |
| 3 | Savoir ce qu'il fait | Journal d'activité, plan avec la position de Dobby | Le journal défile, le point se déplace sur le plan |
| 4 | Garder le contrôle | 4 fonctions en grille, bouton d'arrêt rouge | Survol : chaque fonction s'agrandit |
| 5 | Plusieurs résidences | 3 écrans : Paris, Megève, Cap-Ferret | Glissement d'un écran à l'autre |
| 6 | Disponibilité | Badges App Store et Google Play (non cliquables), remise par le Conseiller | Fondu |
| 7 | Appel | Bouton devis | Même bloc que l'accueil |

### Plan détaillé : Garanties & services (/garanties)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | Hero | « Dix ans de sérénité. Inclus. » | Le chiffre 10 s'écrit en grand, en filigrane |
| 2 | Les engagements | 5 cartes : garantie, essai, assistance, remplacement, mises à jour | Apparition décalée |
| 3 | L'installation | Frise de 5 étapes, de la visite au suivi | La frise se remplit au défilement |
| 4 | Les formules | 3 colonnes : Essentielle, Privée (mise en avant), Résidences | Survol : la colonne se soulève légèrement |
| 5 | Appel | « Construisons votre formule », bouton devis | Même bloc que l'accueil |

### Plan détaillé : Témoignages (/temoignages)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | Hero | Note 4,9/5, 3 200 foyers, 98 % | Compteurs |
| 2 | Filtres | Puces : Vie privée, Enfants, Temps, Résidences, Animaux, Sceptiques | Clic : seules les cartes du thème restent |
| 3 | Les témoignages | 6 cartes avec portrait, citation, nom et ville | Apparition décalée |
| 4 | Témoignage vidéo | Une famille en 60 secondes (visuel fixe si pas de vidéo) | Lecture au clic |
| 5 | Ils en parlent | 2 citations de médias fictifs | Fondu |
| 6 | #MonDobby | Mur de 9 photos, icônes réseaux | Photos qui glissent lentement |
| 7 | Appel | Bouton devis | Même bloc que l'accueil |

### Plan détaillé : La Maison Dobby (/maison-dobby)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | Hero | « Derrière Dobby, une maison. » | Fondu |
| 2 | Notre histoire | Frise 2021, 2023, 2024, mars 2025, aujourd'hui | La frise avance au défilement |
| 3 | Les fondateurs | 2 portraits, une citation chacun | Fondu |
| 4 | Nos engagements | 4 blocs | Apparition décalée |
| 5 | L'atelier | Photo de l'atelier en Haute-Savoie, texte | Zoom très lent sur la photo |
| 6 | Comité d'éthique | 7 rôles, lien vers les avis publiés | Fondu |
| 7 | Partenaires | 5 logos | Bandeau qui défile en continu |
| 8 | Appel | « Rencontrons-nous. », bouton devis | Même bloc que l'accueil |

### Plan détaillé : FAQ (/faq)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | En-tête | Titre, champ de recherche | Filtrage des questions pendant la frappe |
| 2 | Thèmes | 4 onglets : Sécurité, Confidentialité, Utilisation, Acquisition | Clic : changement de liste |
| 3 | Questions | 15 questions en accordéon | Ouverture fluide, une seule ouverte à la fois |
| 4 | Pas trouvé ? | Texte, bouton devis | Même bloc que l'accueil |

### Plan détaillé : Demande de devis (/devis)

| # | Section | Ce qu'on voit | Animation ou interaction |
| --- | --- | --- | --- |
| 1 | En-tête | « Imaginons Dobby chez vous. », durée de 2 minutes | Fondu |
| 2 | Formulaire | 5 étapes, une question par écran, barre de progression, bouton retour | Transition glissante entre les étapes ; validation en direct |
| 3 | Réassurance | Colonne fixe : sans engagement, rappel sous 24 h, confidentialité, prix ; visuel de Dobby | Le visuel change selon la finition choisie |
| 4 | Confirmation | Remerciement, récapitulatif, 3 étapes suivantes | Coche animée |
| 5 | Autres contacts | Téléphone, e-mail, showroom | Aucune |

### Pages légales et 404

Mentions légales, Confidentialité, Cookies et Conditions de garantie : titre et texte, mise en page pensée pour la lecture. Page 404 : chaussette qui flotte, « Dobby est libre », bouton retour.

## 7. Page Accueil

L'accueil raconte une histoire en dix sections : l'effet « wow » d'abord, la confiance ensuite, le devis à la fin. Chaque section a un seul rôle.

### 7.0 Écran d'entrée

- **Visuel :** écran sombre, le logo s'allume.
- **Texte :** Casque recommandé.
- **Choix :** Avec le son · En silence
- **Avec le son :** une ambiance douce, puis la voix de Dobby : « Bonsoir. Je vous attendais. » Le choix est mémorisé et un bouton son reste dans l'en-tête.

### 7.1 Hero

- **Visuel :** Dobby de trois quarts, dans la pénombre. Une lumière balaie lentement sa silhouette, puis son regard s'allume.
- **Sur-titre :** Assistant domestique
- **Titre :** Votre maison, enfin sous contrôle. Votre temps, enfin à vous.
- **Texte :** Dobby prend en charge votre maison, de la cuisine au soin de vos animaux. Vous lui parlez, il s'en occupe.
- **Boutons :** Demander un devis (principal) · Découvrir Dobby (secondaire)

### 7.2 Bandeau de réassurance

Quatre engagements sur une ligne, juste sous le hero : Garantie Sérénité 10 ans · Essai 90 jours · Arrêt physique en moins d'une seconde · Traitement local de vos données.

### 7.3 Une soirée avec Dobby

Récit au défilement : chaque heure s'affiche quand on descend.

- **Titre :** Vous rentrez. Tout est prêt.
- **17 h 52, dans le train :** « Dobby, nous serons six samedi. Claire ne mange pas de viande. »
- **18 h 10 :** Dobby compose le menu, commande les produits et réserve le fleuriste.
- **18 h 45 :** Plume a mangé. Le linge est plié. La température monte à 21 °C.
- **19 h 30 :** Vous ouvrez la porte. La lumière est douce, le dîner est servi.
- **Phrase de fin :** Vous n'avez rien demandé d'autre. Ou presque.

### 7.4 Ce qu'il fait pour vous

- **Titre :** Une phrase suffit.
- **Texte :** Les assistants vocaux exécutent des commandes. Dobby prend en charge des missions entières.
- **Cinq cartes :**
  1. **Cuisine :** du petit-déjeuner au dîner de douze couverts, selon les goûts de chacun.
  2. **Entretien :** ménage, linge, rangement, au rythme de votre maison.
  3. **Animaux :** repas, eau, promenade du jardin, et une photo quand vous êtes loin.
  4. **Maison connectée :** lumière, chauffage, alarme et volets, pilotés d'une seule voix.
  5. **Démarches :** courses, réservations, rendez-vous, toujours soumis à votre accord.
- **Lien :** Voir tout ce que fait Dobby

### 7.5 Pourquoi lui ouvrir votre porte ?

- **Titre :** Pourquoi lui ouvrir votre porte ?
- **Texte :** Parce que nous avons conçu Dobby dans cet ordre : d'abord la sécurité, ensuite le service.
- **Quatre blocs :**
  - **Il ne peut pas blesser.** Sa force est limitée mécaniquement, pas seulement par logiciel.
  - **Vous gardez la main.** Un bouton physique l'arrête en moins d'une seconde.
  - **Votre intimité reste chez vous.** Ce qu'il voit et entend est traité dans la maison.
  - **Certains lieux lui sont interdits.** Vous définissez des Zones privées où il n'entre jamais.
- **Lien :** Tout savoir sur la sécurité

### 7.6 Les chiffres

Quatre compteurs animés : 3 200 foyers équipés · 19 h rendues chaque semaine · 98 % de clients satisfaits · 0 incident de sécurité.

### 7.7 L'application

- **Visuel :** téléphone dans une main, écran « Nourrir Plume », Dobby en arrière-plan flouté.
- **Titre :** Même loin, vous êtes chez vous.
- **Texte :** Une tâche oubliée ? Confiez-la à Dobby depuis l'application. Il vous confirme quand c'est fait.
- **Lien :** Découvrir l'application

### 7.8 Témoignages

- **Titre :** Ils ont ouvert leur porte.
- **Carrousel de trois témoignages** (textes en section 12), note 4,9/5 et lien vers #MonDobby.

### 7.9 Garanties

- **Titre :** Un engagement de dix ans.
- **Quatre icônes :** Garantie Sérénité 10 ans · Essai 90 jours, satisfait ou remboursé · Assistance 24 h/24 · Remplacement sous 48 h.

### 7.10 Appel final

- **Titre :** Votre temps commence ici.
- **Texte :** Un Conseiller Dobby vous rappelle sous 24 h pour imaginer Dobby chez vous. Sans engagement.
- **Bouton :** Demander un devis
- **Mention :** À partir de 30 000 €. Installation sous 4 à 6 semaines.

## 8. Page Découvrir Dobby

Cette page répond à « qu'est-ce qu'il fait, concrètement ? ». Elle démontre, sans jargon, puis oriente vers le devis.

### 8.1 Hero produit

- **Visuel :** Dobby de face, en pied, qui tourne lentement sur lui-même au défilement (rendu 3D ou séquence d'images).
- **Titre :** Présent quand il faut. Discret le reste du temps.
- **Texte :** 1,70 m, une voix posée, des gestes mesurés. Dobby a été dessiné pour se fondre dans les plus belles maisons.

### 8.2 Lui parler

- **Titre :** Parlez-lui comme à un proche.
- **Texte :** À la maison, de vive voix. Ailleurs, par message depuis l'application. Il comprend les demandes simples comme les missions complètes.
- **Exemples affichés :** « Prépare le chalet pour vendredi soir. » · « Les enfants rentrent à 17 h, il faut un goûter. » · « Réserve une table pour quatre, jeudi, pas trop loin. »

### 8.3 Les cinq savoir-faire

Une section par capacité, visuel d'un côté et texte de l'autre, en alternance.

1. **Cuisine.** Il connaît les goûts, les allergies et les régimes de chacun. Il cuisine plus de 2 000 recettes et apprend les vôtres.
2. **Entretien.** Ménage, linge, repassage, rangement. Il respecte vos matières nobles et l'ordre de vos objets.
3. **Animaux.** Repas à heure fixe, eau fraîche, litière, jeu. Il signale tout changement de comportement.
4. **Maison connectée.** Il s'intègre à vos équipements existants et orchestre lumière, climat, sécurité et volets.
5. **Démarches.** Courses, réservations, rendez-vous et prestataires. Au-delà du budget que vous fixez, il demande votre accord.

### 8.4 Il apprend votre maison

- **Titre :** Chaque jour, un peu plus chez lui. Toujours selon vos règles.
- **Texte :** Vos habitudes, les goûts de chacun, le caractère du chat. Dobby apprend, et tout ce qu'il apprend reste dans votre maison. Vous pouvez tout consulter et tout effacer depuis l'application.

### 8.5 Plusieurs résidences, un seul Dobby

- **Titre :** Arrivez dans une maison qui vous attend.
- **Texte :** Vous avez plusieurs résidences ? Chaque Dobby connaît la sienne, et vous les pilotez depuis la même application. Avant votre arrivée, il aère, chauffe et remplit le réfrigérateur.

### 8.6 Fiche technique

Tableau sobre (valeurs en section 4), avec une vue éclatée du robot annotée.

### 8.7 Finitions

- **Titre :** Trois finitions, une seule exigence.
- **Finitions :** Obsidienne, Nacre, Cuivre (édition limitée).
- **Mention :** À partir de 30 000 €. Le prix final dépend de la finition, du nombre de résidences et de la formule de conciergerie.
- **Bouton :** Configurer mon devis

## 9. Page Sécurité & confidentialité

C'est la page la plus importante du site : elle répond à la peur avant qu'elle soit formulée. Ton factuel, preuves visibles, aucune promesse floue.

### 9.1 Hero

- **Titre :** Conçu pour vivre parmi les vôtres.
- **Texte :** Un assistant qui vit chez vous doit mériter votre confiance chaque jour. Voici comment Dobby la mérite.

### 9.2 Sécurité physique

- **Titre :** Il ne peut pas blesser. Par construction.
- **Points :**
  - Force et vitesse limitées mécaniquement : aucune mise à jour ne peut lever ces limites.
  - Revêtement souple sur les mains, les bras et le torse.
  - Il ralentit puis s'arrête dès qu'un enfant ou un animal s'approche trop près.
  - Aucun objet tranchant manipulé en présence d'un enfant.

### 9.3 Le bouton d'arrêt

- **Visuel :** gros plan animé sur le bouton situé sur la nuque.
- **Titre :** Un geste, et tout s'arrête.
- **Texte :** Un bouton physique, indépendant du logiciel, coupe Dobby en moins d'une seconde. La même commande existe dans l'application et à la voix : « Dobby, stop. »

### 9.4 Confidentialité

- **Titre :** Ce qui se passe chez vous reste chez vous.
- **Points :**
  - **Traitement local par défaut.** Images et sons sont analysés dans Dobby, jamais envoyés sur nos serveurs.
  - **Ce qui sort, et seulement ça.** Vos instructions envoyées depuis l'application, et les commandes que vous avez validées. Tout est chiffré de bout en bout.
  - **Aucun regard humain.** Aucun employé ne peut voir votre maison ni piloter Dobby à distance.
  - **Aucune donnée vendue.** Ni aujourd'hui, ni demain. C'est écrit dans votre contrat.
  - **Tout est effaçable.** Vous consultez et supprimez ce que Dobby a appris, depuis l'application.

### 9.5 Zones privées

- **Visuel :** plan de maison animé, une chambre et une salle de bains s'assombrissent.
- **Titre :** Certaines portes restent fermées.
- **Texte :** Dessinez sur le plan les pièces où Dobby n'entre jamais. À tout moment, un volet couvre ses caméras : vous le voyez, il ne voit plus.

### 9.6 Les enfants

- **Titre :** Pensé pour les familles.
- **Texte :** Profils enfants avec des demandes limitées, aucun achat possible, aucun déplacement hors de la maison. Les parents gardent la main sur tout.

### 9.7 Certification

- **Titre :** Le premier assistant domestique certifié Niveau 5.
- **Texte :** Le label Sécurité Domestique de l'IESD (Institut européen de sécurité domestique) compte cinq niveaux. Dobby est le premier à atteindre le plus haut, après 14 mois de tests indépendants.
- **Échelle affichée :** Niveau 1 : usage sans présence humaine · Niveau 3 : usage en présence d'adultes · Niveau 5 : usage en présence d'enfants et d'animaux.

### 9.8 Comité d'éthique

- **Texte :** Un comité indépendant de sept experts (droit, médecine, philosophie, cybersécurité) valide chaque nouvelle capacité avant sa sortie. Ses avis sont publiés.
- **Lien :** La Maison Dobby

### 9.9 Appel

- **Titre :** Vous avez une question précise ?
- **Boutons :** Lire la FAQ · Demander un devis

## 10. Page L'application

Cette page fait le lien entre le site et l'application, qui est l'autre livrable du projet. Le message : Dobby vous suit partout, et vous gardez toujours la main.

### 10.1 Hero

- **Visuel :** téléphone au centre, l'écran s'allume au défilement.
- **Titre :** Votre maison tient dans votre main.
- **Texte :** L'application Dobby vous permet de lui confier une tâche, de savoir ce qu'il fait et de l'arrêter, où que vous soyez.

### 10.2 Confier une tâche

- **Titre :** Un oubli ? Deux secondes suffisent.
- **Texte :** Écrivez ou dictez votre demande, ou choisissez un raccourci : « Nourrir Plume », « Lancer une lessive », « Préparer le dîner ». Dobby confirme, exécute, puis vous envoie une photo quand c'est fait.

### 10.3 Savoir ce qu'il fait

- **Titre :** Tout est visible. Rien n'est caché.
- **Texte :** Le journal d'activité liste chaque action, à la minute près. Vous voyez où il se trouve sur le plan de la maison.

### 10.4 Garder le contrôle

- **Titre :** Vos règles, toujours.
- **Points :** arrêt à distance en un geste · Zones privées dessinées sur le plan · validation obligatoire au-delà du budget fixé · profils pour chaque membre de la famille.

### 10.5 Plusieurs résidences

- **Titre :** Paris, Megève, Cap-Ferret. Une seule application.
- **Texte :** Passez d'une maison à l'autre d'un glissement. Demandez à Dobby de préparer le chalet avant votre arrivée.

### 10.6 Téléchargement

- **Texte :** L'application est réservée aux foyers équipés. Elle vous est remise et configurée par votre Conseiller le jour de l'installation.
- **Badges :** App Store · Google Play (visuels non cliquables, projet fictif)
- **Bouton :** Demander un devis

## 11. Page Garanties & services

Cette page transforme un achat à 30 000 € en décision sans risque. Elle détaille chaque engagement et le service qui accompagne Dobby pendant dix ans.

### 11.1 Hero

- **Titre :** Dix ans de sérénité. Inclus.
- **Texte :** Acquérir Dobby, c'est aussi s'assurer qu'il ne vous fera jamais défaut. Voici nos engagements, écrits noir sur blanc dans votre contrat.

### 11.2 Les engagements

| Engagement | Ce qu'il couvre |
| --- | --- |
| Garantie Sérénité 10 ans | Pièces, main-d'œuvre et déplacement inclus. Batterie remplacée gratuitement à 5 ans. Garantie adossée à Atrium Assurances, maintenue même en cas de défaillance de la marque. |
| Essai 90 jours | Satisfait ou remboursé : nous reprenons Dobby et vous remboursons intégralement. |
| Assistance 24 h/24 | Un Conseiller joignable jour et nuit, par téléphone ou depuis l'application. |
| Remplacement sous 48 h | Si Dobby doit partir en atelier, un Dobby de remplacement arrive chez vous en 48 h, déjà configuré. |
| Mises à jour à vie | Nouvelles capacités et correctifs de sécurité, sans frais, validés par le comité d'éthique. |

### 11.3 L'installation

- **Titre :** Un Conseiller, du premier appel à la dixième année.
- **Étapes :**
  1. **Visite à domicile :** votre Conseiller découvre votre maison et vos habitudes.
  2. **Cartographie :** Dobby apprend chaque pièce. Vous définissez les Zones privées.
  3. **Intégration :** connexion à vos équipements existants (lumière, chauffage, alarme).
  4. **Prise en main :** deux jours aux côtés de votre famille, enfants compris.
  5. **Suivi :** un point à 30 jours, puis chaque année.

### 11.4 Les formules de conciergerie

Trois formules, toutes sur devis. Elles justifient l'écart entre le prix d'appel et le prix final.

| Formule | Pour qui | Ce qu'elle ajoute |
| --- | --- | --- |
| Essentielle | Une résidence | Incluse : installation, assistance 24 h/24, garantie 10 ans |
| Privée | Familles très actives | Conseiller dédié joignable en direct, visite trimestrielle, apprentissage de vos recettes de famille |
| Résidences | Plusieurs maisons | Un Dobby par résidence, synchronisation des préférences, préparation avant chaque arrivée |

### 11.5 Appel

- **Titre :** Construisons votre formule.
- **Bouton :** Demander un devis

## 12. Page Témoignages

Chaque témoignage lève une peur précise. C'est plus convaincant qu'une suite de « super produit », et ça montre au jury que les avis ont été pensés stratégiquement. Noms, villes et médias sont fictifs.

### 12.1 Hero

- **Titre :** Ils ont ouvert leur porte.
- **Texte :** 3 200 foyers vivent avec Dobby. 98 % le recommanderaient. Voici ce qu'ils en disent.
- **Note :** 4,9/5 sur 1 840 avis vérifiés.

### 12.2 Six témoignages

| Peur levée | Témoignage | Auteur |
| --- | --- | --- |
| Vie privée | « J'avais peur d'avoir des yeux dans ma maison. Le jour de l'installation, j'ai fermé notre chambre. Il n'y est jamais entré. » | Hélène V., Neuilly-sur-Seine |
| Enfants | « Nos jumeaux ont 6 ans. Dobby ralentit dès qu'ils courent vers lui. Ils l'appellent par son prénom, comme un membre de la famille. » | Thomas et Julie R., Genève |
| Temps | « Je rentrais à 21 h et je gérais encore la maison. Aujourd'hui, mes soirées sont à mes enfants. » | Karim B., Paris 7e |
| Plusieurs résidences | « Quand nous arrivons au chalet, le feu est allumé et le réfrigérateur est plein. Je n'ai rien eu à organiser. » | Famille D., Megève |
| Animaux | « En déplacement, j'ai oublié le repas du chien. Deux secondes sur l'application, une photo de lui en train de manger. » | Sophie L., Bruxelles |
| Scepticisme | « J'étais le plus réticent de la famille. Trois mois après, je ne reviendrais pas en arrière. » | Marc-Antoine F., Monaco |

### 12.3 Ils en parlent

Citations de médias fictifs (ne jamais attribuer de fausse citation à un vrai média) :

- *Maison & Futur :* « Le premier robot domestique qu'on a envie de présenter à ses invités. »
- *L'Observateur du Luxe :* « Dobby ne vend pas de la technologie. Il vend des soirées. »

### 12.4 #MonDobby

- **Titre :** Leur quotidien, en images.
- **Contenu :** mur de 9 photos façon Instagram (Dobby qui dresse une table, joue avec un chat, ouvre des volets au lever du soleil).
- **Texte :** Partagez vos moments avec #MonDobby.
- **Liens :** Instagram · LinkedIn · YouTube (icônes)

### 12.5 Appel

- **Titre :** Et si votre famille était la prochaine ?
- **Bouton :** Demander un devis

## 13. Page La Maison Dobby

Cette page met des visages et une histoire derrière la machine : on confie sa maison à des gens, pas à un robot. Elle regroupe l'à propos, l'éthique et les partenaires.

### 13.1 Hero

- **Titre :** Derrière Dobby, une maison.
- **Texte :** Nous ne fabriquons pas des robots. Nous rendons du temps aux familles, avec le plus grand respect pour ce qu'elles ont de plus précieux.

### 13.2 Notre histoire

- **2021 :** Élise Marchand, ingénieure en robotique, et Hugo Valcourt, ancien directeur d'un palace parisien, fondent la Maison Dobby à Paris. Leur conviction : le vrai luxe, c'est un service qu'on ne remarque pas.
- **2023 :** premier prototype testé dans 40 familles volontaires pendant un an.
- **2024 :** certification Sécurité Domestique Niveau 5 par l'IESD, une première.
- **Mars 2025 :** lancement commercial en France, en Suisse, en Belgique, au Luxembourg et à Monaco.
- **Aujourd'hui :** 3 200 foyers équipés, 240 collaborateurs.

### 13.3 Nos engagements

- **La sécurité avant la performance.** Une capacité qui ne passe pas nos tests de sécurité ne sort pas.
- **L'intimité comme principe.** Notre modèle économique ne repose pas sur vos données. Il repose sur votre satisfaction.
- **La transparence.** Les avis de notre comité d'éthique sont publics.
- **Le savoir-faire.** Dobby est assemblé en Haute-Savoie, au cœur de la vallée de l'Arve, réputée pour sa mécanique de précision.

### 13.4 Comité d'éthique

Sept experts indépendants : deux juristes, une médecin pédiatre, un philosophe, deux spécialistes en cybersécurité, une représentante d'association de consommateurs. Ils valident chaque nouvelle capacité et peuvent bloquer une mise à jour.

### 13.5 Nos partenaires (tous fictifs)

| Partenaire | Rôle |
| --- | --- |
| IESD | Certification de sécurité |
| Lumen Habitat | Intégration domotique |
| Atrium Assurances | Assurance habitation adaptée aux foyers équipés, garantie de la Garantie Sérénité |
| Studio Verrière | Architecture d'intérieur, finitions sur mesure |
| Conciergerie Alcôve | Services de conciergerie haut de gamme |

### 13.6 Appel

- **Titre :** Rencontrons-nous.
- **Bouton :** Prendre rendez-vous au showroom

## 14. Page FAQ

Quinze questions en accordéon, classées en quatre thèmes, avec un champ de recherche en haut. Les réponses tiennent en deux ou trois phrases.

**Titre :** Vos questions, nos réponses.

### Sécurité

1. **Dobby peut-il blesser quelqu'un ?** Non. Sa force et sa vitesse sont limitées mécaniquement, et il s'arrête dès qu'une personne s'approche trop près. Aucune mise à jour ne peut lever ces limites.
2. **Comment l'arrêter en urgence ?** Trois façons : le bouton physique sur sa nuque, la commande « Dobby, stop », ou le bouton d'arrêt de l'application. L'arrêt prend moins d'une seconde.
3. **Peut-on le laisser seul avec les enfants ?** Dobby est certifié pour vivre en présence d'enfants, mais il n'est pas une nounou. Il ne remplace pas la surveillance d'un adulte.
4. **Que se passe-t-il en cas de panne de courant ?** Il continue grâce à sa batterie, puis se met en sécurité sur sa station.

### Confidentialité

5. **Mes conversations sont-elles enregistrées ?** Elles sont traitées dans Dobby, puis effacées. Rien n'est envoyé sur nos serveurs sans votre accord.
6. **Quelqu'un peut-il voir chez moi à travers ses caméras ?** Non. Aucun employé n'a accès à ses caméras. Vous pouvez les couvrir à tout moment.
7. **Et si Dobby est piraté ?** Ses fonctions de sécurité sont mécaniques, donc hors de portée d'un pirate. Ses communications sont chiffrées de bout en bout et auditées chaque année.
8. **Puis-je effacer ce qu'il a appris ?** Oui, en partie ou en totalité, depuis l'application.

### Utilisation

9. **Faut-il une maison connectée ?** Non. Dobby fonctionne seul, et s'intègre à vos équipements si vous en avez.
10. **Fonctionne-t-il dans les escaliers ?** Oui, y compris les escaliers en colimaçon standards. Votre Conseiller le vérifie lors de la visite.
11. **Comment s'entend-il avec mon personnel de maison ?** Très bien. Il prend les tâches répétitives et laisse à votre personnel ce qui demande une attention humaine.

### Acquisition et services

12. **Combien coûte Dobby ?** À partir de 30 000 €. Le prix final dépend de la finition, du nombre de résidences et de la formule choisie.
13. **Pourquoi passer par un devis ?** Parce que chaque maison est différente. Votre Conseiller construit la configuration adaptée à la vôtre.
14. **Quel est le délai d'installation ?** 4 à 6 semaines après la signature.
15. **Et si je ne suis pas satisfait ?** Vous disposez de 90 jours d'essai. Nous reprenons Dobby et vous remboursons intégralement.

**Bas de page :** Vous ne trouvez pas votre réponse ? Un Conseiller vous répond 24 h/24. Bouton : Un Conseiller vous répond.

## 15. Page Demande de devis

C'est la page de conversion. Un formulaire en cinq étapes, une seule question visible à la fois, avec une barre de progression. C'est plus engageant qu'un long formulaire, et chaque réponse aide le Conseiller à préparer l'appel.

### 15.1 En-tête

- **Titre :** Imaginons Dobby chez vous.
- **Texte :** Quelques questions, deux minutes. Votre Conseiller vous rappelle sous 24 h, sans engagement.

### 15.2 Les étapes

1. **Votre foyer :** nombre de résidences (1, 2, 3 ou plus), type (appartement, maison, chalet ou villa), surface, nombre de personnes, enfants (oui ou non), animaux (aucun, chat, chien, autre).
2. **Vos priorités :** cases à cocher parmi les cinq savoir-faire, puis « Votre maison est-elle déjà connectée ? ».
3. **Votre finition :** Obsidienne, Nacre ou Cuivre, avec un visuel de Dobby qui change au clic.
4. **Votre formule :** Essentielle, Privée ou Résidences.
5. **Vos coordonnées :** civilité, nom, prénom, e-mail, téléphone, pays (France, Suisse, Belgique, Luxembourg, Monaco), créneau de rappel préféré, case de consentement au traitement des données.

### 15.3 Colonne de réassurance

Visible pendant tout le formulaire : sans engagement · rappel sous 24 h · vos réponses restent confidentielles · à partir de 30 000 €.

### 15.4 Confirmation

- **Titre :** Merci. Votre temps commence ici.
- **Texte :** Votre Conseiller vous appelle sous 24 h. Voici la suite :
  1. Un appel de 20 minutes pour comprendre vos besoins.
  2. Une démonstration chez vous, avec Dobby.
  3. Votre devis détaillé sous 72 h.
- **Récapitulatif** des réponses données.

### 15.5 Autres moyens de contact

Téléphone, e-mail et adresse du showroom (fictifs), sous le formulaire : Maison Dobby, 12 avenue Montaigne, 75008 Paris. Sur rendez-vous.

## 16. Pied de page, pages légales et page 404

### 16.1 Pied de page (toutes les pages)

- **Haut :** logo, signature « Le temps vous appartient. », bouton Demander un devis.
- **Colonne Dobby :** Découvrir Dobby · Sécurité & confidentialité · L'application · Garanties & services
- **Colonne Maison :** La Maison Dobby · Témoignages · FAQ
- **Colonne Contact :** Demande de devis · téléphone 24 h/24 · showroom sur rendez-vous · Instagram, LinkedIn, YouTube
- **Réassurance :** label IESD Niveau 5 et « Garantie 10 ans ».
- **Bas :** Mentions légales · Confidentialité · Cookies · Conditions de garantie · © 2026 Maison Dobby
- **Mention obligatoire :** « Projet fictif réalisé dans le cadre du BUT Techniques de Commercialisation. Marque, chiffres, avis et partenaires sont imaginaires. Dobby est un personnage créé par J.K. Rowling. »

### 16.2 Pages légales

Pages simples, texte seul, même mise en page.

- **Mentions légales :** éditeur (Maison Dobby SAS, fictive), hébergeur, directeur de publication.
- **Confidentialité :** données collectées par le formulaire de devis, finalité, durée de conservation, droits RGPD.
- **Cookies :** bandeau discret en bas de page (Accepter · Refuser · Personnaliser).
- **Conditions de garantie :** le détail des engagements de la section 11.

### 16.3 Page 404 (clin d'œil pour le jury)

- **Visuel :** une chaussette qui flotte lentement dans le vide.
- **Titre :** Dobby est libre.
- **Texte :** Cette page a reçu une chaussette, et elle est partie. Revenons en terrain connu.
- **Bouton :** Retour à l'accueil

## 17. Plan des CTA

Chaque page a ses propres appels, adaptés à ce que le visiteur vient de lire et à l'endroit où il se trouve dans la page. Tous mènent au formulaire de devis, mais avec un libellé et un préremplissage différents.

### Règles communes

- **En-tête :** « Demander un devis », identique partout. C'est le repère fixe.
- **Barre collante sur mobile :** apparaît après le hero, disparaît sur la page devis.
- **Micro-réassurance :** une ligne sous chaque bouton principal (sans engagement, délai de rappel, prix).
- **Lien suivi :** chaque CTA envoie vers `/devis?source=page-position`, plus un paramètre de préremplissage quand c'est utile (`finition`, `formule`, `motif`). Le formulaire s'ouvre déjà personnalisé.
- **Interdits :** pop-up de sortie, compte à rebours, « offre limitée ». Une clientèle très aisée fuit la pression commerciale.

### CTA par page et par hauteur

| Page | Hauteur | Bouton | Micro-réassurance | Lien |
| --- | --- | --- | --- | --- |
| Accueil | Hero | Demander un devis · secondaire : Le voir en action | Sans engagement · rappel sous 24 h | /devis?source=accueil-hero |
| Accueil | Après « Pourquoi lui ouvrir votre porte ? » | Le rencontrer chez vous | Démonstration à domicile, sans engagement | /devis?source=accueil-confiance&motif=demo |
| Accueil | Fin | Demander mon devis | À partir de 30 000 € · installation sous 4 à 6 semaines | /devis?source=accueil-fin |
| Découvrir Dobby | Hero | Configurer mon Dobby | Deux minutes, sans engagement | /devis?source=dobby-hero |
| Découvrir Dobby | Après les savoir-faire | Construire mon devis | Votre Conseiller adapte Dobby à votre maison | /devis?source=dobby-savoirfaire |
| Découvrir Dobby | Finitions | Mon devis en Nacre (le libellé suit la finition choisie) | Prix final selon finition et formule | /devis?source=dobby-finition&finition=nacre |
| Sécurité | Hero | Poser une question à un Conseiller | Réponse sous 24 h, sans engagement | /devis?source=securite-hero&motif=question |
| Sécurité | Après le test du bouton d'arrêt | Le tester en vrai, chez vous | Démonstration à domicile | /devis?source=securite-arret&motif=demo |
| Sécurité | Fin | Parler à un Conseiller · secondaire : Lire la FAQ | Vos questions restent confidentielles | /devis?source=securite-fin&motif=question |
| L'application | Après la démo | Voir l'application en démonstration | Présentée par votre Conseiller | /devis?source=appli-demo&motif=demo |
| L'application | Fin | Demander mon devis | L'application est incluse | /devis?source=appli-fin |
| Garanties | Chaque formule | Choisir Essentielle / Privée / Résidences | Modifiable à tout moment avec votre Conseiller | /devis?source=garanties&formule=privee |
| Garanties | Fin | Construire ma formule | Garantie 10 ans incluse | /devis?source=garanties-fin |
| Témoignages | Après les témoignages | Rejoindre ces familles | 98 % de clients satisfaits | /devis?source=temoignages |
| La Maison Dobby | Fin | Prendre rendez-vous au showroom | Paris, sur rendez-vous | /devis?source=maison&motif=showroom |
| FAQ | Fin de chaque thème et fin de page | Un Conseiller vous répond | 24 h/24 | /devis?source=faq&motif=question |
| Demande de devis | Dernière étape | Envoyer ma demande | Rappel sous 24 h · données jamais revendues | — |
| 404 | Centre | Retour à l'accueil | — | / |

### Ce que le formulaire fait des paramètres

- `finition` et `formule` : l'étape correspondante est déjà cochée.
- `motif=demo` : titre « Organisons votre démonstration ».
- `motif=question` : une étape « Votre question » (champ libre) s'ajoute au début.
- `motif=showroom` : choix d'un créneau au showroom à la dernière étape.
- `source` : enregistré avec la demande. Pour l'oral, ça montre qu'on sait quelle page convertit le mieux.

## 18. Réassurance : chaque peur a sa réponse

Dix peurs ont été identifiées. Chacune reçoit une réponse courte, une preuve concrète et une place précise sur le site. Aucune peur ne doit rester sans réponse à plus d'un clic.

| Peur | Réponse | Preuve | Où |
| --- | --- | --- | --- |
| « Il peut blesser mes enfants ou mes animaux. » | Il ne peut pas blesser, par construction. | Force limitée à 20 N, ralentissement automatique, label IESD Niveau 5 | Accueil 5 · Sécurité 3 et 8 · FAQ 1 et 3 |
| « Je ne pourrai pas l'arrêter. » | Un geste suffit. | Bouton physique, arrêt en 0,4 s, démo à tester | Hero de l'accueil · Sécurité 4 · Application 4 |
| « On va m'espionner. » | Ce qui se passe chez vous reste chez vous. | Traitement local, aucun opérateur humain, volet sur les caméras, Zones privées | Accueil 5 · Sécurité 5 et 6 · FAQ 5 et 6 |
| « Il peut être piraté. » | Les sécurités vitales sont mécaniques. | Chiffrement de bout en bout, audit annuel, limites physiques hors logiciel | Sécurité 3 et 5 · FAQ 7 |
| « Mes données seront revendues. » | Jamais, et c'est écrit dans votre contrat. | Clause contractuelle, modèle économique sans publicité | Sécurité 5 · La Maison Dobby 4 · sous le bouton d'envoi du devis |
| « Et s'il tombe en panne ? » | Vous n'en serez jamais privé. | Remplacement sous 48 h, assistance 24 h/24, garantie 10 ans | Bandeau de réassurance · Garanties 2 |
| « La marque est jeune : et si elle disparaît ? » | Votre garantie est assurée. | Garantie 10 ans adossée à Atrium Assurances, maintenue même en cas de défaillance | Garanties 2 · La Maison Dobby 7 · FAQ |
| « C'est trop cher pour ce que ça fait. » | 19 heures rendues chaque semaine. | Chiffre moyen clients, essai de 90 jours remboursé | Accueil 6 · Garanties 2 · fin de chaque page |
| « Ça ne marchera pas chez moi. » | Votre Conseiller le vérifie avant tout engagement. | Visite à domicile, escaliers, maisons anciennes, domotique existante | Garanties 3 · FAQ 9 et 10 · devis |
| « Un robot chez moi, c'est dérangeant. » | Il a été dessiné pour être discret et accueillant. | Gestes lents, moins de 35 dB, témoignage du « plus réticent de la famille » (preuve liée au design à compléter une fois le robot défini) | Découvrir Dobby 1 · Témoignages (filtre Sceptiques) |

### Règles d'écriture rassurante

- **Une preuve à côté de chaque promesse.** Jamais « très sûr » seul : toujours « arrêt en 0,4 s ».
- **Des chiffres précis**, identiques partout (voir section 5).
- **Nommer la peur avant d'y répondre.** « Peut-on le laisser seul avec les enfants ? » rassure plus qu'un « sécurité maximale ».
- **Avouer une limite.** « Il n'est pas une nounou » rend le reste plus crédible.

## 19. Application : périmètre fonctionnel

Règle d'or : tout ce que le site promet doit exister dans l'application. Si le site dit « arrêt depuis l'application » et que l'écran n'existe pas, le jury le verra. L'application reprend la DA du site (section 21), avec le bouton d'arrêt toujours bien visible.

| Écran | Rôle | Promesse du site couverte | Priorité |
| --- | --- | --- | --- |
| Accueil | État de Dobby : tâche en cours, pièce, batterie | « Savoir ce qu'il fait » | Indispensable |
| Confier une tâche | Texte, voix ou raccourcis (« Nourrir Plume »), photo de confirmation | « Un oubli ? Deux secondes suffisent » | Indispensable |
| Arrêt d'urgence | Bouton toujours visible, confirmation en un geste | Arrêt à distance | Indispensable |
| Journal d'activité | Chaque action, horodatée | « Tout est visible » | Indispensable |
| Plan de la maison | Position de Dobby, Zones privées à dessiner | Zones privées | Indispensable |
| Validations | Demandes d'accord pour un achat au-delà du budget | Accord obligatoire | Indispensable |
| Routines | Tâches récurrentes (« chaque jour à 7 h ») | Il apprend vos habitudes | Recommandé |
| Résidences | Passer d'une maison à l'autre | Plusieurs résidences | Recommandé |
| Confidentialité | Couvrir les caméras, consulter et effacer la mémoire | Tout est effaçable | Recommandé |
| Famille | Profils et droits (enfants limités) | Profils enfants | Bonus |
| Conseiller | Chat avec le Conseiller dédié | Assistance 24 h/24 | Bonus |

## 20. Stack technique du site

| Outil | Rôle |
| --- | --- |
| Next.js + TypeScript | Structure du site, une route par page |
| Tailwind CSS | Mise en forme rapide et cohérente |
| GSAP + ScrollTrigger | Animations au défilement (sections épinglées, apparitions) |
| Lenis | Défilement fluide |
| Vercel | Mise en ligne gratuite |
| GitHub | Sauvegarde et historique du code |

Outils dans Claude Code : plugin frontend-design (officiel Anthropic), Playwright MCP (captures pour vérifier le rendu), fichier CLAUDE.md à la racine (stack, ton, chiffres, règles des CTA, tokens de la DA), ce document exporté dans `docs/contenu.md`.

Ordre de construction prévu : base commune (en-tête, pied de page, boutons, bloc d'appel) → Accueil → Demande de devis → Sécurité → Découvrir Dobby → le reste.

## 21. Direction artistique : « L'heure bleue »

La référence complète (couleurs, typographies, logos, composants, maquette d'accueil) est le design system **Maison Dobby** : https://claude.ai/artifact/XvcSFQ6XqtZWVHLiH8txnH. Les pistes de logo et de palette écartées sont sur la planche https://claude.ai/artifact/MjXuApQQx866gCc26ZaQ7P.

### Le concept

L'heure bleue, c'est le moment juste après le coucher du soleil : le ciel devient bleu profond et les fenêtres des maisons s'allument en ambre. Dehors, le bleu (Minuit, Outremer) rassure et impressionne. Dedans, l'ambre est la présence de Dobby : son regard, la lampe restée allumée, le bouton qui invite à entrer. C'est la traduction visuelle de « Bonsoir. Je vous attendais. »

### Le logo

- Deux yeux ambrés en ovales verticaux (proportion 3 pour 5) et un sourire à bouts ronds, de la couleur du texte. Pas de tête, pas de contour.
- Nom DOBBY en Italiana, espacé de 30 %, sous le symbole (logo complet) ou à sa droite (logo horizontal, en-tête).
- Versions nuit (Ivoire et Ambre) et jour (Minuit et ambre foncé #C27A1A). Icône d'application et favicon sur fond Minuit.
- Animation : le sourire apparaît, puis les yeux s'allument avec une lueur ; un clignement lent une fois par visite.

### Les couleurs

| Couleur | Hex | Rôle | Part de l'écran |
| --- | --- | --- | --- |
| Minuit | #0D1321 | Fond principal | environ 65 % |
| Outremer | #1A2B8F | Couleur signature, temps forts | environ 15 % |
| Ivoire | #F3EEE4 | Texte, pages claires | environ 15 % |
| Ambre | #F2A541 | Regard, bouton principal, chiffres clés | 5 % maximum |

- Trois thèmes : **Nuit** (le site), **Outremer** (deux sections par page au maximum, jamais à la suite ; sur l'accueil, les chiffres clés et l'appel final), **Jour** (pages de texte, application en mode clair).
- Le bouton principal est ambre sur Nuit et Outremer, Minuit sur Jour.
- Le rouge (#E5484D) est réservé au bouton d'arrêt d'urgence. Aucun autre rouge ni orange vif.
- Tous les couples texte et fond passent le contraste de 4,5:1.

### La typographie

- **Italiana** (Google Fonts) pour les titres, les chiffres et le logo, toujours en 40 px et plus. Titres écrits comme des phrases, jamais en gras.
- **Manrope** (Google Fonts) pour le texte, les boutons et la navigation. Sur-titres et boutons en capitales espacées de 20 %.
- Échelle : titre du hero 104 px (56 sur mobile), titres de section 64 px (40), titres de carte 40 px (30), chiffres 96 px (64), texte 16 px, intro 19 px.

### Les signatures (ce qui rend la DA déclinable)

- **Le regard** : un œil ambré seul, en puce de liste, voyant « Dobby est là », ancre active.
- **Le sourire** : la courbe du logo en trait fin, sous les titres de section, en soulignement des liens, comme coche de confirmation.
- **La lueur** : un halo ambré diffus derrière le regard, le curseur dans le hero, le bouton survolé. Une seule à l'écran.
- **L'heure bleue** : l'alternance Minuit et Outremer, et des photos prises au crépuscule (ciel bleu, intérieur ambré).

### Mise en page et mouvement

- Grille de 12 colonnes, 1 320 px maximum, marges de 48 px (20 sur mobile), 160 px entre sections (96 sur mobile).
- Boutons en pilule, cartes arrondies à 20 px, grands blocs à 32 px. Aucune ombre, sauf la lueur ambrée.
- Courbe unique `cubic-bezier(0.22, 1, 0.36, 1)` ; 300 ms au survol, 800 ms pour une apparition, 1 200 ms pour une transition de page. Le fond glisse de Minuit à Outremer en 600 ms à l'entrée d'une section forte.
- Interdits : rebonds, glitch, clignotements, parallaxe violente. Avec `prefers-reduced-motion`, tout devient un fondu.

### Photos et visuels

Scènes au crépuscule dans des intérieurs de très haut standing, humains détendus en arrière-plan, Dobby de face ou de trois quarts à hauteur d'yeux. Son regard ambré est la seule couleur vive de l'image. Texte jamais posé directement sur une photo : toujours sur un voile Minuit.

## 22. Où on en est

Fait :
- [x] Positionnement, cible, persona, why, promesse, ton
- [x] Arborescence, squelette des 65 sections et contenu de toutes les pages
- [x] Plan des CTA par page et par hauteur
- [x] Carte de réassurance (10 peurs)
- [x] Périmètre de l'application
- [x] Choix de la stack
- [x] Logo et direction artistique (section 21), design system Maison Dobby publié

À faire, dans cet ordre :
1. [ ] Designer le robot à partir du logo (visage : deux yeux ovales ambrés et un sourire lumineux ; silhouette, matières, détail signature, finitions à harmoniser avec la DA)
2. [ ] Produire les visuels (image de référence du robot d'abord, puis les scènes à l'heure bleue)
3. [ ] Récupérer les critères du prof
4. [ ] Coder le site avec Claude Code dans VS Code (exporter les tokens du design system dans la configuration Tailwind)
5. [ ] Concevoir puis coder l'application
