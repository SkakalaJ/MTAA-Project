# Messenger Backend
Before running docker-compose file run command in docker:
```
docker network create external-network
```

### Migrations
For generating new empty TS migration file use:
```
npm run migrations:generate -- -n "Name of new migration"
```
This will create new empty migration file in directory `/src/migrations`

Before running any migration, you have to compile migrations using command:
```
npm run migrations:compile
```

Once all migrations files has been successfully built, use this command to apply migrations:
```
npm run migrations:run
```

If you need to revert applied migration for some reason, use command:
```
npm run migrations:revert
```
