import pandas as pd
import numpy as np
import pickle
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn import svm
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load datasets
dis_sym_data = pd.read_csv("Processed_dataset.csv")
doc_data = pd.read_csv("Doctor_Versus_Disease.csv", encoding='latin1', names=['Disease', 'Specialist'])
des_data = pd.read_csv("Disease_Description.csv")

# Update specialist for Tuberculosis
doc_data['Specialist'] = np.where((doc_data['Disease'] == 'Tuberculosis'), 'Pulmonologist', doc_data['Specialist'])

# Prepare data
columns_to_check = [col for col in dis_sym_data.columns if col != 'Disease']
symptoms = list(set(dis_sym_data.iloc[:, 1:].values.flatten()))

for symptom in symptoms:
    dis_sym_data[symptom] = dis_sym_data.iloc[:, 1:].apply(lambda row: int(symptom in row.values), axis=1)

dis_sym_data_v1 = dis_sym_data.drop(columns=columns_to_check)
dis_sym_data_v1 = dis_sym_data_v1.loc[:, dis_sym_data_v1.columns.notna()]
dis_sym_data_v1.columns = dis_sym_data_v1.columns.str.strip()

# Encode the Disease column
le = LabelEncoder()
dis_sym_data_v1['Disease'] = le.fit_transform(dis_sym_data_v1['Disease'])

# Save the label encoder
with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(le, f)

# Define features and target variable
X = dis_sym_data_v1.drop(columns="Disease")
y = dis_sym_data_v1['Disease']

# Save feature names
with open('feature_names.pkl', 'wb') as f:
    pickle.dump(X.columns.tolist(), f)

# Define and train algorithms
algorithms = {
    'Logistic Regression': LogisticRegression(),
    'Decision Tree': tree.DecisionTreeClassifier(),
    'Random Forest': RandomForestClassifier(),
    'SVM': svm.SVC(probability=True),
    'NaiveBayes': GaussianNB(),
    'K-Nearest Neighbors': KNeighborsClassifier(),
}

for model_name, model in algorithms.items():
    model.fit(X, y)
    with open(f'{model_name}.pkl', 'wb') as f:
        pickle.dump(model, f)

print("Models, feature names, and label encoder saved successfully.")
