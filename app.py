from flask import Flask, render_template, request, redirect, session, url_for
import json
import os
from collections import Counter

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def index():
    with open('Data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    return render_template("index.html", products=products)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        with open('Data/users.json', 'r', encoding='utf-8') as f:
            users = json.load(f)
        username = request.form['username']
        password = request.form['password']

        for user in users:
            if user['name'] == username and user['password'] == password:
                session['user'] = user['name']
                return redirect(url_for('index'))

        return render_template('login.html', error="Brugernavn eller kodeord er forkert. Prøv igen")
    return render_template('login.html')

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        with open('Data/users.json', 'r', encoding='utf-8') as f:
            users = json.load(f)

        for user in users:
            if user['email'] == email:
                message = "Et link til nulstilling af dit kodeord er sendt til din indbakke."
                return render_template("forgot_password.html", message=message, redirect_back=True)

        message = "Emailadressen blev ikke fundet."
        return render_template("forgot_password.html", message=message, redirect_back=False)

    return render_template("forgot_password.html")

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

@app.route('/indkoebsliste')
def indkoebsliste():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template("indkoebsliste.html")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
