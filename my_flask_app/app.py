from flask import Flask, render_template, request, send_from_directory , jsonify
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
import pandas as pd
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import re
from collections import Counter
from nltk.corpus import stopwords
import os

# Initialize Flask app
app = Flask(__name__)

# Create directory for saving images if it doesn't exist
if not os.path.exists('static/images'):
    os.makedirs('static/images')

# Load pre-saved FAISS index and embeddings
index = faiss.read_index('job_titles_index.index')
embeddings = np.load('job_embeddings.npy')

# Load your CSV with job titles
df = pd.read_csv('/home/user/Desktop/dwa_project/headhunter_jobs.csv')

# Load multilingual model (only for encoding queries)
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2', device='cuda')  # use CUDA if available

# Function to perform search
def search_job_title(query_title, k=5):
    query_embedding = model.encode([query_title], convert_to_numpy=True, device='cuda')
    D, I = index.search(query_embedding, k)
    results = df.iloc[I[0]]
    return results

# Function to generate word cloud
def generate_wordcloud(query, k=20):
    results = search_job_title(query, k)
    requirements = results['Requirements'].tolist()
    all_requirements = " ".join(requirements)

    # Preprocess the text
    all_requirements = re.sub(r'<highlighttext.*?>.*?<\/highlighttext>|<\/highlighttext>', '', all_requirements)
    all_requirements = re.sub(r'[^a-zA-Zа-яА-Я .+]', '', all_requirements)
    all_requirements = all_requirements.lower()

    # Split the text into words
    words = all_requirements.split()

    # Get stop words for English and Russian
    stop_words_en = set(stopwords.words('english'))
    stop_words_ru = set([
        "и", "в", "во", "не", "что", "он", "на", "я", "с", "со", "как", "для", "ты", "к", "у", "за", "по", "то", "знание","из", "бы", "этот","ОПЫТ","умение","работы","работы","лет","лет .","лет.","понимание","работе","работу"
        "так", "она", "его", "это", "когда", "все", "да", "я", "ж", "вы", "себя", "вот", "ну", "мне", "чтобы", "может", "или", "от", "если","<highlighttext>","</highlighttext>"
    ])
    stop_words = stop_words_en.union(stop_words_ru)

    # Filter out stop words
    filtered_words = [word for word in words if word not in stop_words]

    # Count word frequencies
    word_counts = Counter(filtered_words)

    # Generate a word cloud
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate_from_frequencies(word_counts)

    # Save the word cloud image
    wordcloud_image_path = 'static/images/wordcloud.png'
    wordcloud.to_file(wordcloud_image_path)

    return wordcloud_image_path

# Route for home page (search form)
@app.route('/')
def home():
    return render_template('home.html')

# Route for index page (search form)
@app.route('/index', methods=['GET', 'POST'])
def index_route():
    query = ''
    wordcloud_image_path = ''
    
    if request.method == 'POST':
        query = request.form['query']  # Get search query from form
        wordcloud_image_path = generate_wordcloud(query, k=20)  # Generate word cloud based on query
        
    return render_template('index.html', query=query, wordcloud_image_path=wordcloud_image_path)

# Route for handling search results and displaying the word cloud
@app.route('/search', methods=['POST'])
def search():
    query = request.form['query']  # Get search query from form
    wordcloud_image_path = generate_wordcloud(query, k=20)  # Generate word cloud based on query
    return render_template('index.html', query=query, wordcloud_image_path=wordcloud_image_path)
@app.route('/jobs')
def jobs():
    return render_template('results.html')  # Serve results.html from templates folder
@app.route('/maps')
def maps():

    return render_template('maps.html')  # Serve results.html from templates folder
@app.route('/maps/api/jobs')
def get_maps():
    df = pd.read_csv('/home/user/Desktop/my_flask_app/headhunter_jobs.csv')

    # Classification
    def determine_level(title):
        title_lower = title.lower()
        if 'junior' in title_lower: return 'junior'
        if 'senior' in title_lower: return 'senior'
        return 'middle'

    df['level'] = df['Title'].apply(determine_level)

    # Filters
    date_filter       = request.args.get('date')
    locations_filter  = request.args.get('locations')
    keyword_filter    = request.args.get('keyword')
    min_count_filter  = request.args.get('minCount')

    if date_filter:
        df['Published At'] = (
            pd.to_datetime(df['Published At'], utc=True, errors='coerce')
              .dt.tz_localize(None)
        )
        df = df[df['Published At'] >= pd.to_datetime(date_filter)]

    if locations_filter:
        allowed = [loc.strip().lower() for loc in locations_filter.split(',')]
        df = df[df['Location'].str.lower().isin(allowed)]

    if keyword_filter:
        kw = keyword_filter.lower()
        df = df[df.apply(
            lambda r: kw in str(r['Title']).lower()
                   or kw in str(r['Description']).lower()
                   or kw in str(r['Requirements']).lower(),
            axis=1
        )]

    if min_count_filter:
        counts = df['Location'].value_counts()
        valid  = counts[counts >= int(min_count_filter)].index
        df = df[df['Location'].isin(valid)]

    original_df = pd.read_csv('/home/user/Desktop/my_flask_app/headhunter_jobs.csv')
    all_locations = original_df['Location'].dropna().unique().tolist()

    jobs = df[['Location', 'level']].to_dict(orient='records')

    return jsonify({'jobs': jobs, 'locations': all_locations})
@app.route('/jobs/api/jobs')
def get_jobs():
    df = pd.read_csv('/home/user/Desktop/my_flask_app/headhunter_jobs.csv')

    # Classification function
    def determine_level(title):
        title_lower = title.lower()
        if 'junior' in title_lower:
            return 'junior'
        elif 'senior' in title_lower:
            return 'senior'
        else:
            return 'middle'

    df['level'] = df['Title'].apply(determine_level)

    # Apply filters from query params
    date_filter = request.args.get('date')
    locations_filter = request.args.get('location')  # Fix for 'location' parameter
    keyword_filter = request.args.get('keyword')
    min_count_filter = request.args.get('minCount')

    if date_filter:
        df['Published At'] = pd.to_datetime(df['Published At'], utc=True, errors='coerce').dt.tz_localize(None)
        date_filter_dt = pd.to_datetime(date_filter)
        df = df[df['Published At'] >= date_filter_dt]

    if locations_filter:
        allowed_locations = [loc.strip().lower() for loc in locations_filter.split(',')]
        df = df[df['Location'].str.lower().isin(allowed_locations)]

    if keyword_filter:
        keyword = keyword_filter.lower()
        df = df[df.apply(
            lambda row: keyword in str(row['Title']).lower() or
                        keyword in str(row['Description']).lower() or
                        keyword in str(row['Requirements']).lower(),
            axis=1
        )]

    if min_count_filter:
        loc_counts = df['Location'].value_counts()
        valid_locations = loc_counts[loc_counts >= int(min_count_filter)].index
        df = df[df['Location'].isin(valid_locations)]

    # Extract all unique locations for the static filter
    all_locations = df['Location'].unique().tolist()

    # Ensure there are no undefined or empty locations
    all_locations = [loc for loc in all_locations if loc and loc != "undefined"]

    # Return filtered job data and static locations
    jobs = df[['Location', 'level']].to_dict(orient='records')
    return jsonify({
        'jobs': jobs,
        'locations': all_locations  # Ensure that 'locations' is correctly populated
    })

# Route to serve word cloud image
@app.route('/static/images/<filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.root_path, 'static/images'), filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
