Github: https://github.com/SkakalaJ/MTAA-Project

# Messenger Frontend

- Readme.md pre backend su obsiahnute v priecinku Messenger-Backend na Github adrese.
- Doplnkové súbory k dokumentácii sú obsiahnuté v /docs priečinku.

## Application GUI
### Login Page
![picture](docs/images/login.PNG)

### Register Page
![picture](docs/images/register.PNG)

### Change Password Page
![picture](docs/images/change_password.PNG)

### Users Page
![picture](docs/images/Users.PNG)

### Chat Rooms Page
![picture](docs/images/chat_rooms.PNG)

### Chat Page
![picture](docs/images/chat.PNG)

### Create Room Page
![picture](docs/images/create_room.PNG)

### Profile Page
![picture](docs/images/profile.PNG)

## Zmeny Backendu
### Minio
Služba pre podporu úložiska a distribúcie(upload/download) súborov pre klientov. Služba bežiaca na serveri.

Po spustení dostupná na: http://localhost:9000/minio/images/

Prihlasovacie údaje:
- MINIO_ACCESS_KEY: minio_access_key
- MINIO_SECRET_KEY: minio_secret_key

### Nove endpointy
GET http://localhost:4000/api/users/
- get všetkých userov.

GET http://localhost:4000/api/users/rooms
- get všetkých room pre prihláseného user-a


## FE akceptacne testy
### Test 1
- FAIL
![picture](docs/FE_UAT_images/1.PNG)

### Test 2
- PASS
![picture](docs/FE_UAT_images/2.PNG)

### Test 3
- FAIL
![picture](docs/FE_UAT_images/3.PNG)

### Test 4
- PASS
![picture](docs/FE_UAT_images/4.PNG)

### Test 5
- PASS
![picture](docs/FE_UAT_images/5.PNG)
