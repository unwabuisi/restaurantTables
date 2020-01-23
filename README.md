# Restaurant Tables
**What does it do?**

This is a web application that can be used to make table reservations at a restaurant.
I built this app to learn more about using Express and NodeJS to create servers, APIs, and routing.
I also got to test [Postman](https://www.getpostman.com/) for the first time to check whether my API was working correctly.

##### The functions of this application are as follows:
- Users can be added to the a reservation list for tables, or a waitlist to be seated
	* Users can be added to the lists through a form or programmatically though the API
- Email / Text users on the waitlist when their table is ready
-


##### What technologies are used?
- NodeJS
- ExpressJS
- [Ethereal Email](https://ethereal.email/)
- Twilio


##### Status:
* Currently the Twilio/SMS functionalities are not working
* The email functionality works, but is currently set to use a test email account with Ethereal; it can be easily configured to send emails through any SMTP server or major email provider (Gmail, etc.)
* There is no type of data validation/authentication in place for the API or forms
* Plan to possibly add a persistence layer with MySQL?
* Need to deploy to Heroku
