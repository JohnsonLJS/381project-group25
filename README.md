# Some Information
This is a project assignment for the Server-side Technologies And Cloud Computing ( COMP S381F ) 

Using HTML, CSS, JAVASCRIPT

[This is our link](https://three81project-group24.onrender.com)

# Collaborators
13839918 Yeung Kit Tony

12948744 Hui Ka Hei Jason

13513586 Li Jun Sheng Johnson

# Set up 
1. Download all the code from our [Github Project](https://github.com/JohnsonLJS/381project_group24)
	```
   The project file likes
	├── README.md
	├── models
 	│   ├── Note.js
	│   └── User.js
	├── public
	│   ├── MUHK.jpeg
	│   ├── image1.jpeg
	│   ├── image2.jpeg
 	│   ├── image3.jpeg
	│   └── styles.css
	├──	views
    	│	├── index.html
   	│ 	├── info.html
   	│ 	├── login.html
	│	├── note.html 
	│	└── register.html
	├── package-lock.json
	├── package.json
	└── server.js
    ```
3. Use terminal to download some modules
	```
 	npm install
	```

4. Start
	```
	npm start
	```
 # Project function
 1. The cover page, login page and register page can jump to each other.

 2. login page if you enter wrong username or password, that will relog the login page again.

 3. register page can record your usename and password.

 4. login in the index page, each link can click, the "MU" image and the logout, note button can cilck too.

 5. "MU" image link to the MU website, logout button can logout and go to the cover page, the note page will go to the button page
 
 6. For note page, you can see all the note and manage them.
 
 7. Enter the "Title" and "Content" then you can create a new note.
 
 8. Click the "Edit" button can see the "Note ID", "Title" and "Content", you can change the detail and update them.
 
 9. Click the "Delete" button can delete the note.
 
 10. Click the "Back to main page" can go back to the index page.

#  RESTful CRUD services 
There are 2 RESTful CRUD services, the first one is user and the second is note. You can use the API to read, create, upload and delete.
UserAPI:

READ:
curl "localhost:3000/api/users"

CREATE:
curl -X POST -d 'username=xxxx&password=XXXX' "localhost:3000/api/users"

UPDATE:
curl -X PUT -d'newUsername=xxxx&newPassword=XXXX' "localhost:3000/api/user/username/password"

DELETE:
curl -X DELETE "localhost:3000/api/users/username/password"

NoteAPI:

READ:
curl "localhost:3000/api/notes"

CREATE:
curl -X POST -d 'title=xxxx&content=XXXX' "localhost:3000/api/notes"

UPDATE:
curl -X PUT -d'title=xxxx&content=XXXX' "localhost:3000/api/notes/id"

DELETE:
curl -X DELETE "localhost:3000/api/notes/id"
 
     
   
 
	
