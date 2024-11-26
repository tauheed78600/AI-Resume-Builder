import spacy
from PyPDF2 import PdfReader
from docx import Document
import json
import logging
import re
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load spaCy model (replace 'en_core_web_sm' with a suitable model)
nlp = spacy.load("en_core_web_sm")

# Configure logging
logging.basicConfig(filename="debug.log",
                     format='%(asctime)s - %(levelname)s - %(message)s',
                     filemode='w')

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)  # Set the logging level to DEBUG


def extract_text(file_path):
    """
    Extracts text from a PDF or DOCX file.
    """
    logger.debug(f"Extracting text from {file_path}")
    file_type = file_path.split('.')[-1]
    logger.debug(f"file_type text from {file_type}")
    text = ''
    if file_type == 'pdf':
        reader = PdfReader(file_path)
        for page in reader.pages:
            text += page.extract_text()
    elif file_type == 'docx':
        doc = Document(file_path)
        for paragraph in doc.paragraphs:
            text += paragraph.text + '\n'
    else:
        logger.error(f"Unsupported file type: {file_type}")
        raise ValueError('Unsupported file type')
    logger.debug(f"Extracted text: {text[:500]}")  # Log first 500 characters
    return text


def analyze_section_relevance(section_text, job_title):
    """
    Compares a section's text with the job title using TF-IDF and cosine similarity.
    """
    logger.debug(f"Analyzing section relevance: {section_text} ")
    logger.debug(f"Analyzing section relevance: {job_title} ")

    # Preprocess text with spaCy
    doc1 = nlp(job_title)
    doc2 = nlp(section_text)

    # Extract keywords using spaCy's tokenization and part-of-speech tagging
    keywords1 = [token.lemma_ for token in doc1 if not token.is_stop and token.pos_ in ['NOUN', 'VERB', 'ADJ']]
    keywords2 = [token.lemma_ for token in doc2 if not token.is_stop and token.pos_ in ['NOUN', 'VERB', 'ADJ']]

    # Create a combined text for TF-IDF
    combined_text = ' '.join(keywords1 + keywords2)

    documents = [job_title, section_text]
    vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))
    tfidf_matrix = vectorizer.fit_transform(documents)
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    score = round(similarity[0][0] * 100, 2)
    logger.debug(f"Relevance score: {score}%")
    return score


def analyze_text(text, job_title):
    """
    Analyzes the relevance of the resume's sections to the given job title.
    """
    logger.debug("Analyzing text")
    sections = {
        'Job Summary': any([token.text.lower() in ['summary', 'profile', 'objective'] for token in nlp(text)]),
        'Skills': any([token.text.lower() == 'skills' for token in nlp(text)]),
        'Projects': any([token.text.lower() in ['projects', 'experience'] for token in nlp(text)]),
        'Experience': any([token.text.lower() in ['experience', 'work experience'] for token in nlp(text)]),
        'Education': any([token.text.lower() == 'education' for token in nlp(text)]),
    }

    relevance_scores = {}
    suggestions = []
    total_score = 0

    logger.debug(f"sections before for loop: {sections}")

    for section, exists in sections.items():
        if exists:
            pattern = rf"{section}.*?(?=(\n[A-Z][a-zA-Z]+:|$))"
            logger.debug(f"inside for loop: {pattern}")
            section_content = re.search(pattern, text, re.I | re.S)
            section_text = section_content.group(0) if section_content else ""
            relevance_scores[section] = analyze_section_relevance(section_text, job_title)
            total_score += relevance_scores[section]
        else:
            suggestions.append(f"Add a {section} section to better align with the job title.")

    average_score = round(total_score / len(sections), 2)
    logger.debug(f"Relevance scores: {relevance_scores}")
    logger.debug(f"Suggestions: {suggestions}")

    return {
        'job_title': job_title,
        'relevance_scores': relevance_scores,
        'average_score': average_score,
        'suggestions': suggestions,
    }


if __name__ == '__main__':
    import sys
    file_path = sys.argv[2]
    job_title = sys.argv[1]

    logger.debug(f"file path and job title: {file_path} {job_title}")

    extracted_text = extract_text(file_path)
    extracted_text = extracted_text.replace('\r\n', '\n').replace('\r', '\n')

    final_job_title = job_title if job_title.lower() != "unknown" else job_title

    analysis_result = analyze_text(extracted_text, final_job_title)
    print(json.dumps(analysis_result, indent=4))