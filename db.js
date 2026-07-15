/**
 * AuraFrameDB Manager
 * Handles local persistence of uploaded images and videos as Blobs using IndexedDB.
 */

const DB_NAME = 'AuraFrameDB';
const DB_VERSION = 1;
const STORE_NAME = 'mediaItems';

let dbInstance = null;

/**
 * Initializes the IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
function initDB() {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database failed to open:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Create store with auto-incrementing key
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        // Create index for timestamp to sort by date
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

/**
 * Saves a new media item to the database.
 * @param {Object} item - The media item to save.
 * @param {string} item.type - 'photo' or 'video'
 * @param {Blob} item.file - The photo or video file blob
 * @param {string} item.title - Media title
 * @param {string} item.description - Media description
 * @param {string} item.category - e.g. 'Wedding Film', 'Love Story', 'Portrait'
 * @param {number} item.timestamp - Date timestamp
 * @returns {Promise<number>} - The generated ID of the item
 */
async function saveMediaItem(item) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(item);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error('Error saving media item:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Fetches all media items from the database, sorted by timestamp descending.
 * @returns {Promise<Array>}
 */
async function getMediaItems() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    const request = index.openCursor(null, 'prev'); // Sort descending (newest first)
    const items = [];

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        resolve(items);
      }
    };

    request.onerror = (event) => {
      console.error('Error fetching media items:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Deletes a media item by ID.
 * @param {number} id - The ID of the item to delete
 * @returns {Promise<void>}
 */
async function deleteMediaItem(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error deleting media item:', event.target.error);
      reject(event.target.error);
    };
  });
}

// Export functions to global scope for use in app.js
window.AuraDB = {
  saveMediaItem,
  getMediaItems,
  deleteMediaItem
};
