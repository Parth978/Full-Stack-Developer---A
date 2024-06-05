import requests
from bs4 import BeautifulSoup
import pandas as pd

def fetch_property_data(search_query):
    # Construct the search URL
    base_url = "https://www.realestate.com.au/buy"
    params = {"q": search_query}

    # Fetch the HTML content
    response = requests.get(base_url, params=params)
    response.raise_for_status()  # Ensure the request was successful

    # Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all property listings
    properties = soup.find_all('article', class_='resultBody')

    # Initialize a list to store property data
    property_data = []

    for property in properties:
        try:
            price = property.find('span', class_='property-price').get_text(strip=True)
        except AttributeError:
            price = None
        try:
            address = property.find('a', class_='residential-card__address-heading').get_text(strip=True)
        except AttributeError:
            address = None
        try:
            beds = property.find('span', class_='general-features__beds').get_text(strip=True)
        except AttributeError:
            beds = None
        try:
            baths = property.find('span', class_='general-features__baths').get_text(strip=True)
        except AttributeError:
            baths = None
        try:
            agent = property.find('span', class_='agent-name').get_text(strip=True)
        except AttributeError:
            agent = None
        
        # Append property details to the list
        property_data.append({
            "Price": price,
            "Address": address,
            "Bedrooms": beds,
            "Bathrooms": baths,
            "Agent": agent
        })

    return property_data

def save_to_csv(data, filename):
    # Convert the list of dictionaries to a DataFrame
    df = pd.DataFrame(data)
    # Save the DataFrame to a CSV file
    df.to_csv(filename, index=False)

def main():
    search_query = "Epping"
    property_data = fetch_property_data(search_query)
    save_to_csv(property_data, 'properties_epping.csv')
    print(f"Scraped data saved to properties_epping.csv")

if __name__ == "__main__":
    main()