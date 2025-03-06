Title Verification System - Week 2 Progress

Overview

In Week 2, we focused on refining the dataset further by addressing inconsistencies, removing duplicates, and ensuring data integrity. The primary goal was to achieve a fully cleaned dataset with standardized titles in both English and Hindi. This phase involved multiple iterations of cleaning, verification, and final validation to ensure high-quality data for the title verification system.

Data Cleaning & Preprocessing

1. Duplicate Handling

Identified and removed duplicate rows to maintain unique entries.

Found duplicate Hindi titles with slight variations in English counterparts and consolidated them.

2. Special Character Removal

Detected and removed non-Hindi characters from the Hindi Title column.

Ensured only valid Devanagari script characters were retained in Hindi titles.

3. Missing Value Handling

Filled missing values in the "Cleaned Hindi Title" column using corresponding values from the "Hindi Title" column.

Ensured no missing values were left in critical fields.

4. Standardization & Formatting

Lowercased all English titles to ensure uniformity.

Trimmed unnecessary spaces and punctuation from both English and Hindi titles.

Ensured consistent formatting across all cleaned titles.

Final Verification & Results

After multiple iterations, the dataset was validated against key quality checks:

No missing values ✅

No duplicate Hindi titles ✅

No unwanted special characters ✅

Uniform formatting for all titles ✅

The final cleaned dataset was exported and is now ready for further processing in the title verification system.

Next Steps (Week 3 and Beyond)

In the upcoming weeks, we aim to:

Implement advanced text normalization techniques to enhance accuracy.

Develop similarity detection algorithms using TF-IDF, Cosine Similarity, and phonetic matching.

Begin integrating the cleaned dataset into the verification system backend.

With a fully cleaned and structured dataset, we are now well-prepared for the next phase of development!