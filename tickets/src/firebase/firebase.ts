import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut,
} from 'firebase/auth';
import {
  getFirestore, collection, query, doc, setDoc, deleteDoc, getDoc, serverTimestamp,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { nanoid } from 'nanoid';
import firebaseConfig from './config';
// import { seed } from './seed'

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
export const ticketsRef = collection(db, 'tickets');
export const getTicketCollectionQuery = () => query(ticketsRef);

const AuthProvider = new GoogleAuthProvider();
export const loginFirebase = () => signInWithPopup(auth, AuthProvider);

export const logoutFirebase = () => {
  signOut(auth);
};

// seed();

const getUser = () => getAuth().currentUser;

const getTicketFirebase = async (ticketId: TTicket['id']) => {
  const ticketDoc = await getDoc(doc(db, 'tickets', ticketId));
  if (!ticketDoc.exists()) throw new Error('Ticket doesn\'t exist');
  return ticketDoc.data();
};

const checkPermissonToModify = async (id: TTicket['id']) => {
  const user = getAuth().currentUser;
  const { uid } = user;
  if (id !== uid) throw new Error('You don\'t have permission to modify this ticket');
  return true;
};
const checkAuthentication = () => {
  const user = getUser();
  if (!user) throw new Error('Please authenticate to perform this action');
  return user;
};
const checkTicketExistance = async (id: TTicket['id']) => {
  await getTicketFirebase(id);
};

export const addTicketFirebase = (ticket: Partial<TTicket>) => {
  const user = getUser();
  checkAuthentication();
  const author = {
    photoURL: user.photoURL,
    displayName: user.displayName,
    id: user.uid,
  };

  const id = nanoid();
  return setDoc(doc(db, 'tickets', id), {
    ...ticket,
    id,
    author,
    completed: false,
    createdAt: serverTimestamp(),
  });
};
export const updateTicketFirebase = async (ticket: Partial<TTicket>) => {
  checkAuthentication();
  await checkTicketExistance(ticket.id);
  await checkPermissonToModify(ticket.author.id);

  return setDoc(doc(db, 'tickets', ticket.id), {
    ...ticket,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};
export const deleteTicketFirebase = async (ticket: TTicket) => {
  checkAuthentication();
  await checkTicketExistance(ticket.id);
  await checkPermissonToModify(ticket.author.id);

  return deleteDoc(doc(db, 'tickets', ticket.id));
};