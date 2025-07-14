# BVI Company Formation Backend

A simple Express.js API server for the BVI Company Formation form.

## Local Development

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Server will run on http://localhost:3001

## Production Deployment

### Railway Deployment

1. Create a new Railway project
2. Connect your GitHub repository
3. Set the root directory to `/backend`
4. Railway will automatically detect the Node.js app and deploy

### Environment Variables
- `PORT` - Set automatically by Railway
- Add any database URLs or API keys as needed

## API Endpoints

- `GET /` - Health check
- `GET /companies` - Get all submitted companies
- `POST /companies` - Submit a new company
- `GET /drafts` - Get all drafts
- `POST /drafts` - Create a new draft
- `PUT /drafts/:id` - Update a draft
- `DELETE /drafts/:id` - Delete a draft

## Database

Currently uses in-memory storage. For production, consider adding:
- PostgreSQL (Railway provides free PostgreSQL)
- MongoDB
- SQLite for simple deployments

## Adding Database (Optional)

To add PostgreSQL:

1. Add to Railway project
2. Install `pg` package
3. Update server.js to use database instead of in-memory arrays
