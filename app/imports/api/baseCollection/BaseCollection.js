import { Meteor, Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

class BaseCollection {
  /**
   * Superclass constructor for meteor collections
   * @param type Name of entity defined by subclass
   * @param schema The schema for validating fields on insertion to DB
   */
  constructor(type, schema) {
    this._name = type;
    this._collectionName = `${type}Collection`;
    this._collection = new Mongo.Collection(this._collectionName);
    this._schema = schema;
    this._collection.attachSchema(this._schema);
  }

  /**
   * Returns number of documents in this collection
   * @returns { Number } Number of elements in this collection
   */
  count() {
    return this._collection.find().count();
  }

  /**
   * Defines document in this collection
   * Must be overridden in subclasses
   * @param { Object } obj The object defining the new document
   */
  define(obj) {
    throw new Meteor.Error(`The define(${obj}) method is not defined in BaseCollection.`);
  }

  /**
   * Runs simplified version of update on this collection
   * Must be overridden in subclasses
   * @param { Object } selector A MongoDB selector
   * @param { Object } modifier A MongoDB modifier
   */
  update(selector, modifier) {
    throw new Meteor.Error(`update(${selector}, ${modifier} is not defined in BaseCollection.`);
  }

  /**
   * Stricter form of remove that throws error if document or docID couldn't be found in this collection
   * @param { String | Object } name A document or docID in this collection
   */
  removeIt(name) {
    throw new Meteor.Error(`removeIt(${name}) is not defined in BaseCollection.`);
  }

  /**
   * Runs find on this collection
   * @param { Object } selector A MongoDB selector
   * @param { Object } options MongoDB options
   * @returns { Mongo.cursor }
   */
  find(selector, options) {
    const theSelector = (typeof selector === 'undefined') ? {} : selector;
    return this._collection.find(theSelector, options);
  }

  /**
   * Stricter form of findOne, in that it throws an exception if entity isn't found in collection
   * @param { String | Object } name docID or object selector or 'name' field value
   * @returns { Object } Document associated with name
   * @throws { Meteor.Error } If document cannot be found
   */
  findDoc(name) {
    if (_.isNull(name) || _.isUndefined(name)) {
      throw new Meteor.Error(`${name} is not a defined ${this.type}`);
    }
    const doc = (
        this._collection.findOne(name)
        || this._collection.findOne({ name })
        || this._collection.findOne({ _id: name }));
    if (!doc) {
      if (typeof name !== 'string') {
        throw new Meteor.Error(`${JSON.stringify(name)} is not a defined ${this._type}`, '', Error().stack);
      } else {
        throw new Meteor.Error(`${name} is not a defined ${this._type}`, '', Error().stack);
      }
    }
    return doc;
  }

  /**
   * Runs findOne on this collection
   * @param { Object } selector A MongoDB selector
   * @param { Object } options A MongoDB options
   * @returns { Mongo.Cursor }
   */
  findOne(selector, options) {
    const theSelector = (typeof selector === 'undefined') ? {} : selector;
    return this._collection.findOne(theSelector, options);
  }

  /**
   * Returns type of this collection
   * @returns { String } Type as string
   */
  getType() {
    return this._type;
  }

  /**
   * Returns publication name
   * @returns { String } The publication name as a string
   */
  getPublicationName() {
    return this._collectionName;
  }

  /**
   * Returns collection name
   * @returns { String } The collection name as a string
   */
  getCollectionName() {
    return this._collectionName;
  }

  /**
   * Returns schema attached to this collection
   * @returns { SimpleSchema }
   */
  getSchema() {
    return this._schema;
  }

  /**
   * Returns true if passed entity is in this collection
   * @param { String | Object } name docID or object specifying document
   * @returns { boolean } True if name exists in this collection
   */
  isDefined(name) {
    if (_.isUndefined(name)) {
      return false;
    }
    return (
        !!this._collection.findOne(name)
        || !!this._collection.findOne({ name })
        || !!this._collection.findOne({ _id: name }));
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection. This should be overridden in subclasses.
   */
  publish() {
    if (Meteor.isServer) {
      Meteor.publish(this._collectionName, () => this._collection.find());
    }
  }

  /**
   * Default subscription method for entities.
   * It subscribes to the entire collection. Should be overridden in subclass
   */
  subscribe() {
    if (Meteor.isClient) {
      Meteor.subscribe(this._collectionName);
    }
  }
}

/**
 * The BaseCollection used by all meteor-application-template-react-production entities.
 */
export default BaseCollection;
