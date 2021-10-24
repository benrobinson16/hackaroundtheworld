# WhereCanITravel.tech

[wherecanitravel.tech](https://wherecanitravel.tech) is website dedicated to making it easy to find out about COVID-19 travel restrictions. By making this informations easier to access, hopefully more people will be able to travel and experience other cultures.

## Inspiration

Since the start of the pandemic, it has been difficult to travel internationally. One cause of this difficulty has been travel restrictions imposed around the world. These restrictions have had a tendency to change quickly and be difficult to understand; to research one, you'll often need to read lengthy official government websites. Additionally, other sources of information such as news articles can be out of date by the time you plan your trip.

I believe that by making information regarding travel restrictions easier to understand and access, people will travel more and hence explore other cultures. Getting people to explore other cultures and develop an understanding of them is integral to creating a more accepting world.

## What it does

WhereCanITravel.tech is a website where you can research travel restrictions to/from your country. For example, I could put in United Kingdom to see where I can travel from the UK without need for quarantine. I can then also filter by return trip to ensure only destinations from which I can return to the UK quarantine-free are shown.

The world map serves as an easy way for user's to explore possible holiday destinations visually but a list is also available for those in need of the data in a textual form.

To ensure the data is always up to date, the website asks its user's to correct errors in the database and add their country's current policies. This means that with enough traffic, the website will always be up to date unlike news articles and other older forms of communicating travel restrictions.

The website has made several assumptions: you have been double vaccinated against COVID-19, and you are happy to undertake testing before/after your journey. The majority of users fall into this category and the result is a site that is much clearer and easier to use.

## How we built it

The project consists of two components: the website and the backend.

The website was built using React.js and ChakraUI. This enabled a fast and responsive interface that was also easy to build. For the domain name (wherecanitravel.tech), I used Domain.com.

For the backend, I opted for Google Cloud solutions. The data is hosted in a NoSQL database (Firestore), and can be accessed via a suite of cloud functions. Both of these allowed for very quick iterations and modifications as I did not have to worry about running the actual server. Additionally, the cloud functions kept the code separated nicely into a series of different modules, one for each function.

## Challenges we ran into

The first challenge was getting the backend to work: I have never before worked with Google Cloud Functions or Firestore (I've never properly worked with Google Cloud at all!), so putting together the code to make that work was a challenge at first.

I first implemented the site to ask users to type in their current country. However, this resulted in issues regarding how to convert this into an ISO code (a human knows "UK" and "United Kingdom" are the same thing but the computer doesn't). To combat this, I pivoted to using a `Select` component from ChakraUI and stitching that together with the `country-list` module to make a country picker.

## Accomplishments that we're proud of

This was my first ever hackathon, so I'm extremely happy just to have participated. It was so much fun and I can't wait to take part in more in the near future.

## What we learned

- Google Cloud Functions and Firestore and how these can work together
- A much better understanding of React and ChakraUI
- Working with ISO Country codes and the `country-list` and `react-svg-worldmap` libraries
- How a hackathon works!

## What's next for Where Can I Travel?

I'm planning to write about this project on my blog to help inspire other first-time hackers to give hackathons a go by proving it's possible. Additionally, I'd love to share some of the technical insights I have gained from completing this project.

I'd love to keep this project up and continue to explore it, adding more robust algorithms for monitoring suggested edits and improving SEO so that the data is truly always up to date. This will also require scaling up the Google Cloud infrastructure and improving response times, but it is a challenge I am willing to take on!
