import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  getDocFromServer,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { onAuthStateChanged };

// Use the designated databaseId if present, otherwise default
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test as required by Firebase skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase test connection offline:", error.message);
    }
  }
}
testConnection();

/**
 * Google Sign-in with Firebase Auth
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Upsert student user profile in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'Student',
      photoURL: user.photoURL || '',
      role: user.email === 'admin@college.edu' ? 'ADMIN' : 'STUDENT',
      lastLoginAt: new Date().toISOString()
    };

    if (!userSnap.exists()) {
      userData.createdAt = new Date().toISOString();
      userData.targetTrack = 'Full Stack Developer';
      userData.xpPoints = 150; // Welcome XP
      userData.completedProjects = 0;
      await setDoc(userRef, userData);
    } else {
      await setDoc(userRef, userData, { merge: true });
    }

    return { ...userData, ...userSnap.data() };
  } catch (error) {
    console.error("Firebase Google Sign-In error:", error);
    throw error;
  }
}

/**
 * Sign out
 */
export async function logoutUser() {
  return await signOut(auth);
}

/**
 * Save / Update project milestone progress in Firestore
 */
export async function saveProjectProgress(userId, projectId, progressData) {
  if (!userId || !projectId) return;
  try {
    const progressRef = doc(db, 'users', userId, 'progress', projectId);
    await setDoc(progressRef, {
      userId,
      projectId,
      ...progressData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Failed to persist project progress in Firestore:", err);
  }
}

/**
 * Fetch all project progress for a student
 */
export async function getStudentProjectsProgress(userId) {
  if (!userId) return {};
  try {
    const collRef = collection(db, 'users', userId, 'progress');
    const snapshot = await getDocs(collRef);
    const results = {};
    snapshot.forEach(docSnap => {
      results[docSnap.id] = docSnap.data();
    });
    return results;
  } catch (err) {
    console.error("Failed to read progress from Firestore:", err);
    return {};
  }
}

/**
 * Real-time listener for student study notes
 */
export function subscribeToStudentNotes(userId, callback) {
  if (!userId) return () => {};
  try {
    const collRef = collection(db, 'users', userId, 'studyNotes');
    const q = query(collRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const notes = [];
      snapshot.forEach(docSnap => {
        notes.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(notes);
    }, (error) => {
      console.warn("Firestore notes subscription warning:", error);
    });
  } catch (err) {
    console.error("Notes subscribe error:", err);
    return () => {};
  }
}

/**
 * Add a study note
 */
export async function addStudentNote(userId, note) {
  if (!userId) return;
  const collRef = collection(db, 'users', userId, 'studyNotes');
  return await addDoc(collRef, {
    userId,
    title: note.title,
    content: note.content,
    tags: note.tags || 'General',
    createdAt: new Date().toISOString()
  });
}

/**
 * Delete a study note
 */
export async function deleteStudentNote(userId, noteId) {
  if (!userId || !noteId) return;
  const docRef = doc(db, 'users', userId, 'studyNotes', noteId);
  return await deleteDoc(docRef);
}

/**
 * Real-time listener for Gemini chat message thread
 */
export function subscribeToChatMessages(userId, callback) {
  if (!userId) return () => {};
  try {
    const collRef = collection(db, 'chatSessions', userId, 'messages');
    const q = query(collRef, orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const messages = [];
      snapshot.forEach(docSnap => {
        messages.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(messages);
    }, (error) => {
      console.warn("Firestore chat subscription warning:", error);
    });
  } catch (err) {
    console.error("Chat subscribe error:", err);
    return () => {};
  }
}

/**
 * Save chat message to Firestore
 */
export async function saveChatMessageToFirestore(userId, message) {
  if (!userId) return;
  try {
    const collRef = collection(db, 'chatSessions', userId, 'messages');
    await addDoc(collRef, {
      userId,
      role: message.role, // 'user' | 'model'
      content: message.content,
      modelUsed: message.modelUsed || 'gemini-3.5-flash',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Failed to save chat message in Firestore:", err);
  }
}

export default app;
