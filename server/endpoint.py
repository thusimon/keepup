from flask import request
from server import mongo, app
import json as json
from bson import ObjectId


@app.route('/')
def index():
    return app.send_static_file("index.html")


@app.route('/api/users', methods=["GET"])
def users_get():
    return json_response(mongo.find_all_users())


@app.route("/api/all_tasks", methods=["GET"])
def tasks_all_get():
    return json_response(mongo.find_all_tasks())


@app.route("/api/tasks", methods=["GET"])
def tasks_get():
    user = request.args.get('userId')
    return json_response(mongo.find_user_all_tasks(user))


@app.route("/api/tasks", methods=["POST"])
def task_create():
    user = request.form.get('user')
    title = request.form.get('title')
    task_result = mongo.create_user_task(user, title)
    return json_response({
        "id": task_result.inserted_id,
        "userId": user,
        "title": title,
        "signUp": []
    })


@app.route("/api/tasks", methods=["DELETE"])
def task_delete():
    task_id = request.form.get('task_id')
    delete_result = mongo.delete_task(ObjectId(task_id))
    return json_response(delete_result.deleted_count)


@app.route("/api/tasks", methods=["PATCH"])
def sign_up_task():
    task_id = request.form.get('task_id')
    time_stamp = request.form.get('time_stamp')
    sign_up_result = mongo.sign_up_task(ObjectId(task_id), time_stamp)
    return json_response(sign_up_result.modified_count)


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


def json_response(payload, status=200):
    return json.dumps(payload, cls=JSONEncoder), status, {'Content-Type': 'application/json'}
