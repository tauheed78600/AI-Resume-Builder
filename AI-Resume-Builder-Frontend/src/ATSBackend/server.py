import pickle
import re
import nltk
from flask import Flask, jsonify, request
from flask_cors import CORS

# nltk.download('punkt')
# nltk.download('stopwords')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/')
def home():
    return "Welcome to the Python Backend Server!"


category_dict = {
    1: 'Web Designing',
    2: 'Data Science',
    3: 'Blockchain',
    4: 'Business Analyst',
    5: 'Mechanical Engineer',
    6: 'Java Developer',
    7: 'Testing',
    8: 'Python Developer',
    9: 'Automation Testing',
    10: 'HR',
    11: 'Operations Manager',
    12: 'ETL Developer',
    13: 'Electrical Engineering',
    14: 'Civil Engineer',
    15: 'DevOps Engineer',
    16: 'Network Security Engineer',
    17: 'Database',
    18: 'PMO',
    19: 'Sales',
    20: 'Advocate',
    21: 'DotNet Developer',
    22: 'SAP Developer',
    23: 'Hadoop',
    24: 'Arts',
    25: 'Health and fitness'
}

def cleanResume(txt):
    cleanText = re.sub('http\S+\s', ' ', txt)
    cleanText = re.sub('RT|cc', ' ', cleanText)
    cleanText = re.sub('#\S+\s', ' ', cleanText)
    cleanText = re.sub('@\S+', '  ', cleanText)
    cleanText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', cleanText)
    cleanText = re.sub(r'[^\x00-\x7f]', ' ', cleanText)
    cleanText = re.sub('\s+', ' ', cleanText)
    return cleanText

clf = pickle.load(open('clf.pkl', 'rb'))
tfIdfd = pickle.load(open('tfIdf.pkl', 'rb'))
@app.route('/ats-scan', methods=['POST'])
def checkATSScore():
    data = request.json
    resumeData = data['text']
    cleanedResume = cleanResume(resumeData)
    inputFeatures = tfIdfd.transform([cleanedResume])
    predictionId = clf.predict(inputFeatures)[0]
    print("predictionId line 39", predictionId)
    resumeName = category_dict[predictionId]
    print("resumeName", resumeName)
    response = {
        "received": resumeName,
        "status": "Data received successfully"
    }
    return jsonify(response)



if __name__ == '__main__':
    app.run(debug=True)
