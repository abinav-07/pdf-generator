<!-- Use cmd+shift+v in macOS or ctrl+alt+v on windows to open as a preview -->
# PDF Renderer
PDF Renderer using `Node/Express.js` and `Next.js`, `Sequelize`, `Puppetter` and `Jwts`.
`Works Better in Mac, not tested in Windows(follow second last line if you are on windows and dont have docker)`

### CONFIGURATION

#### Admin Cred: admin@gmail.com admin

`NOTE: Seeder is already run along with migrations`

This section covers the process for configuring and installing the application packages.

- run `npm i` and `npm run doc` in root directory to generate a jsdoc, after generating, go to /server/v1/documentation/api directory and open index.html file for APIs documentation.

1. Install `docker` in your system.
2. Add `.env` to your `root` directory, It has exampleenv file, you can copy same values to .env.
3. In root directory, run `docker compose up --build` to run the application, both next and node apps will be run, node.js port is taken from env, next runs on default port, takes some time to build :).
4. You can now access your applications, 5001 for database, 3000 (default) react and 5000 from env for nodejs.
5. The urls are for the application pages are:
#### User Routes
- /register Register User Page
- /login Login User/Admin Page,
#### Admin Routes
- /admin/pdf-contents
- /admin/members
6. (Optional) Register some users from /admin/register page, and then use admin dashboard using the email that was provided at the start to see atleast some user data in members tab.

### Happy Codding!

