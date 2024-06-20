from flask import render_template, Blueprint ,request,json
from app.computations.lung_cancer import predictLungCancer
bp = Blueprint("bp",__name__)

@bp.route("/")
def home():
    return render_template("index.html") 

@bp.route("/detectLungCancer/",methods = ["POST"])
def detectLungCancer():
    file = request.files['file']
    prediction = predictLungCancer(file)
    return json.dumps({"response":prediction}),200


