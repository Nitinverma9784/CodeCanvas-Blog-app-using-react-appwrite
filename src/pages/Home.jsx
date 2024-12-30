import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import authService from '../appwrite/auth';

function Home() {
    const [currentUser, setCurrentUser] = useState(null); // Track current user
    const [posts, setPosts] = useState([]);

    // Fetch the current user on component mount
    useEffect(() => {
        const user = authService.getCurrentUser(); // Get current user
        setCurrentUser(user); // Set the user when component mounts
    }, []);

    // Re-fetch posts when the current user changes
    useEffect(() => {
        if (currentUser) {
            // Fetch posts only if there's a logged-in user
            appwriteService.getPosts().then((response) => {
                if (response) {
                    setPosts(response.documents || []);
                }
            }).catch((error) => {
                console.error("Error fetching posts:", error);
            });
        } else {
            setPosts([]); // Clear posts when user logs out
        }
    }, [currentUser]); // Dependency on currentUser so posts update on login/logout

    const handleLogin = () => {
        authService.login().then(() => {
            const user = authService.getCurrentUser();
            setCurrentUser(user); // Update user state after login
        });
    };

    const handleLogout = () => {
        authService.logout().then(() => {
            setCurrentUser(null); // Reset user state after logout
        });
    };

    if (currentUser === null) { // Check explicitly for null or undefined
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            <button onClick={handleLogin} className="mt-4 bg-blue-500 text-white p-2 rounded">
                                Login
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length <= 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts to Display
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                
            </Container>
        </div>
    );
}

export default Home;
