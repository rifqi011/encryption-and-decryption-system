// Background
function generateSpan(count) {
	const background = document.getElementById("background");
	for (let i = 1; i <= count; i++) {
		const span = document.createElement("span");
		background.appendChild(span);
	}
}
generateSpan(200);

// Change Form
const titleText = document.querySelector(".title");
const form = document.querySelector("form.encryption");
const encryptionBtn = document.querySelector("label.encryption");
const decryptionBtn = document.querySelector("label.decryption");
const signupLink = document.querySelector("form .signup-link a");

decryptionBtn.addEventListener("click", () => {
	titleText.innerHTML = "Decryption";
	form.style.marginLeft = "-50%";
});

encryptionBtn.addEventListener("click", () => {
	titleText.innerHTML = "Encryption";
	form.style.marginLeft = "0%";
});

// Simple XOR encryption and decryption
function xorEncryptDecrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

// Convert text to base64 to limit characters to A-Z, a-z, 0-9, +, /, and =
function toBase64(text) {
    return btoa(text); // Convert to Base64
}

// Convert base64 back to text
function fromBase64(base64) {
    return atob(base64); // Decode from Base64
}

function encryptText() {
    const text = document.getElementById("encryption-text").value;
    const secretKey = document.getElementById("encryption-key").value;
    const result = document.getElementById("encryption-result");

    if (text === "" || secretKey === "") {
        alert("Please enter both text and secret key!");
        return;
    }

    // Encrypt the text using XOR cipher
    const encryptedText = xorEncryptDecrypt(text, secretKey);

    // Convert encrypted text to Base64 to limit characters
    const base64Text = toBase64(encryptedText);

    // Show the result
    result.innerText = base64Text;
}

function decryptText() {
    const text = document.getElementById("decryption-text").value;
    const secretKey = document.getElementById("decryption-key").value;
    const result = document.getElementById("decryption-result");

    if (text === "" || secretKey === "") {
        alert("Please enter both text and secret key!");
        return;
    }

    try {
        // Convert Base64 back to original encrypted text
        const decodedBase64 = fromBase64(text);

        // Decrypt the text using XOR cipher (same function as encryption)
        const decryptedText = xorEncryptDecrypt(decodedBase64, secretKey);

        // Show the result
        result.innerText = decryptedText;
    } catch (e) {
        alert("Invalid Base64 string. Decryption failed.");
    }
}
