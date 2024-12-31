import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import authService from '../appwrite/auth';

function Home() {
    const [currentUser, setCurrentUser] = useState(null); // Track current user
    const [posts, setPosts] = useState([]);

    // Fetch the current user on component mount
    useEffect(() => {
        authService.getCurrentUser()
            .then((user) => setCurrentUser(user))
            .catch((err) => {
                console.error("Error fetching user:", err);
                setCurrentUser(null);
            });
    }, []);

    // Re-fetch posts when the current user changes
    useEffect(() => {
        if (currentUser) {
            appwriteService
                .getPosts()
                .then((response) => {
                    setPosts(response.documents || []);
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        } else {
            setPosts([]); // Clear posts when user logs out
        }
    }, [currentUser]);

    const handleLogin = () => {
        authService.login().then(() => {
            authService.getCurrentUser().then((user) => setCurrentUser(user));
        });
    };

    const handleLogout = () => {
        authService.logout().then(() => setCurrentUser(null));
    };

    if (currentUser === null) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>
                    <button onClick={handleLogin} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Login
                    </button>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No Posts to Display
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="flex-shrink-0 w-80">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
