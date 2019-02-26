 Taboola tool is a React app that simulate picking content from a Content Bank Editor, and then render it as a 3X2 Taboola widget.
The main page is the Content Bank Editor where you can edit the content, add new content, and pick 6 items to display on the widget.
When 6 items are selected, you can generate the widget by clicking on the button.

I used Express on Node.js server, GraphQL back-end processor, MongoDB as the database and Apollo as the server-client connector. 


INSTALATION:

After cloning the taboolaTool repo, open 2 tabs on the command line, and direct each tab's cd to the project folder URL.
In the first tab we'll run the server:
```
cd server
npm install
**make sure all dependencies on server/package.json are installed (if not, use `npm install <dependency name>`)
run `node app` or `nodemon app` to run the server
```

You should get the message:

now listening for requests on port 4000
connected to database

________________________________________________

In the second tab we'll run the client:
```
cd client
npm install
** make sure all dependencies on client/package.json are installed.
npm start
```

A new tab on the browser (http://localhost:3000/) will pop up with the project UI.

