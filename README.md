# LinkNYC Finder

## Synopsis

LinkNYC Finder is a web application designed to help users locate the nearest LinkNYC terminals in New York City. These terminals offer free Wi-Fi access across the city. Users can simply input their location, and the app will display a list of the closest terminals where they can connect to the internet.

## Technology Utilized

- **React**: Frontend framework for building the user interface
- **geocod.io API**: For geocoding user-input addresses
- **mockAPI**: For simulating backend services during development
- **NYC Open Data API**: To fetch real-time data about LinkNYC terminal locations

## Features

- 📍 Geolocation-based search for LinkNYC terminals
- 🖥️ User-friendly interface for inputting location
- ⚡ Fast and accurate generation of nearest terminals list

## Technical Details

The application leverages several key technologies to provide a seamless user experience:

1. **Geolocation Feature**:

   - Retrieves the user's location
   - Cross-references it with LinkNYC terminal data from the NYC Open Data API

2. **Data Processing**:

   - Optimized retrieval and processing of location data using React
   - Ensures fast and accurate generation of the nearest terminals list

3. **API Integration**:
   - Integrated multiple APIs including geocod.io and mockAPI
   - Handles location inputs and dynamically updates terminal listings based on user proximity

## Usage

1. Open the application in your web browser
2. Enter your address or location
3. View the list of nearest LinkNYC terminals
4. Click on a terminal for more details or directions

## Contact

Runquan Ray Zhou - [LinkedIn](https://www.linkedin.com/in/runquanrayzhou/) - rzhou@pursuit.org

Project Live Link: [https://linknyc-finder.netlify.app/](https://linknyc-finder.netlify.app/)
