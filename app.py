from flask import Flask, render_template, request, redirect, session, url_for
import json
import os
from collections import Counter

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Homepage route
@app.route('/')
def index():
    with open('Data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    return render_template("index.html", products=products)

# Login route
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

# Forgot password route
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

# Logout route
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

# Registration route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        street = request.form['street']
        pcode = request.form['pcode']
        city = request.form['city']
        birthdate = request.form['birthdate']

        # Load existing users
        try:
            with open('Data/users.json', 'r', encoding='utf-8') as f:
                users = json.load(f)
        except FileNotFoundError:
            users = []

        # Add the new user to the list
        new_user = {
            "name": name,
            "email": email,
            "password": password,
            "Street": street,
            "pcode": pcode,
            "city": city,
            "birthdate": birthdate
        }

        users.append(new_user)

        # Save the updated users list
        with open('Data/users.json', 'w', encoding='utf-8') as f:
            json.dump(users, f, indent=2, ensure_ascii=False)

        return redirect(url_for('login'))  # Redirect to login after registration

    return render_template('register.html')

# Indkoebsliste route (wishlist page)
@app.route('/indkoebsliste')
def indkoebsliste():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template("indkoebsliste.html")

# Recipe route
@app.route('/recipe')
def recipe():
    with open('Data/recipe.json', 'r', encoding='utf-8') as f:
        recipes = json.load(f)
    return render_template('recipe.html', recipes=recipes)

# Info route
@app.route('/info')
def info():
    return render_template('info.html')

# Add additional routes for any other pages, like 'lak_prod', 'soeg', 'handlinger', etc. 
# Route for the lak_prod page
@app.route('/lak_prod')
def lak_prod():
    with open('Data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    return render_template('lak_prod.html', products=products)

# Clear wishlist route
@app.route('/clear_wishlist', methods=['POST'])
def clear_wishlist():
    if 'user' not in session:
        return redirect(url_for('login'))

    # Assuming the wishlist is stored in session, clear it
    session.pop('wishlist', None)
    return redirect(url_for('indkoebsliste'))  # Redirect back to the indkoebsliste page



# Main run
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
