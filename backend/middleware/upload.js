const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload folder exists
const uploadPath = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Allowed MIME types
const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'application/msword'];

// File filter to allow images only
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    console.log('Uploading:', file.originalname);
    console.log('Extension:', ext);
    console.log('MIME type:', mimetype);

    if (allowedMimeTypes.includes(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter
});

module.exports = upload;