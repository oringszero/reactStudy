const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const deployDir = path.join(root, ".deploy", "react-for-beginners");
const buildDir = path.join(root, "build");

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((item) => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir, { recursive: true });
fs.readdirSync(buildDir).forEach((item) => {
  copyRecursive(path.join(buildDir, item), path.join(deployDir, item));
});
console.log("Copied build to .deploy/react-for-beginners");
