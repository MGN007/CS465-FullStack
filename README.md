Travlr Getaways Full Stack Application Reflection

Architecture

  Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
  Why did the backend use a NoSQL MongoDB database?
  

In this project, I worked with two different types of frontend development: a traditional Express-based site and a single-page application (SPA) built with Angular. The Express side renders HTML on the server using routes and controllers, and then sends fully built pages to the browser. This approach is simpler but less dynamic since the page has to reload every time something changes.

On the other hand, the Angular SPA runs mostly in the browser and uses components, services, and routing to manage the application. Instead of reloading the page, it updates data dynamically, which makes it feel faster and more interactive. This was especially noticeable in the admin side where trips could be added, edited, and deleted without refreshing the page.

The backend uses MongoDB, which is a NoSQL database. This works well for the project because the data is stored in a flexible JSON-like format. Since the application is built using JavaScript across the full stack, MongoDB integrates naturally and allows for easier data handling compared to a strict relational database.

Functionality

  How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
  Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
  

JSON is different from JavaScript in that it is purely a data format, not a programming language. It is used to structure and transfer data between the frontend and backend. In this project, JSON is what connects everything together. The Angular frontend sends requests to the API and receives JSON responses, which are then displayed in the UI.

Throughout the project, I refactored code multiple times, especially when transitioning from static data to API-driven data. For example, the trip data was originally stored locally, but later moved to the database and accessed through API calls. This made the application more realistic and scalable.

Using reusable UI components in Angular also improved efficiency. Instead of rewriting code for each part of the interface, components like trip cards and forms were reused across the application. This made the code easier to maintain and update, and reduced duplication.

Testing

  Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.
  

Testing in this project involved making sure all API endpoints worked correctly using tools like Postman. Each endpoint, such as GET, POST, PUT, and DELETE, was tested to confirm it returned the correct data or performed the correct action in the database.

Methods and endpoints are essential because they define how the frontend communicates with the backend. For example, GET retrieves data, POST creates new data, PUT updates existing data, and DELETE removes data. Each of these had to be tested individually.

Security added another layer of complexity. Once authentication was implemented, protected routes required a valid JWT token. This meant testing had to include logging in to retrieve a token and then using that token in requests. If the token was missing or invalid, the API would return an unauthorized error, which confirmed that the security was working correctly.

Reflection

  How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?


This course helped me gain a much better understanding of how a full stack application actually works from end to end. Before this, I had worked with individual pieces like frontend or backend, but not how they all connect together in a real project.

One of the biggest skills I developed was working with APIs and understanding how data flows between the client and server. I also improved my ability to debug issues, especially when dealing with authentication and API errors. Learning Angular and building a SPA was also a major step forward, since it introduced a more modern way of building web applications.

Overall, this project gave me hands-on experience with tools and concepts that are used in real-world development. It definitely makes me more confident and more prepared to apply for roles where full stack knowledge is expected.
