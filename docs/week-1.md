# Title Verification System - Week 1 Progress

## Overview

In Week 1, our team established the foundation for the Title Verification System project. We set up the GitHub repository, uploaded the raw dataset, and performed the initial data cleaning and preprocessing. This phase focused on preparing a high-quality dataset that will serve as the basis for our title similarity and verification algorithms.

## Repository Setup

- **GitHub Repository:**  
  We created a GitHub repository for the project and made it accessible to all team members.  
  Repository link: [TitleVerificationSystem](https://github.com/chaitany233patil/TitleVerificationSystem.git)

## Data Upload

- **Raw Dataset:**  
  We uploaded the raw dataset containing title information (both English and Hindi titles) to the repository. This dataset includes details like Title Code, Title Name, Hindi Title, Register Serial No, Regn No., Owner Name, State, Publication City/District, and Periodity.

## Data Cleaning & Preprocessing

### 1. Handling Missing Values
- We identified missing values in several columns.
- Specifically, for the **Hindi Title** section, we used a Google Translate formula in Google Sheets to fill missing values, ensuring a complete dataset for both English and Hindi titles.

### 2. Removal of Duplicate Entries
- We removed duplicate entries from the dataset based on the "Title Name" column.
- In addition, separate datasets were created:
  - One containing only **English titles**.
  - Another containing only **Hindi titles**.

### 3. Standardizing English Titles
- **Lowercasing:**  
  All English titles were converted to lowercase to ensure uniformity.
- **Trimming Extra Spaces:**  
  Extra spaces were removed from the titles to maintain consistency.

## Summary of Week 1 Achievements

- **GitHub Repository Setup:**  
  Repository created and shared with the team.

- **Dataset Management:**  
  - Raw dataset uploaded.
  - Missing values in Hindi Title section filled using Google Translate in Google Sheets.
  - Duplicate titles removed.
  - Separate datasets for English and Hindi titles created.

- **Text Preprocessing:**  
  Standardized English titles by converting to lowercase and trimming extra spaces.

## Next Steps (Week 2 and Beyond)

In the coming weeks, we plan to:
- Implement advanced text preprocessing and normalization.
- Develop similarity detection methods using TF-IDF, Cosine Similarity, phonetic matching (Soundex/Metaphone), and semantic similarity techniques.
- Begin prototyping an API and a simple frontend for user interactions.
- Further refine our datasets and incorporate additional domain-specific cleaning if necessary.

---

We are excited about the progress made in Week 1 and look forward to enhancing the system in the upcoming phases!
