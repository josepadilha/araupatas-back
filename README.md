Deploy

* npm run build
* gcloud run deploy + dados
gcloud run deploy araupatas-back `                                                    
    --source . `
    --region us-central1 `
    --allow-unauthenticated `
    --add-cloudsql-instances araupatas:us-central1:araupatas-db `
    --set-env-vars NODE_ENV=production `
    --set-env-vars DATABASE_URL=""
    