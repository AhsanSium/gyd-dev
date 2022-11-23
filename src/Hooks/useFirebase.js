import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import initializeAuth from "../Firebase/firebase.init";

initializeAuth();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState("");
    const [admin, setAdmin] = useState(false);
    const auth = getAuth();
    const coolAlert = useAlert();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.user);
        console.log("Session User:", user);
        if (user.email) {
            setUser(user);
        }
    }, []);


    const registerUser = (email, password, name, user, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError("");
                if (user) {
                    setUser(user);
                }
                else {
                    const newUser = { email, displayName: name };
                    setUser(newUser);
                }
                //save user to database
                saveUser(email, name, user, "POST");
                //send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name,
                })
                    .then(() => {
                        coolAlert.success(`Welcome ${name}`);
                        navigate('/');
                    })
                    .catch((error) => { coolAlert.error(error); });
            })
            .catch((error) => {
                setAuthError(error.message);
                coolAlert.error(error);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    };

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || "/";
                console.log("Login User", userCredential.user);
                console.log("destination: ", destination);
                setUser(userCredential.user);

                sessionStorage.setItem("user", JSON.stringify(userCredential.user));
                // if (user) {
                // }
                // else {
                //     setUser({});
                // }
                coolAlert.success('Logged In!');
                navigate('/dashboard');
                setAuthError("");
            })
            .catch((error) => {
                coolAlert.error(error.message);
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    };


    const singnInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);
                console.log(result.user);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleFacebookSignIN = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                console.log(result.user);
                const logedInUser = {
                    name: displayName,
                    email: email,
                    img: photoURL
                };
                setUser(logedInUser)
            })
    }

    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                setUser(result.user)
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const saveUser = (email, displayName, userData, method) => {
        var user = userData;
        delete user.password;
        fetch("http://localhost:5000/users", {
            method: method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((res) => {

        }).catch((err) => {
            console.log(err);
        });
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
                sessionStorage.removeItem('user');
                coolAlert.info("Logged OUT!");
            })
    }

    // useEffect(() => {
    //     const unsubscribed = onAuthStateChanged(auth, user => {
    //         if (user) {
    //             setUser(user);
    //         }
    //         else {
    //             setUser({});
    //         }
    //     });
    //     return () => unsubscribed;
    // },)

    return {
        user,
        error,
        admin,
        isLoading,
        authError,
        loginUser,
        registerUser,
        logout,
        singnInWithGoogle,
        signInWithGithub,
        handleFacebookSignIN
    }

}

export default useFirebase;