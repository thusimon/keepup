class Repository(object):
    def __init__(self, adapter=None):
        self.client = adapter()

    def find_all(self, collection, selector):
        return self.client.find_all(collection, selector)

    def find_one(self, collection, selector):
        return self.client.find_one(collection, selector)

    def create(self, collection, document):
        return self.client.create(collection, document)

    def update(self, collection, selector, document):
        return self.client.update(collection, selector, document)

    def delete(self, collection, selector):
        return self.client.delete(collection, selector)