# TaskManager

## Getting Started

Follow these steps to run the project locally:

### 1. Install Dependencies

```bash
npm install
  
### 2. Set Environment Variables
Create a .env file in the project root with the following values:

NODE_ENV=development
SERVER_PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=your_db_user
DB_NAME=task_manager
DB_PASSWORD=your_db_password
DATABASE_URL=mysql://root:root@localhost:3307/task_manager
JWT_SECRET=your_jwt_secret

### 3. Set Up the Database
Run the following commands outside the src folder:

node sequelize.cjs db:create
node sequelize.cjs db:migrate

### 4. To start the server :

npm run start