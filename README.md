# disease2gene
private repo belonging to Michał Bujniewicz-Uppal
# Scientific Literature Genetic Insights Pipeline (Jupyter Notebooks)

This repository contains a series of Jupyter/Colab notebooks that form a pipeline to extract genetic information and related insights from scientific literature (PubMed articles) using NCBI Entrez APIs and Google's Gemini AI.

## Pipeline Overview

The pipeline is designed to be run sequentially, where the output of one notebook often serves as the input for the next. The general workflow is:

1.  **PubMed Data Collection (`01_pubmed_data_collection.ipynb`):**
    * Searches PubMed for articles based on a defined query (e.g., related to specific diseases, genetic terms, and authors).
    * Retrieves metadata for these articles (PMID, title, authors, journal, year, abstract).
    * Identifies and validates gene symbols mentioned in the text using an HGNC approved gene list.
    * Fetches linked gene and variant information from NCBI databases (Entrez Gene, dbSNP).
    * Collects citation counts from both PubMed and Semantic Scholar.
    * Outputs a primary CSV file (`pubmed_genetic_results_*.csv`) containing this collated information, with each row representing a gene or variant found in a paper.

2.  **Full-Text Retrieval (`02_full_text_retrieval.ipynb`):**
    * Takes the list of unique PMIDs from the output of the first notebook.
    * For each PMID, it attempts to find and download the full-text content of the article from publisher websites or PMC.
    * It tries to determine if the content is HTML or XML.
    * Saves the retrieved content (or an error status) into a gzipped pickle file (`content_dict.pkl.gz`), mapping PMIDs to their full text and source URL.

3.  **Gemini AI Data Extraction (`03_gemini_data_extraction.ipynb`):**
    * Loads the `pubmed_genetic_results_*.csv` from Notebook 1 and the `content_dict.pkl.gz` from Notebook 2.
    * Filters the CSV to only include rows for PMIDs where full text was successfully retrieved.
    * For each relevant row in the CSV (representing a specific gene/variant in a paper):
        * Extracts clean text from the stored full-text HTML/XML content.
        * Constructs a detailed prompt for Google's Gemini AI, providing the paper's text and the specific gene/variant of interest from that CSV row.
        * Requests structured information from Gemini (e.g., findings, p-value, population, variant details, gene association).
    * Appends these AI-extracted fields to the original CSV data.
    * Saves the final augmented dataset as a new CSV file (`gemini_extracted_row_by_row_*.csv`) and a JSON file.

## Prerequisites

To run these notebooks, you will need:

* **Python Environment:** A working Python environment (e.g., Anaconda, standard Python with pip) where you can run Jupyter Notebooks or Google Colab.
* **Required Libraries:** Each notebook will typically have a section at the beginning to install necessary Python libraries (e.g., `pandas`, `requests`, `beautifulsoup4`, `spacy`, `scispacy`, `google-generativeai`, `biopython`, `trafilatura`, `tqdm`, `ratelimit`). You'll need to run these installation cells.
* **NCBI Entrez API Key & Email:**
    * You should provide your email address to NCBI Entrez for API usage.
    * An API key is highly recommended for higher rate limits.
    * These are typically configured within `01_pubmed_data_collection.ipynb`.
* **Google Gemini API Key:**
    * You will need an API key for Google's Gemini AI.
    * This is typically configured within `03_gemini_data_extraction.ipynb`.
* **SciSpaCy Model:** The pipeline uses a SciSpaCy model (e.g., `en_ner_bionlp13cg_md`) for gene name recognition. The first notebook (`01_pubmed_data_collection.ipynb`) will likely contain instructions or code to download this model if it's not already present in your environment.


## TO DO 
- Create py files for the pipeline for later production and hosting oncloud service
- Think of how to structure the repo so that tools, queries (along with author and specific paper requests), api keys are all stored separately.
- The query should be an input defined by the end user.
- Create fastapi services
  
