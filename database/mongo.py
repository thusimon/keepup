import os
from pymongo import MongoClient

class MongoRepository(object):
    def __init__(self):
        mongo_url = os.environ.get('MONGO_URL')
        self.db = MongoClient(mongo_url).keepup

    def find_all(self, collection, selector):
        return self.db[collection].find(selector)

    def find_one(self, collection, selector):
        return self.db[collection].find_one(selector)

    def create(self, collection, document):
        return self.db[collection].insert_one(document)

    def update(self, collection, selector, document):
        return self.db[collection].update_one(selector, {
            '$set': document
        })

    def delete(self, collection, selector):
        return self.db[collection].delete_one(selector)
