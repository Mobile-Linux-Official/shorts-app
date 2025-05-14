import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = () => {
    const [name, setName] = useState("Ancha");
    const [bio, setBio] = useState("Halo, saya Ancha!");
    const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };

    const handleSave = () => {
        alert("Profil berhasil disimpan!");
        // Di sini bisa ditambahkan logika simpan ke database/localStorage
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit Profil</h2>
            <div className="form-group">
                <label>Foto Profil</label>
                <img src={profilePic} alt="profile" className="profile-preview" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="form-group">
                <label>Nama</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Bio</label>
                <textarea
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                ></textarea>
            </div>
            <button onClick={handleSave} className="save-btn">Simpan</button>
        </div>
    );
};

export default EditProfile;
