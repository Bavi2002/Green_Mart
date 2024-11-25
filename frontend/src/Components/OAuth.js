import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./oauth.css";

export default function OAuth({ setUser }) {
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:3000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error during authentication');
            }

            const data = await res.json();
            console.log(data);

            if (data.user && data.user._id) {
                localStorage.setItem('userId', data.user._id); // Store userId
                console.log("Stored userId:", data.user._id);

                // Set user state using the correct user structure
                setUser({
                    email: data.user.email,
                    name: data.user.name, // Ensure this matches the returned user object
                    contactNo: data.user.contactNo, // Assuming these fields exist
                    address: data.user.address, // Assuming these fields exist
                    addresses: data.user.addresses // Assuming these fields exist
                });

                // Navigate to the profile page, passing the user data
                navigate('/', { state: { user: data.user } });
            } else {
                throw new Error("User ID is missing in the response");
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert(error.message);
        }
    };

    return (
        <button className="oauth-button" onClick={handleGoogleClick}>Continue With Google</button>
    );
}
