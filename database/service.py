from database import Repository
from database.mongo import MongoRepository


class Service(object):
    def __init__(self, repo_client=Repository(adapter=MongoRepository)):
        self.repo_client = repo_client

    def find_all_users(self):
        users = self.repo_client.find_all("user", {})
        if users is None:
            return []
        else:
            return [user for user in users]

    def find_user_all_tasks(self, user_id):
        tasks = self.repo_client.find_all("task", {"userId": user_id})
        if tasks is None:
            return []
        else:
            return [task for task in tasks]

    def create_user_task(self, user_id, task_title):
        task = self.repo_client.create("task", {"title": task_title, "userId": user_id, "sign_up": []})
        return task

    def sign_up_task(self, task_id, time):
        task = self.repo_client.find_one('task', {"_id": task_id})
        if task is None:
            return {"_id": task_id}
        else:
            sign_up = task['sign_up']
            sign_up.append(time)
            print(34, sign_up)
            task = self.repo_client.update('task', {"_id": task_id}, {"sign_up": sign_up})
            return task

    def delete_task(self, task_id):
        task = self.repo_client.delete('task', {"_id": task_id})
        return task
