from flask import Flask 
from app.blueprint import bp
from app.computations.lung_cancer import initLungCancerModel

app = Flask(__name__)
app.register_blueprint(bp)

initLungCancerModel()