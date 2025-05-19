from flask import Flask, render_template, request, redirect, flash, session, url_for
import mysql.connector
from mysql.connector import Error
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'mensajes'

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',
    'database': 'bibliografia_ico'
}

def get_tipos_fuente():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT * FROM tipos_fuente")
        tipos = cursor.fetchall()
        return tipos
    finally:
        cursor.close()
        conn.close()

@app.route('/', methods=['GET', 'POST'])
def index():
    estilos = ['APA', 'IEEE']
    tipos_fuente = get_tipos_fuente()
    
    return render_template('index.html', 
                         estilos=estilos,
                         tipos_fuente=tipos_fuente)

if __name__ == '__main__':
    app.run(debug=True)