import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // This looks for the "uploads" folder inside the "backend" directory
    // no matter where you start the terminal from.
    const uploadPath = path.join(process.cwd(), "backend", "uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });