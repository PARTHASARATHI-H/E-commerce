 E-commerce
 This project is a responsive e-commerce website called Shoe Mart, developed to provide a seamless online shopping experience for users.The frontend is built with HTML, CSS, and JavaScript, designed to work like a modern mobile shopping app. The backend, powered by Node.js and MySQL, handles product data, cart functionality, and order storage. 
 ShoeMart E-commerce Website
 Overview

This project is a full-stack e-commerce website for shoes, built using HTML, CSS, and JavaScript for the frontend, and Node.js with Express.js for the backend.  It allows users to browse shoes, view product details, and simulate a purchase.

 Features

User Interface:
    * Interactive product slider
    * Product detail view with color and size selection
    * Image gallery
    * Basic purchase simulation
Backend:
    * RESTful API for product data
    * MySQL database integration

Technologies Used

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Database: MySQL

 Setup Instructions

1.  Clone the repository:
    bash
    git clone <your_repository_url>
    cd <your_repository_name>
    

2.  Backend Setup:
    * Navigate to the server directory:
        bash
        cd server
        
    * Install backend dependencies:
        bash
        npm install
        
    * Set up your MySQL database:
        * Create a database named shoemart.
        * Create a user with appropriate privileges for the shoemart database.
        * Update the database configuration in server.js with your MySQL credentials:
            javascript
            const db = mysql.createConnection({
              host: 'localhost',
              user: 'your_mysql_username',  // Replace with your username
              password: 'your_mysql_password',  // Replace with your password
              database: 'shoemart',
            });
            
     Run the backend server:
        bash
        node server.js
        

3.  Frontend Setup:
    * Open the index.html file in your web browser.

 API Endpoints

* GET /api/products:  Retrieves all products.
* GET /api/products/:id: Retrieves a single product by ID.

 Data Storage

The following data is stored in the MySQL database:

Products:Product information, including name, price, description, and image URL.

##  Important Considerations

* *Database Credentials:* Ensure you replace the placeholder values in server.js with your actual MySQL username and password.  *Do not* commit your actual database credentials directly to the repository if it is public.  Consider using environment variables for sensitive information.
* *Image Paths*: The image_url field in the database and the img src in index.html  should correctly point to the location of your image files.
* *Checkout Button*: The checkout button in index.html is initially hidden and doesn't have a functional implementation. You would need to add the checkout functionality.
