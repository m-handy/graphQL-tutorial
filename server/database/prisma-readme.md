# DOCKER COMMANDS:
- `docker-compose up -d`
- `docker-compose down`

# DEPLOY:
- `export PRISMA_MANAGEMENT_API_SECRET=123` (`managementApiSecret` in docker-compose.yml)
- `prisma deploy`

# RUN
- token for "secret: mysecret123" (command `prisma token`)
```
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTM0NjgyMzIzLCJleHAiOjE1MzUyODcxMjN9.ftmxu7CgnXWd4WxHZaWS2hZ8-ko_2Jc-0z7HOKf84Z4"
}
```


