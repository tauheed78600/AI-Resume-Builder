import spacy
from PyPDF2 import PdfReader
from docx import Document
import json
import logging
import re
from collections import defaultdict
import os

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Configure logging
logging.basicConfig(
    filename="ats_debug.log",
    format='%(asctime)s - %(levelname)s - %(message)s',
    filemode='w'
)
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def extract_text(file_path):
    """
    Extracts text from a PDF or DOCX file.
    """
    logger.debug(f"Extracting text from {file_path}")
    file_type = file_path.split('.')[-1]
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
    logger.debug(f"Extracted text (first 500 characters): {text[:500]}")
    return text

def extract_sections(text):
    """
    Extracts sections from the resume text using regex.
    """
    logger.debug("Extracting sections from the resume")
    sections = {
        "summary": r"(summary|profile|objective).*?(?=(\n[A-Z][a-zA-Z]+:|$))",
        "skills": r"(skills).*?(?=(\n[A-Z][a-zA-Z]+:|$))",
        "experience": r"(experience|work experience).*?(?=(\n[A-Z][a-zA-Z]+:|$))",
        "projects": r"(projects).*?(?=(\n[A-Z][a-zA-Z]+:|$))",
        "education": r"(education).*?(?=(\n[A-Z][a-zA-Z]+:|$))"
    }
    extracted = {}
    for section, pattern in sections.items():
        match = re.search(pattern, text, re.I | re.S)
        extracted[section] = match.group(0).strip() if match else ""
        logger.debug(f"Extracted {section} section: {extracted[section][:200]}")
    return extracted

def parse_job_description(job_description):
    """
    Parses the job description to extract required skills, experience, and keywords.
    """
    logger.debug("Parsing job description")
    skills = re.findall(r"(skills|technologies required):?\s*(.*?)\.", job_description, re.I)
    experience = re.findall(r"(experience required):?\s*(.*?)\.", job_description, re.I)
    projects = re.findall(r"(project requirements):?\s*(.*?)\.", job_description, re.I)

    parsed = {
        "skills": skills[0][1].split(", ") if skills else [],
        "experience": experience[0][1].split(", ") if experience else [],
        "projects": projects[0][1].split(", ") if projects else []
    }
    logger.debug(f"Parsed job description: {parsed}")
    return parsed

def match_keywords(section_text, keywords):
    """
    Matches keywords in a section against the given list of keywords.
    """
    logger.debug(f"Matching keywords in section")
    words = section_text.lower().split()
    matched_keywords = [word for word in keywords if word.lower() in words]
    logger.debug(f"Matched keywords: {matched_keywords}")
    return matched_keywords

def analyze_resume(resume_sections, job_requirements):
    """
    Analyzes resume sections against the job requirements and calculates matching scores.
    """
    logger.debug("Analyzing resume sections")
    analysis = defaultdict(dict)

    for section, content in resume_sections.items():
        if content:
            for key, keywords in job_requirements.items():
                matched = match_keywords(content, keywords)
                analysis[section][key] = {
                    "matched_keywords": matched,
                    "match_count": len(matched),
                    "total_keywords": len(keywords)
                }
        else:
            analysis[section] = {"status": f"{section.capitalize()} section is missing"}

    return analysis

def ats_process(job_description, resume_path):
    """
    Processes the resume and compares it against the job description.
    """
    logger.debug(f"Starting ATS process line 113 {job_description} {resume_path}")
    # Step 1: Extract resume text
    resume_text = extract_text(resume_path)
    resume_text = resume_text.replace('\r\n', '\n').replace('\r', '\n')

    # Step 2: Extract sections from the resume
    resume_sections = extract_sections(resume_text)

    # Step 3: Parse the job description
    job_requirements = parse_job_description(job_description)

    # Step 4: Analyze the resume
    analysis_results = analyze_resume(resume_sections, job_requirements)

    logger.debug("ATS process complete")
    return analysis_results

def read_job_description(job_desc_file_path):
    # Check if file exists
    if not os.path.exists(job_desc_file_path):
        print(f"Error: The job description file does not exist at {job_desc_file_path}")
        logger.error(f"File not found: {job_desc_file_path}")
        sys.exit(1)

    logger.debug(f"Trying to open job description file: {job_desc_file_path}")

    # Normalize the path in case of Windows
    job_desc_file_path = os.path.normpath(job_desc_file_path)

    try:
        with open(job_desc_file_path, 'r') as file:
            job_description_text = file.read()
            print("Job description (first 500 characters):", job_description_text[:500])  # Debug print
            logger.debug(f"Job description text (first 500 characters): {job_description_text[:500]}")
    except FileNotFoundError:
        print(f"Error: Job description file not found at {job_desc_file_path}")
        logger.error(f"FileNotFoundError: {job_desc_file_path}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading job description file: {e}")
        logger.error(f"Error reading job description file: {e}")
        sys.exit(1)
    
    return job_description_text

if __name__ == "__main__":
    import sys
    print("Script started")
    print("Arguments received:", len(sys.argv))

    job_desc_file_path = sys.argv[1]
    job_description_text = read_job_description(job_desc_file_path)
    
    logger.debug(f"line 140 {job_description_text}")

    resume_file_path = sys.argv[2]

    results = ats_process(job_description_text, resume_file_path)

    # Output results
    print(json.dumps(results, indent=4))
