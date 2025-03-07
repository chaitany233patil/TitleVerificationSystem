import pandas as pd
import re
from unidecode import unidecode
from nltk.metrics import edit_distance
from nltk.corpus import stopwords
from collections import defaultdict
import jellyfish

# Load the cleaned dataset
file_path = "/content/Cleaned_Dataset.xlsx"
df = pd.read_excel(file_path)

# Display the first few rows
df.head()

# Function to normalize text
def normalize_title(title):
    title = str(title).lower()  # Convert to lowercase
    title = unidecode(title)  # Convert Unicode to ASCII (handle accents, special characters)
    title = re.sub(r'[^a-z0-9\s]', '', title)  # Remove non-alphanumeric characters
    title = re.sub(r'\s+', ' ', title).strip()  # Remove extra spaces
    return title

# Apply normalization to the titles
df["Normalized Title"] = df["Title Name in Lower"].apply(normalize_title)

# Display updated DataFrame
df.head()

# Function to normalize text without unidecode
def normalize_title(title):
    title = str(title).lower()  # Convert to lowercase
    title = re.sub(r'[^a-z0-9\s]', '', title)  # Remove non-alphanumeric characters
    title = re.sub(r'\s+', ' ', title).strip()  # Remove extra spaces
    return title

# Apply normalization to the titles
df["Normalized Title"] = df["Title Name in Lower"].apply(normalize_title)

# Display updated DataFrame
df.head()

# Function to compute Soundex encoding
def get_soundex(title):
    return jellyfish.soundex(title)

# Apply Soundex encoding
df["Soundex"] = df["Normalized Title"].apply(get_soundex)

# Display updated DataFrame
df.head()

# Function to compute Levenshtein similarity
def levenshtein_similarity(title1, title2):
    max_len = max(len(title1), len(title2))
    if max_len == 0:
        return 1.0  # If both strings are empty, they are identical
    return 1 - (edit_distance(title1, title2) / max_len)

# Example: Compute similarity of the first two titles in the dataset
sample_title1 = df.loc[2, "Normalized Title"]
sample_title2 = df.loc[1, "Normalized Title"]

similarity_score = levenshtein_similarity(sample_title1, sample_title2) * 100

# Show sample similarity score
round(similarity_score,2)


# Function to compare a new title against all existing titles and return the most similar ones
def find_most_similar_titles(new_title, existing_titles, threshold=80):
    similar_titles = []

    for existing_title in existing_titles:
        similarity = levenshtein_similarity(new_title, existing_title) * 100  # Convert to percentage
        if similarity >= threshold:  # Only keep highly similar titles
            similar_titles.append((existing_title, similarity))

    # Sort by similarity in descending order (most similar first)
    similar_titles.sort(key=lambda x: x[1], reverse=True)

    return similar_titles

# Test with a new title
new_title = "indian times"
existing_titles = df["Normalized Title"].tolist()

# Find similar titles
similar_titles_list = find_most_similar_titles(new_title, existing_titles, threshold=80)

# Display results
similar_titles_list[:10]  # Show top 10 similar titles
