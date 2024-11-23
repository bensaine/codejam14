from flask import Flask, jsonify, request, Response
from json import loads
from route import get_path
from flask_cors import CORS, cross_origin
DATA = "./data/"
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# load data from json file
with open(DATA + "crimes.json") as f:
    crimes_data = loads(f.read())


@app.route("/", methods=["GET"])
def helloworld():
    return jsonify({"message": "Hello World"})


@app.route("/crimes", methods=["GET"])
def crimes():
    return jsonify(crimes_data)


def is_coord(el):
    return type(el) == list and len(el) == 2 and type(el[0]) == float and type(el[1]) == float

@app.route('/route',methods=['POST'])
def get_route():
    body = request.json
    bad_format_response = ("Expected /route to receive POST data in the following format: {source: (latitude, longitude), destination: (latitude,longitude)}",400)
    if 'source' not in body or 'destination' not in body:
        return bad_format_response
    if not is_coord(body['source']) or not is_coord(body['destination']):
        return bad_format_response
    
    path = get_path(body['source'],body['destination'])
    return jsonify(path)


if __name__ == "__main__":
    app.run(debug=True)
