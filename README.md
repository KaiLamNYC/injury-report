# Injury Report Database

## Overview

The Injury Report Database is a comprehensive solution designed to streamline the process of creating and updating injury reports. With its intuitive interface, users can easily pinpoint injury locations using an auto-detection body map. Additionally, the platform offers an analytics dashboard, providing insights and overviews of the injury data collected.

## Deployed On Vercel

[![Deployed on Vercel](https://vercel.com/button)](https://injury-report.vercel.app/)
https://injury-report.vercel.app/

## Screenshots

**Home Page**
![Home View](/injury-report/public/homeView.png)

**User Dashboard**
![User Dashboard](/injury-report/public/dashboard1.png)
![User Dashboard](/injury-report/public/dashboard2.png)
**Create Report**
![Create Report](/injury-report/public/editView.png)
**View Report**
![View Report](/injury-report/public/viewOne.png)
**All Reports**
![All Reports](/injury-report/public/allView.png)

## Features

- **Auto-detection Body Map**: Allows users to visually pinpoint and label injury locations on a human body representation.
- **Injury Report Creation**: Simplifies the process of logging injuries with structured data input.
- **Injury Report Updates**: Facilitates modifications to existing reports, ensuring data accuracy and up-to-date information.
- **Analytics Dashboard**: Provides a visual representation of injury data, aiding in data interpretation and insights.
- **Sorting and Filtering**: Enhanced database querying capabilities for sorting and filtering through reports.
- **Middleware and Route Protection**: Ensures that only authorized users can access certain routes and functionalities.

## Improvements

While the Injury Report Database serves its main purpose efficiently, there are several areas of improvement:

- **Mobile Responsiveness**: Enhancing the user interface for mobile devices to cater to on-the-go users.
- **Improve Overall UI**: Enhance the user interface for a more intuitive and pleasant user experience.
- **Improve Error Handling**: More robust error handling mechanisms to ensure smooth user interactions.
- **Injury Document Management**: Address the oversight where, during report updates, old injury documents are not deleted but new ones are created.

## Libraries

This project utilizes several libraries to enhance its functionality:

- **React**: For building the user interface.
- **Next.js**: For server-side rendering and routing.
- **KonvaJS**: For the canvas-based interactivity of the body map.
- **MongoDB**: As the primary database for storing injury reports.
- **React Query**: For data fetching, caching, and state management.
- **Recharts**: For rendering interactive charts.
- **Lucide-React**: For icons.
- **Zod**: For schema validation and parsing.

## Notes

- **KonvaJS with Next.js**: Spent a lot of time dealing with errors using Next.js with KonvaJS due to known server-side issues.
- **Deployment on Vercel**: Encountered some challenges with deploying on Vercel, especially related to canvas rendering.
- **Learning Experience**: The project was both extremely fun and challenging. It was a great learning experience, especially since it was the first time using KonvaJS.
- **Data Privacy**: All injury reports are stored securely, ensuring user data privacy and protection.
- **Accessibility**: The platform is designed with accessibility in mind, catering to users of all abilities.
