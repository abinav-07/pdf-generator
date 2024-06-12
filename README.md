<!-- Use cmd+shift+v in macOS or ctrl+alt+v on windows to open as a preview -->
# PDF Renderer
PDF Renderer using `Node/Express.js` and `Next.js`, `Sequelize`, `Puppetter` and `Jwts`.
`Tested in Mac M1 chip, not tested in Windows`

### CONFIGURATION

`NOTE: Seeder is already run along with migrations`

This section covers the process for configuring and installing the application packages.

1. Install `docker` in your system.
2. Add `.env` to your `root` directory, It has exampleenv file, you can copy same values to .env.
3. In root directory, run `docker compose up --build` to run the application for the first time, after that you can simply use `docker compose up`, both next and node server will be run, node.js port is taken from env, next runs on default port, takes some time to build :). `Make sure you have space left in your device for the application to install`
4. You can now access your applications, 3000 (default) for next app, 5000 from env for nodejs and 5001 for admin database.
5. The urls are for the application pages are:
#### User Routes
- /register Register User Page
- /login Login User/Admin Page,
#### Admin Routes
- /admin/pdf-contents
- /admin/pdf-contents/create
- /admin/members
6. Optional- Run `npm i` and `npm run doc` in root directory to generate a jsdoc, after generating, go to /server/v1/documentation/api directory and open index.html file for APIs documentation.

### Using the application
1. Go to `http://localhost:3000/login` page.
2. Enter admin credentials that was already seeded.
`Admin Cred: admin@gmail.com admin`
3. In the `PDF contents` dashboard, click on create button.
4. You can generate your PDF in this page. `HeaderTemplate` and `FooterTemplate` allows usage of html tags and styles whereas `bodyTemplate` can be styled using tiptap menubar.
5. Created PDFs are shown in the dashboard page where you can delete the PDF that you created.

### Happy Codding!

