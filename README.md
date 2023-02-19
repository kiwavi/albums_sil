# albums_sil    
### Albums_sil is a responsive project that displays albums and the photos they contain. Users create and edit these albums and photos. One can also see the amount of albums a certain user has.     
## Tech stack
### Python DRF (Backend)
### ReactJS (Frontend)
### TailwindCSS (Frontend)
### Authentication (django-rest-authemail)   
## Setup (using docker)    
### Once you clone the project, go (cd to)the backend directory and look for .env files ending with .example.     
### Open both files and customize the variables according to the corresponding environment (development or production). The EMAIL_HOST and EMAIL_HOST_USER variables cannot be empty.    
### Change the names of the files by removing the .example extensions in order for them to be recognized by the settings file. Also change the allowed hosts, cors_allowed_origins and csrf_trusted_origins in settings.py file to reflect your deployment environment    
### Build and run the docker image for development    
`sudo docker-compose build    `
`docker-compose up -d`
### For Production(follow the following steps)    
### Change hostname settings in init-letsencrypt file and docker-compose.prod.yml file.     
`chmod +x init-letsencrypt.sh    `
`chmod +x docker/backend/wsgi-entrypoint.sh    `
`sudo ./init-letsencrypt.sh    `
`sudo docker-compose -f docker-compose.prod.yml build    `
`sudo docker-compose down --remove-orphans    `
`sudo docker-compose -f docker-compose.prod.yml up -d    `
