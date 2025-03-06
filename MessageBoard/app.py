import os
from werkzeug.utils import secure_filename
from flask import Flask, render_template, request, redirect, url_for
import pymysql

app = Flask(__name__)

# MySQL configuration
MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'YES'
MYSQL_PORT = 3306

# Configure upload folder and allowed extensions
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_connection(db_name=None):
    return pymysql.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        port=MYSQL_PORT,
        database=db_name,
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )

def init_db():
    """
    Initializes the 'message_board' database with the required tables and index.
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # 1) Create database if it doesn't exist
    cursor.execute("CREATE DATABASE IF NOT EXISTS message_board;")
    cursor.execute("USE message_board;")
    
    # 2) Create the 'threads' table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS threads (
            thread_id INT AUTO_INCREMENT PRIMARY KEY,
            thread_title VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
    """)
    
    # 3) Create the 'posts' table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS posts (
            post_id INT AUTO_INCREMENT PRIMARY KEY,
            thread_id INT NOT NULL,
            post_text TEXT NOT NULL,
            post_image_url VARCHAR(255),
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_thread
                FOREIGN KEY (thread_id) REFERENCES threads(thread_id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    """)
    
    # 4) Conditionally create index on posts.thread_id
    cursor.execute("""
        SELECT COUNT(*) AS idx_count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE() 
          AND table_name = 'posts'
          AND index_name = 'idx_posts_thread_id';
    """)
    idx_exists = cursor.fetchone()['idx_count']
    if idx_exists == 0:
        cursor.execute("CREATE INDEX idx_posts_thread_id ON posts(thread_id);")
    
    cursor.close()
    conn.close()

@app.route('/')
def home():
    """
    Displays all threads and a form to create a new thread.
    """
    conn = get_connection(db_name='message_board')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM threads ORDER BY created_at DESC;")
    threads = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('home.html', threads=threads)

@app.route('/create_thread', methods=['POST'])
def create_thread():
    """
    Creates a new thread and its initial post.
    """
    thread_title = request.form.get('thread_title', '').strip()
    post_text = request.form.get('post_text', '').strip()
    post_image_url = request.form.get('post_image_url', '').strip() or None

    if thread_title and post_text:
        conn = get_connection(db_name='message_board')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO threads (thread_title) VALUES (%s)", (thread_title,))
        thread_id = cursor.lastrowid
        cursor.execute(
            "INSERT INTO posts (thread_id, post_text, post_image_url) VALUES (%s, %s, %s)",
            (thread_id, post_text, post_image_url)
        )
        cursor.close()
        conn.close()
        return redirect(url_for('view_thread', thread_id=thread_id))
    else:
        return redirect(url_for('home'))

@app.route('/thread/<int:thread_id>')
def view_thread(thread_id):
    """
    Displays a single thread and its posts.
    """
    conn = get_connection(db_name='message_board')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM threads WHERE thread_id = %s", (thread_id,))
    thread = cursor.fetchone()
    if not thread:
        cursor.close()
        conn.close()
        return "Thread not found", 404
    cursor.execute("SELECT * FROM posts WHERE thread_id = %s ORDER BY created_at ASC", (thread_id,))
    posts = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('thread.html', thread=thread, posts=posts)

@app.route('/thread/<int:thread_id>/add_post', methods=['POST'])
def add_post(thread_id):
    """
    Adds a new post (with an optional uploaded image) to the thread.
    """
    post_text = request.form.get('post_text', '').strip()
    post_image_url = None

    # Check if the file part is present in the request
    file = request.files.get('post_image')
    if file and file.filename and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(file_path)
        # Generate the URL for the saved file (assuming it's served from the static folder)
        post_image_url = url_for('static', filename=f'uploads/{filename}')
    
    if post_text:
        conn = get_connection(db_name='message_board')
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO posts (thread_id, post_text, post_image_url) VALUES (%s, %s, %s)",
            (thread_id, post_text, post_image_url)
        )
        cursor.close()
        conn.close()
    
    return redirect(url_for('view_thread', thread_id=thread_id))

if __name__ == '__main__':
    init_db()  # Initialize the database and tables
    app.run(debug=True)
