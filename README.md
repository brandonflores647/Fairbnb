<div align="center">
  
# Fairbnb
 
</div>

> *Airbnb clone*

<div align="center">
 
#### 'Fairbnb' is a place for users to discover awesome bed and breakfast spots posted by others. Checkout the fair booking prices and plan your next stay. Give your feedback to the community with reviews to talk about your most recent stay. *Design inspired by Airbnb.*

</div>
 
<div align="center">
  
# Technologies Used

</div>

<div align="center">
  
| React | Redux | Express.js | Node.js | PostgreSQL | Sequelize |
|:-----:|:-----:|:-------:|------------|:----------:|:---------:|
|<a href="https://reactjs.org/"><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' width="75" height="75" /></a>|<a href='https://redux.js.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="75" height="75" /></a>|<a href='https://expressjs.com/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="75" height="75"/></a>|<a href='https://nodejs.org/en/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="75" height="75" /></a>|<a href='https://www.postgresql.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="75" height="75" /></a>|<a href='https://sequelize.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  width="75" height="75"  /></a>|

 
### [Checkout Fairbnb!](https://bflores-fairbnb.herokuapp.com/)
### [Fairbnb wiki](https://github.com/brandonflores647/Fairbnb/wiki)
### [Fairbnb's Features](https://github.com/brandonflores647/Fairbnb/wiki/Features)
### [Database Schema](https://github.com/brandonflores647/Fairbnb/wiki/Database-Schema)

# Splash Page

![Capture](https://user-images.githubusercontent.com/100805072/177055701-f6b7783e-fea2-4eee-8af8-31edcc6a36e4.PNG)

</div>
 
## Future Features:
- Spot Filters
- Google Maps
- Favorite Spots
- Reply to reviews

## Local Setup:
```
Setting Up and Starting a Local Server

1. Download code and npm install in /backend to install all node dependencies for backend server.

2. Create a psql db user with createdb privileges.

   - Duplicate the .env.example for the dotenv package.

   - Update the following variables:

     - PORT the port that the server will listen to, 8080 by default
     - DB_USERNAME the user of the created psql db user
     - DB_PASSWORD the password for the psql db user
     - SESSION_SECRET a session secret key for encrypting session id's in the database
       - All other variables should remain the same

3. Setup PostgreSQL database

   - Run npx dotenv sequelize db:create
   - Run npx dotenv sequelize db:migrate
   - Run npx dotenv sequelize db:seed:all

4. Start express server by running npm start in the /backend directory
5. The backend server will start on http://localhost:5000
6. Run `npm install` in `/frontend` to install dependencies for frontend server.
7. Run `npm start` in the `/frontend` directory
8. The frontend server will be live on http://localhost:3000 by default
```

## Created By
[Brandon Flores](https://github.com/brandonflores647)
