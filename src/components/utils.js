import { db } from './firebase';

const getCollection = (collection, uid) => {
  if (!uid) return db.collection(collection).get();
  return db
    .collection(collection)
    .where('uid', '==', uid)
    .get();
};

const getLeaderboard = () => {
  return db
    .collection('users')
    .orderBy('points')
    .get();
};

const getGame = (collection, id) => {
  return db
    .collection(collection)
    .doc(id)
    .get();
};

const getGameHistory = (collection, uid) => {
  return db
    .collection(collection)
    .where('uid', '==', uid)
    .orderBy('date', 'desc')
    .limit(100)
    .get();
};

const getUser = (collection, uid) => {
  return db
    .collection(collection)
    .where('uid', '==', uid)
    .get();
};

const setPoints = (collection, documentID, points) => {
  return db
    .collection(collection)
    .doc(documentID)
    .update({ points });
};

const addDocumentToCollection = (collection, document) => {
  return db.collection(collection).add(document);
};

const deleteDocumentFromCollection = (collection, id) => {
  return db
    .collection(collection)
    .doc(id)
    .delete();
};

export {
  getCollection,
  getGame,
  getLeaderboard,
  getGameHistory,
  getUser,
  setPoints,
  addDocumentToCollection,
  deleteDocumentFromCollection
};
