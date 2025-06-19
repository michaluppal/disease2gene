import csv
import time
import logging
import uuid
import sys
from Bio import Entrez, Medline
from tqdm import tqdm
import xml.etree.ElementTree as ET
import requests
import spacy
import os
import re
import json

HGNC_TSV_URL = "https://storage.googleapis.com/public-download-files/hgnc/tsv/hgnc_complete_set.txt"
APPROVED_GENE_SYMBOLS_FILE = "hgnc_approved_genes.txt"
APPROVED_SYMBOL_COLUMN_NAME = "symbol"
STATUS_COLUMN_NAME = "status"
REQUIRED_STATUS = "Approved"
APPROVED_GENE_SYMBOLS = set()

ENTREZ_EMAIL = "michal.uppal@gmail.com"
ENTREZ_API_KEY = "be8c41829a4406a6d8a0f2d8ec242d9db108"
MAX_RESULTS = 5000
BATCH_SIZE = 10
RETRY_BATCH_SIZE = 3
RETRIES = 3
BASE_SLEEP = 0.1
TARGET_AUTHOR = ['Casanova', 'Jean-Laurent Casanova', 'Casanova JL', 'Casanova J-L']
PMIDS_TO_CHECK = ['33106546']
CRITICAL_PMIDS = ['33106546']

_GENE_BLACKLIST_TERMS = {
    'SARS', 'MIS-C', 'PIMS', 'PIMS-TS', 'COVID', 'HLA', 'HIV', 'EBV',
    'CONCLUSIONS', 'BACKGROUND', 'PATIENTS', 'METHODS', 'RESULTS', 'AND',
    'SD', 'INTRODUCTION', 'ABSTRACT', 'DISCUSSION', 'GENE', 'VARIANT'
}
GENE_BLACKLIST = {term.upper() for term in _GENE_BLACKLIST_TERMS}

VARIANT_KEYWORDS = {'variant', 'variants', 'mutation', 'mutations', 'allele', 'alleles'}
QUERY = (
    "(Multisystem Inflammatory Syndrome in Children[MeSH Terms] OR "
    "MIS-C[Title/Abstract] OR PIMS[Title/Abstract] OR PIMS-TS[Title/Abstract] OR "
    "Paediatric Inflammatory Multisystem Syndrome[Title/Abstract] OR "
    "Kawasaki Disease[MeSH Terms] OR Kawasaki Disease[Title/Abstract] OR Kawasaki Syndrome[Title/Abstract]) AND "
    "(Genetic Predisposition to Disease[MeSH Terms] OR Polymorphism, Genetic[MeSH Terms] OR "
    "Mutation[MeSH Terms] OR Genome-Wide Association Study[MeSH Terms] OR "
    "genes[Title/Abstract] OR variants[Title/Abstract] OR genetic association[Title/Abstract] OR "
    "polymorphism[Title/Abstract] OR mutation[Title/Abstract] OR gwas[Title/Abstract] OR "
    "inborn errors[Title/Abstract] OR genetic defects[Title/Abstract] OR "
    "genomics[Title/Abstract] OR gene expression[Title/Abstract] OR "
    f"({' OR '.join(f'{author}[Author]' for author in TARGET_AUTHOR)}))"
)

logging.basicConfig(filename='pubmed_errors.log', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

Entrez.email = ENTREZ_EMAIL
if ENTREZ_API_KEY:
    Entrez.api_key = ENTREZ_API_KEY

nlp = None
try:
    nlp = spacy.load("en_ner_bionlp13cg_md")
    logging.info("SciSpaCy model 'en_ner_bionlp13cg_md' loaded successfully.")
except Exception as e:
    logging.error(f"Failed to load SciSpaCy model 'en_ner_bionlp13cg_md': {e}.")
    print(f"CRITICAL: Failed to load SciSpaCy model. Text processing for genes/variants will be skipped. Error: {e}")

def load_config(config_path="config.json"):
    """Load API credentials and email from a config file."""
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Config file '{config_path}' not found. Please create it with ENTREZ_EMAIL and ENTREZ_API_KEY.")
    with open(config_path, "r") as f:
        config = json.load(f)
    return config.get("ENTREZ_EMAIL"), config.get("ENTREZ_API_KEY")

def create_approved_gene_list_from_hgnc(hgnc_tsv_url, approved_gene_symbols_file, symbol_column_name, status_column_name, required_status):
    """Download HGNC gene list and create a local file."""
    try:
        response = requests.get(hgnc_tsv_url)
        response.raise_for_status()
        with open(approved_gene_symbols_file, 'w') as f:
            f.write(response.text)
        print(f"Downloaded and saved HGNC gene list to '{approved_gene_symbols_file}'.")
        return True
    except Exception as e:
        print(f"Error downloading HGNC gene list: {e}")
        logging.error(f"Error downloading HGNC gene list: {e}")
        return False

def ensure_hgnc_gene_list(hgnc_tsv_url, approved_gene_symbols_file, symbol_column_name, status_column_name, required_status):
    """Ensure the HGNC gene list file exists, create it if not."""
    if not os.path.exists(approved_gene_symbols_file):
        print(f"'{approved_gene_symbols_file}' not found. Attempting to download and create it...")
        created = create_approved_gene_list_from_hgnc(
            hgnc_tsv_url, approved_gene_symbols_file, symbol_column_name, status_column_name, required_status
        )
        if not created:
            print(f"Failed to create '{approved_gene_symbols_file}'. Gene validation against HGNC list will be skipped.")
            logging.error(f"Failed to create '{approved_gene_symbols_file}'.")
        else:
            print(f"Successfully created '{approved_gene_symbols_file}'.")
    else:
        print(f"Using existing HGNC gene list: {approved_gene_symbols_file}")

    approved_gene_symbols = set()
    if os.path.exists(approved_gene_symbols_file):
        with open(approved_gene_symbols_file, 'r') as f:
            approved_gene_symbols = {line.strip().upper() for line in f if line.strip()}
    return approved_gene_symbols

def check_paper_in_query(pmid_to_check, query_to_check=None):
    """Check if a specific paper is in the query results."""
    # This function's implementation is not provided in the original code
    pass

def search_pubmed(query_to_search):
    """Search PubMed for papers matching the query."""
    # This function's implementation is not provided in the original code
    return []

def fetch_paper_titles(paper_ids):
    """Fetch paper titles for the given list of paper IDs."""
    # This function's implementation is not provided in the original code
    pass

def fetch_citation_counts(paper_ids):
    """Fetch citation counts for the given list of paper IDs."""
    # This function's implementation is not provided in the original code
    pass

def fetch_s2_citation_counts(paper_ids):
    """Fetch Semantic Scholar citation counts for the given list of paper IDs."""
    # This function's implementation is not provided in the original code
    pass

def fetch_linked_data(paper_id):
    """Fetch linked data (e.g., genes, variants) for a given paper ID."""
    # This function's implementation is not provided in the original code
    pass

def fetch_gene_names(text):
    """Extract gene names from text using SciSpaCy."""
    # This function's implementation is not provided in the original code
    pass

def fetch_variant_details(text):
    """Extract variant details from text using SciSpaCy."""
    # This function's implementation is not provided in the original code
    pass

def main(
    query,
    critical_pmids=None,
    pmids_to_check=None,
    target_author=None,
    hgnc_tsv_url=HGNC_TSV_URL,
    approved_gene_symbols_file=APPROVED_GENE_SYMBOLS_FILE,
    config_path="config.json"
):
    """
    Main pipeline function. All user input should be passed as arguments.
    """
    # Load API credentials
    entrez_email, entrez_api_key = load_config(config_path)
    Entrez.email = entrez_email
    if entrez_api_key:
        Entrez.api_key = entrez_api_key

    # Set up target authors
    global TARGET_AUTHOR
    if target_author is not None:
        TARGET_AUTHOR = target_author

    # Ensure HGNC gene list exists and load it
    global APPROVED_GENE_SYMBOLS
    APPROVED_GENE_SYMBOLS = ensure_hgnc_gene_list(
        hgnc_tsv_url, approved_gene_symbols_file, APPROVED_SYMBOL_COLUMN_NAME, STATUS_COLUMN_NAME, REQUIRED_STATUS
    )
    if APPROVED_GENE_SYMBOLS:
        print(f"Loaded {len(APPROVED_GENE_SYMBOLS)} approved gene symbols for validation.")
    else:
        print(f"Warning: No approved gene symbols loaded. Validation will be limited.")

    # Check PMIDs if provided
    if pmids_to_check:
        for pmid_to_check in pmids_to_check:
            check_paper_in_query(pmid_to_check, query_to_check=query)

    # Search PubMed
    paper_ids_list = search_pubmed(query_to_search=query)
    print(f"Found {len(paper_ids_list)} papers initially from PubMed search.")

    # Add critical PMIDs
    if critical_pmids:
        initial_pmid_count = len(paper_ids_list)
        paper_ids_set = set(paper_ids_list)
        for critical_pmid in critical_pmids:
            if critical_pmid not in paper_ids_set:
                paper_ids_set.add(critical_pmid)
                logging.info(f"Manually added critical PMID {critical_pmid} to paper_ids_set")
        paper_ids_list = list(paper_ids_set)
        if len(paper_ids_list) > initial_pmid_count:
            print(f"Added {len(paper_ids_list) - initial_pmid_count} critical PMIDs. Total papers to process: {len(paper_ids_list)}")

    # ...existing code: rest of the pipeline logic, using paper_ids_list...
    # (fetch_paper_titles, fetch_citation_counts, etc.)
    # Replace any global references to QUERY, CRITICAL_PMIDS, PMIDS_TO_CHECK, TARGET_AUTHOR with the function arguments

if __name__ == "__main__":
    # Example usage: load config and run with default query
    # User should provide their own config.json with ENTREZ_EMAIL and ENTREZ_API_KEY
    main(
        query=QUERY,
        critical_pmids=CRITICAL_PMIDS,
        pmids_to_check=PMIDS_TO_CHECK,
        target_author=TARGET_AUTHOR
    )
