import React, { useState } from 'react';
import videos from '../data/videos';
import './Profile.css';

const Profile = () => {
    const [username, setUsername] = useState('@ancha');
    const [bio, setBio] = useState('Konten kreator dan developer web 🎥👨‍💻');
    const [editing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(username);
    const [newBio, setNewBio] = useState(bio);

    const userVideos = videos.filter(v => v.user === username);
    const totalLikes = userVideos.reduce((sum, v) => sum + (v.likes || 0), 0);

    const openEdit = () => {
        setNewUsername(username);
        setNewBio(bio);
        setEditing(true);
    };

    const saveEdit = () => {
        setUsername(newUsername);
        setBio(newBio);
        setEditing(false);
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img
                    src="https://i.pravatar.cc/100?u=ancha"
                    alt="profile"
                    className="profile-pic"
                />
                <div className="profile-info">
                    <h2>{username}</h2>
                    <p className="bio">{bio}</p>
                    <p className="stats">{userVideos.length} Video • ❤️ {totalLikes} Likes</p>
                    <button className="edit-btn" onClick={openEdit}><a href='/edit-profile'>Edit Profil</a></button>
                </div>
            </div>

            <div className="video-grid">
                {userVideos.map((video) => (
                    <div key={video.id} className="video-wrapper">
                        <video src={video.url} controls muted />
                    </div>
                ))}
            </div>

            {editing && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>Edit Profil</h3>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <textarea
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)}
                            placeholder="Bio"
                        />
                        <div className="modal-buttons">
                            <button onClick={saveEdit}>Simpan</button>
                            <button onClick={() => setEditing(false)} className="cancel">Batal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
