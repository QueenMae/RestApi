Avant de lancer le projet, il faut avoir installé :

Node.js et npm 
phpMyAdmin pour la gestion de la base de données MySQL

Ensuite, clonez le projet

Dans le dossier du projet, installez :

bash
Copier le code
npm install
Configuration
Assurez-vous que MySQL est installé, et que vous avez créé une base de données nommée restmae.

Mettez à jour les informations de connexion MySQL dans le fichier index.js :

javascript
Copier le code
const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: "restmae"
});
Lancement
Pour démarrer l'application :

bash
Copier le code
node app.js
Le serveur tournera sur le port 3000 par défaut.


Les routes de cette API permettent de gérer les items. Voici un récapitulatif :

1. GET /items
Description : Récupère tous les items enregistrés.
Requête :
bash
Copier le code
GET http://localhost:3000/items

2. POST /createItems
Description : Crée un nouvel item avec les données fournies.
Requête :
bash
Copier le code
POST http://localhost:3000/createItems
Body (exemple) :
json
Copier le code
{
  "name": "Pizza",
  "prix": 12.50,
  "id_category": 2,
  "description": "Pizza avec fromage et tomates"
}

3. PUT /updateItem/:id
Description : Met à jour un item existant avec un ID spécifique.
Requête :
bash
Copier le code
PUT http://localhost:3000/updateItem/1
Body (exemple) :
json
Copier le code
{
  "name": "Burger",
  "prix": 10.00,
  "id_category": 3,
  "description": "Burger avec frites"
}
4. DELETE /deleteItem/:id
Description : Supprime un item de la base de données via son ID.
Requête :
bash
Copier le code
DELETE http://localhost:3000/deleteItem/1

Rôles :
express : pour créer l’API.
mysql : pour se connecter à la base de données MySQL.
JSON : est un format de donnée qui sert structurer des données de façon simple et lisible.
