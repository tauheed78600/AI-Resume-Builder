import numpy as np
import pandas as pd
import matplotlib as plt
import seaborn as sns
import re

df = pd.read_csv('Dataset/UpdatedResumeDataSet.csv')

# Data Pre-Processing
def cleanResume(txt):
    cleanText = re.sub('http\S+\s', ' ', txt)
    cleanText = re.sub('RT|cc', ' ', cleanText)
    cleanText = re.sub('#\S+\s', ' ', cleanText)
    cleanText = re.sub('@\S+', '  ', cleanText)
    cleanText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', cleanText)  # for removing special chars
    cleanText = re.sub(r'[^\x00-\x7f]', ' ', cleanText)
    cleanText = re.sub('\s+', ' ', cleanText)
    return cleanText

df['Resume'] = df['Resume'].apply(lambda x: cleanResume(x))
# print(df['Resume'])

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
le.fit(df['Category'])
df["Category"] = le.transform(df['Category'])

category_dict = {category: label for category, label in zip(le.classes_, le.transform(le.classes_))}

print(df['Category'])
print(category_dict)

from sklearn.feature_extraction.text import TfidfVectorizer
tfIdf = TfidfVectorizer(stop_words='english')

tfIdf.fit(df['Resume'])

reqText= tfIdf.transform(df['Resume'])

from sklearn.model_selection import train_test_split

X_train, X_test, Y_train, Y_test = train_test_split(reqText, df['Category'], test_size=0.2, random_state=42)

from sklearn.neighbors import KNeighborsClassifier
from sklearn.multiclass import OneVsRestClassifier
from sklearn.metrics import accuracy_score

clf = OneVsRestClassifier(KNeighborsClassifier())
clf.fit(X_train, Y_train)

ypred = clf.predict(X_test)
print(ypred)
print(accuracy_score(Y_test, ypred))


import pickle

pickle.dump(tfIdf, open('tfIdf.pkl', 'wb'))
pickle.dump(clf, open('clf.pkl', 'wb'))

import re
import nltk

# nltk.download('punkt')
# nltk.download('stopwords')

clf = pickle.load(open('clf.pkl', 'rb'))
tfIdfd = pickle.load(open('tfIdf.pkl', 'rb'))


