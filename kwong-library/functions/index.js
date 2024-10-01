/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https"); //map firebase-functions
const logger = require("firebase-functions/logger"); 
const admin = require("firebase-admin"); // linkd to firestore
const cors = require("cors")({origin: true}); //avoid error
const functions = require("firebase-functions");

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.countBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const booksCollection = admin.firestore().collection("books");
            const snapshot = await booksCollection.get();
            const count = snapshot.size;
            res.status(200).send({count});
        } catch (error) {
            console.error("Error counting books:", error.message);
            res.status(500).send("Error counting books");
        }
    });
});

exports.addBook = functions.https.onCall(async (data, context) => {
    const capitalizedBook = {
        isbn: data.isbn.toUpperCase(),
        name: data.name.toUpperCase(),
    };
    try {
        const db = admin.firestore().collection("books");
        await db.add(capitalizedBook);
        return { success: true, message: "Book added successfully", book: capitalizedBook };
    } catch (error) {
        return { success: false, message: "Failed to add book", error };
    }
  });
  
    exports.showAllBooks = onRequest((req, res) => {
        cors(req, res, async () => {
            try {
                const booksCollection = admin.firestore().collection("books");
                const snapshot = await booksCollection.get();

                if (snapshot.empty) {
                    return res.status(404).send({ message: "No books found" });
                }

                let books = [];
                snapshot.forEach(doc => {
                    books.push({
                        id: doc.id, // Document ID
                        ...doc.data() // All the fields in the document
                    });
                });

                res.status(200).json({ books });
            } catch (error) {
                console.error("Error retrieving books:", error.message);
                res.status(500).send("Error retrieving books");
            }
        });
    });