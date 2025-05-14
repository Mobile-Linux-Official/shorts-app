import React, { useRef, useEffect, useState } from 'react';
import videos from '../data/videos';
import './VideoFeed.css';
import { FaHeart, FaCommentDots, FaShareAlt, FaUserPlus, FaUserCheck } from 'react-icons/fa';

const VideoFeed = () => {
    const videoRefs = useRef([]);
    const [likes, setLikes] = useState(videos.map(() => 0));
    const [paused, setPaused] = useState(videos.map(() => false));
    const [followed, setFollowed] = useState(videos.map(() => false));
    const [comments, setComments] = useState(videos.map(() => []));
    const [commentInput, setCommentInput] = useState(videos.map(() => ""));
    const [showCommentBox, setShowCommentBox] = useState(videos.map(() => false));

    // Autoplay observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = videoRefs.current.findIndex((v) => v === entry.target);
                    if (entry.isIntersecting) {
                        if (!paused[index]) videoRefs.current[index].play();
                    } else {
                        videoRefs.current[index].pause();
                    }
                });
            },
            { threshold: 0.9 }
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, [paused]);


    // Handle actions
    const toggleLike = (index) => {
        setLikes((prev) => {
            const updated = [...prev];
            updated[index]++;
            return updated;
        });
    };

    const togglePlayPause = (index) => {
        const video = videoRefs.current[index];
        if (video.paused) {
            video.muted = false; // aktifkan suara saat user klik
            video.play().catch((e) => console.error("Play failed:", e));
        } else {
            video.pause();
        }

        setPaused((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };


    const toggleFollow = (index) => {
        setFollowed((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    const toggleCommentBox = (index) => {
        setShowCommentBox((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    const handleCommentChange = (index, value) => {
        setCommentInput((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const addComment = (index) => {
        if (commentInput[index].trim() === "") return;
        setComments((prev) => {
            const updated = [...prev];
            updated[index].push(commentInput[index]);
            return updated;
        });
        handleCommentChange(index, "");
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="video-feed">
            {videos.map((video, index) => (
                <div key={video.id} className="video-container">
                    <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={video.url}
                        className="video-player"
                        muted // Tambahkan ini!
                        loop
                        playsInline
                        autoPlay
                        onClick={() => togglePlayPause(index)}
                    />


                    <div className="overlay">
                        <h5>
                            {video.user}{" "}
                            <button className="follow-btn" onClick={() => toggleFollow(index)}>
                                {followed[index] ? <FaUserCheck /> : <FaUserPlus />}
                            </button>
                        </h5>
                        <p>{video.caption}</p>
                    </div>

                    <div className="action-bar">
                        <div onClick={() => toggleLike(index)} className="action-icon">
                            <FaHeart size={28} />
                            <span>{likes[index]}</span>
                        </div>

                        <div onClick={() => toggleCommentBox(index)} className="action-icon">
                            <FaCommentDots size={28} />
                            <span>{comments[index].length}</span>
                        </div>

                        <div onClick={handleShare} className="action-icon">
                            <FaShareAlt size={28} />
                        </div>
                    </div>

                    {showCommentBox[index] && (
                        <div className="comment-box">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <strong>Komentar</strong>
                                <button onClick={() => toggleCommentBox(index)} style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '20px',
                                    cursor: 'pointer'
                                }}>✕</button>
                            </div>

                            <div className="comments">
                                {comments[index].map((c, i) => (
                                    <div key={i} className="comment-item">💬 {c}</div>
                                ))}
                            </div>

                            <div className="comment-input">
                                <input
                                    type="text"
                                    placeholder="Tulis komentar..."
                                    value={commentInput[index]}
                                    onChange={(e) => handleCommentChange(index, e.target.value)}
                                />
                                <button onClick={() => addComment(index)}>Kirim</button>
                            </div>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
};

export default VideoFeed;
