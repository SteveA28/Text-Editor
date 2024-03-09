import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.put({ id: 1, content: content });
    console.log('Data saved to the database', result);
    await tx.done;
  } catch (error) {
    console.error('Failed to put data in the database', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.get(1);
    console.log('Data retrieved from the database', result);
    return result?.content;
  } catch (error) {
    console.error('Failed to get data from the database', error);
    return null;
  }
};

initdb();
