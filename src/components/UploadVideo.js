import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadVideo.css';

const UploadVideo = () => {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const navigate = useNavigate();

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            const videoPreviewUrl = URL.createObjectURL(file);
            setVideoUrl(videoPreviewUrl);
        }
    };

    const handleSubmit = () => {
        if (!video || !title || !caption) {
            alert('Semua kolom wajib diisi!');
            return;
        }

        // Tambahkan logika untuk menyimpan video, misalnya simpan ke server atau state global

        alert('Video berhasil di-upload!');
        navigate('/');
    };

    return (
        <div className="upload-video-container">
            <h2>Upload Video</h2>
            <div className="form-group">
                <label>Video File</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                />
                {videoUrl && (
                    <video width="100%" height="auto" controls>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                )}
            </div>

            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Caption</label>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit} className="upload-btn">Upload</button>
        </div>
    );
};

export default UploadVideo;
