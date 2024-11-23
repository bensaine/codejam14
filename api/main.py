from flask import Flask, jsonify, request
from json import loads

DATA = "./data/"
app = Flask(__name__)

# load data from json file
with open(DATA + "crimes.json") as f:
    crimes_data = loads(f.read())


@app.route("/", methods=["GET"])
def helloworld():
    return jsonify({"message": "Hello World"})


@app.route("/crimes", methods=["GET"])
def crimes():
    return jsonify(crimes_data)


if __name__ == "__main__":
    app.run(debug=True)
