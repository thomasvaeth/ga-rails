# Fare Start
### About
Fare Start is built by [Todd Best](https://github.com/toddbest2004), [Andrew Mestas](https://github.com/andrew-mestas), and [Thomas Vaeth](https://github.com/thomasvaeth). The idea came after we saw how Lyft calculates the price for their rides for Seattle (cost = 1.35*mil + 0.24*min + 3.30).

### Technologies Used
* Ruby on Rails
* Ruby
* PostgreSQL
* Uber API
* Google Maps Javascript API
* Google Maps Geocoding API
* Freegeoip API
* HTML
* SASS
* JavaScript
* jQuery
* D3.js
* fullPage.js
* Bootstrap

### Installation
* ````bundle install````

### Approach Taken
[Wireframes and ERDs](https://github.com/thomasvaeth/ga-rails/tree/master/screenshots)
* The group was categorized into "data processing" and "not walking", so coming up with the idea to compare car service prices was easy. We wanted to visualize all of the data we gathered from searches using D3.js and a map.
* Thomas surveyed 50 people to see if the idea was worth pursuing and found that 76% of people would choose a car service by price rather than by brand (focusing on UberX vs Lyft).
  - Thomas's personal experience has been roughly the same for both services. His ride history showed 95% of his previous Uber drivers and 100% of Lyft drivers were male. It also showed the cars were all similar in class with Toyota Prius being the most common for both.
* We wanted to have an incentive for users to signup besides being able to save searched addresses since they can search without having to signup. We added input fields for the user to put in their Uber and Lyft promo codes for new user signup. The results page will randomly display one user's codes that a visitor will be able to use in the Uber or Lyft app.


### Unsolved Problems
* User can spam signup with same Uber/Lyft promo code

### Upcoming Additions
* Different alerts
* More accurate pricing for Lyft when there is a public Lyft API
* Add wait time feature when there is a public Lyft API (Uber API already has wait time)