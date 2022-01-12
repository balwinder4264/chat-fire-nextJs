import React, { useRef, useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, orderBy, query, addDoc } from 'firebase/firestore'
import { auth, db, provider } from '../firebase'
import { getAuth, signInWithPopup } from "firebase/auth"
function App() {

  const [user, setUser] = useState(auth);
  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("No user ");
        setUser(null);
        // setLoading(null)

        return
      }
      const token = await user.getIdToken();

      // setCookie(null, "token", token, {});
      setUser(user)


    })
  }, [])

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const [messages, setMessage] = useState(null)
  const messagesRef = collection(db, "messages");
  // const messagesRef = firestore.collection('messages');
  const q = query(messagesRef, orderBy("createdAt"));
  // messagesRef.orderBy('createdAt').limit(25);
  const messages1 = []
  useEffect(async () => {

    const unsubscrib = await onSnapshot(q, (snap) => {
      messages1 = []
      snap.forEach(doc => {
        messages1.push({ ...doc.data(), id: doc.id })
      })
      setMessage(messages1)
    });

    return unsubscrib

  }, [])


  // const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    const response = await addDoc(messagesRef, {
      text: formValue,
      createdAt: Date.now(),
      uid,
      photoURL
    })
    console.log("response=>", response)
    // await messagesRef.add({
    //   text: formValue,
    //   createdAt: Date.now(),
    //   uid,
    //   photoURL
    // })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  console.log("props.message=>", props.message)

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
