import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function AllPosts() {
    const [posts, setPosts] = useState([]); // Initialize as an empty array
    const [currentUserId, setCurrentUserId] = useState(null); // To store the current user's ID

    useEffect(() => {
        // Fetch the current user's ID
        authService.getCurrentUser()
            .then((user) => {
                setCurrentUserId(user.$id); // Assuming Appwrite returns the user's ID as `$id`
            })
            .catch((error) => {
                console.error("Failed to fetch user:", error);
            });
    }, []);

    useEffect(() => {
        if (currentUserId) {
            // Fetch posts only after we have the current user's ID
            appwriteService.getPosts()
                .then((response) => {
                    if (response) {
                        // Filter posts by the current user's ID
                        const userPosts = (response.documents || []).filter(
                            (post) => post.userId === currentUserId
                        );
                        setPosts(userPosts);
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch posts:", error);
                });
        }
    }, [currentUserId]);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                key={post.$id}
                                className="flex-shrink-0 w-80" // Fixed width for each PostCard
                            >
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">No posts available</p> // Placeholder when no posts
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
