# DB Vis

A Database Diagram Builder built using React and Next.js, bootstrapped with `create-next-app` and is used to help visualise data relationships between tables in a relational database.

A clone of [DrawSQL](https://drawsql.app/) although the only thing I actually know about it is the image on the landing page. Haven't actually used it myself to be honest.

App deployed with [Vercel](https://vercel.com/). 

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=dbvis)

[Link](https://dbvis.vercel.app/)

[Demo without creating an account](https://dbvis.vercel.app/guest)

[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

![HeroPic](https://user-images.githubusercontent.com/35862661/115776281-8723ad80-a3e6-11eb-9ae3-3271cd528c62.png)

## Features

### Draggable

Individual tables in the app are draggable, making it easy to organise your database. Table positions are stored in the database on drop (probably not the most efficient) so the next time you come back into the app, your tables will be where they were before.

Note: The table positions are stored based on the position they are from the left and top of the screen, so users with smaller screens may not be able to reach some tables put all the way to the right.

### User Authentication

User authentication is managed with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and [bcryptjs](https://www.npmjs.com/package/bcryptjs). The token is stored in the app itself (via Context) so no information about the token is transferred to the browser. However, this means that whenever the browser is reloaded, the context is lost and the user has to log in again. This is quite stupid honestly and I might just consider using http cookies to store the token instead.

### Groups

Create and add other users to groups to collaborate on the same databases together. (As of now still quite unreliable on the same database at the same time due to the app keeping track of drag and drop positions - it will work, but there will be lags/delays). All databases belong to a group, so users in the same group can work on the same databases.

## Work In Progress

The app isn't really complete yet, there are still quite a few functionalities that are not working very well yet but I have decided to deploy it first to test the remote database.

WIP:

* Logout functionality
* Allowing the addition of users after group is created
* Allowing the revoking of access of users from groups
* Allowing the deletion of groups
* Allowing the deletion of users
* Alternative view of diagram schemas (in JSON format maybe?)
* More customisability to the user

Also, need to get around removing some of the excess packages.

Initially intended to deploy with Netlify but Netlify was giving me quite a bit of trouble. Didn't realize Vercel was a deployment platform as well, and since they were the ones who made Next.JS, I decided to go ahead and try using them. 

### Known bugs/unintended features (to be fixed)

* Able to create more than one table with the same name.
* Arrows sometimes extend inwards when past a certain threshold (for example an arrow from a field pointing to a table right below it)
* Arrows are able to point to another field in the same table

## Tech/Frameworks used

* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [MySQL](https://www.mysql.com/)
* [Material UI](https://material-ui.com/)
* [Vercel](https://vercel.com/)

## Progress

I would consider it generally complete - although there are quite a few functions that aren't built in yet. Most of the diagram builder works as I had intended for it to; just need to add more features.

[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)

## Other Credits
* [FreeDB](https://freedb.tech/)
* [Knex](http://knexjs.org/)
* [React-draggable](https://www.npmjs.com/package/react-draggable)
* [React-xarrows](https://www.npmjs.com/package/react-xarrows)
* [Axios](https://www.npmjs.com/package/axios)
