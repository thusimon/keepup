from flask import request
from server import mongo, app
import json as json
from bson import ObjectId


@app.route('/hello')
def hello():
    return 'Hello, World!'


@app.route('/users', methods=["GET"])
def users_get():
    return json_response(mongo.find_all_users())


@app.route("/tasks", methods=["GET"])
def tasks_get():
    user = request.args.get('user')
    return json_response(mongo.find_user_all_tasks(user))


@app.route("/tasks", methods=["POST"])
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


@app.route("/tasks", methods=["DELETE"])
def task_delete():
    task_id = request.form.get('task_id')
    delete_result = mongo.delete_task(ObjectId(task_id))
    return json_response(delete_result.deleted_count)


@app.route("/sign_up_task", methods=["PATCH"])
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
